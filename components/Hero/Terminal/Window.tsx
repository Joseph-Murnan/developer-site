import { useEffect, useCallback, ReactElement, Dispatch, SetStateAction, KeyboardEvent, useReducer, Reducer } from 'react';
import styles from './Terminal.module.css';
import { Directory, Subfolder, Tab, ActionType, Window, WindowReducer } from '../../../store/types';

interface Props {
    title: string;
    name: string;
    files: Subfolder;
    setFiles: Dispatch<SetStateAction<Subfolder>>;
    date: string;
    tab: Tab,
    setTabs: Dispatch<SetStateAction<Tab[]>>
};

const defaultActiveState: Directory = {
    'name': 'sites',
    'path': '/documents/sites',
    'type': 'directory',
    'current': false,
    'subfolders': {}
};

const keystrokes: Array<string> = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    ' ', '/', '1', '2', '3', '4', '5', '6', '7', '8', '9', "'", '"',
    '@', '#', '-', '.', ',', '?', '`', '(', ')', '_', '{', '}'
];

let count: number = 0;
let index: number = 0;
let letter: string = '';
let timeout: number;
const terminalText: Array<string> = ['textOne', 'textTwo'];
let timer: ReturnType<typeof setTimeout>;
const loopLimit: number = 99;

const routeToFolder = (subfolders: Subfolder, pathSegments: Array<string>, i: number): Array<Directory | undefined> => {
    return Object.values(subfolders).map((folder: Directory) => {
        if(folder.name == pathSegments[i] && pathSegments.at(-1) === pathSegments[i] && pathSegments.length === (i + 1)) {
            return folder;
        } else if(Object.values(folder.subfolders).length > 0 && i < loopLimit) {
            return routeToFolder(folder.subfolders, pathSegments, i + 1).filter(Boolean)[0];
        }
    })
}

const constructPath = (activePath: Array<string>, targetPath: Array<string>) => {
    targetPath.forEach(p => {
        switch(p) {
            case '..':
                activePath.pop();
                break;
            default:
                activePath.push(p);
                break;
        }
    })
    return activePath;
}

const windowReducer: Reducer<Window, WindowReducer> = (state, action) => {
    switch(action.type) {
        case ActionType.WRITE:
            return { currentText: state.currentText + action.payload, active: state.active, prevLines: state.prevLines };
        case ActionType.BACKSPACE:
            let newText = '';
            state.currentText.length > 0 && (newText = state.currentText.slice(0, -1));
            return { currentText: newText, active: state.active, prevLines: state.prevLines };
        case ActionType.ENTER:
            let newActive = state.active;
            action.payload.command && (newActive = action.payload.command(action.payload.segments));
            return { currentText: '', active: (newActive ? newActive : state.active), prevLines: state.prevLines.concat(action.payload.text) };
                                                                                            // ^ This is safe. concat() doesn't mutate the array it's called on.
        case ActionType.SET:
            return { currentText: action.payload, active: state.active, prevLines: state.prevLines };
        default:
            return state;
    }
};

const Window = (props: Props): ReactElement => {
    const [window, dispatchText] = useReducer<Reducer<Window, WindowReducer>>(windowReducer, { currentText: '', prevLines: [], active: defaultActiveState });
    const write = useCallback(() => {
        count === terminalText.length ? count = 0 : null;
        letter = terminalText[count].slice(0, ++index);
        dispatchText({ type:ActionType.SET, payload:letter });
        if(letter.length === terminalText[count].length) {
            if(terminalText.indexOf(terminalText[count]) == (terminalText.length - 1)) {
                clearTimeout(timer);
                return;
            }
            count++;
            index = 0;
            timeout = 700;
        } else if(timeout !== 70) {
            timeout = 70;
        }
        timer = setTimeout(write, timeout);
    }, []);
    const getCommand = useCallback((commandType: string) => {
        const commandTypes: { [key: string]: Function } = {
            'cd': changeDirectory,
            'ls': list
        };
        if(commandTypes.hasOwnProperty(commandType)) {
            return commandTypes[commandType];
        } else {
            return handleCommandNotFound;
        }
    }, [window.active]);
    const changeDirectory = useCallback((segments: Array<string>) => {
        if(segments && segments[1]) {
            const targetPath: Array<string> = segments[1].split('/');
            const newPath: Array<string> = constructPath(window.active.path.split('/'), targetPath);
            const newFolder = routeToFolder(props.files, newPath, 1).filter(Boolean)[0];
            if(newFolder) {
                return newFolder;
            } else {
                return false;
            }
        }
    }, [window.active]);
    const list = (segments: Array<string>) => {};
    const handleCommandNotFound = (segments: Array<string>) => {};
    const keyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const input: string = e.key;
        if(keystrokes.includes(input)) {
            dispatchText({ type:ActionType.WRITE, payload:input });
        } else {
            dispatchText({ type:input, payload:input });
        }
        if(input === 'Enter') {
            const text = window.currentText;
            const segments: Array<string> = window.currentText.split(' ');
            if(segments.length > 0) {
                const commandType = segments[0];
                const command = getCommand(commandType);
                command && dispatchText({ type:ActionType.ENTER, payload: { text, segments, command: command }});
            }
        }
    };
    useEffect(() => {
        window.currentText === '' && write();
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={styles.textContainer}>
            <div className={styles.terminalContent}>
                <div className={`${styles.lastLogin}`}>Last login: <span suppressHydrationWarning>{ props.date }</span> on ttys000</div>
                { window.prevLines.map((p: string, index: number) => 
                    <div className={`${styles.line}`} key={index}>
                        <span className={styles.prependLine}>Joseph$ { window.active.name } %</span><span>{ p }</span>
                    </div>
                ) }
                <div className={`${styles.line} ${styles.currentLine}`} contentEditable={true}
                    suppressContentEditableWarning={true} // This should be safe since we're capturing inputs rather than allowing direct DOM manipulation.
                    onKeyDown={e => keyDown(e)}>
                    <span className={styles.prependLine}>Joseph$ { window.active.name } %</span><span>{ window.currentText }</span>
                </div>
            </div>
        </div>
    );
}

export default Window;
