import { useEffect, useCallback, ReactElement, KeyboardEvent, useReducer, Reducer } from 'react';
import PreviousLines from './PreviousLines';
import styles from '../Terminal.module.css';
import { Directory, Subfolder, ActionType, type Window, WindowReducer, CommandFn, RouteToFolderFn, ConstructPathFn, HandleTabChangeFn } from '../../../../store/types';

type Props = {
    title: string;
    name: string;
    files: Subfolder;
    date: string;
    tabIndex: number,
    handleTabChange: HandleTabChangeFn,
    constructPath: ConstructPathFn,
    routeToFolder: RouteToFolderFn
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

const windowReducer: Reducer<Window, WindowReducer> = (state, action) => {
    switch(action.type) {
        case ActionType.WRITE:
            return { currentText: state.currentText + action.payload, active: state.active, prevLines: state.prevLines };
        case ActionType.BACKSPACE:
            let newText = '';
            if(state.currentText.length > 0) {
                (newText = state.currentText.slice(0, -1));
            }
            return { currentText: newText, active: state.active, prevLines: state.prevLines };
        case ActionType.ENTER:
            const { newActive } = action.payload?.command(action.payload.segments);
            return { currentText: '', active: (newActive ? newActive : state.active), prevLines: state.prevLines.concat({ active: state.active.name, text: action.payload.text }) };
                                                                                            // ^ This is safe. concat() doesn't mutate the array it's called on.
        case ActionType.SET:
            return { currentText: action.payload, active: state.active, prevLines: state.prevLines };
        default:
            return state;
    }
};

const Window = (props: Props): ReactElement => {
    const { constructPath, routeToFolder, date, files, tabIndex, handleTabChange, name } = props;
    const [window, dispatchText] = useReducer(windowReducer, { currentText: '', prevLines: [], active: defaultActiveState }); // was useReducer<Reducer<Window, WindowReducer>>
    const write = useCallback(() => {
        if(count === terminalText.length) {
            count = 0;
        }
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
        const commandTypes: { [key: string]: CommandFn } = {
            'cd': (args: Array<string>) => changeDirectory(args),
            // 'ls': (args: Array<string>) => list(args)
        };
        if(commandTypes.hasOwnProperty(commandType)) {
            return commandTypes[commandType];
        } else {
            return handleCommandNotFound;
        }
    }, [window.active]);
    const changeDirectory = useCallback((segments: Array<string>) => {
        if(segments?.[1] && window?.active?.path) {
            const targetPath: Array<string> = segments[1].split('/');
            const newPath: Array<string> = constructPath(window.active.path.split('/'), targetPath);
            const newFolder = routeToFolder(files, newPath, 1).filter(Boolean)[0];
            if(newFolder) {
                return { newActive: newFolder };
            }
        }
        return false; // to do: directory not found message
    }, [window.active]);
    // const list = (segments: Array<string>) => false;
    const handleCommandNotFound = (segments: Array<string>): { attemptedCommand: string, newActive: boolean } => ({ attemptedCommand: segments[0], newActive: false }); // to do: send attemptedCommand to prevLines with message
    const keyDown = (e: KeyboardEvent<HTMLDivElement>, text: string) => {
        e.preventDefault();
        const input: string = e.key;
        if(keystrokes.includes(input)) {
            dispatchText({ type:ActionType.WRITE, payload:input });
        } else if(input === 'Enter') {
            const segments: Array<string> = text.split(' ');
            if(segments.length > 0) {
                const commandType = segments[0];
                const command = getCommand(commandType);
                dispatchText({ type:ActionType.ENTER, payload: { text, segments, command }});
            }
        } else {
            dispatchText({ type:input, payload:input });
        }
    };
    useEffect(() => {
        if(window.currentText === '') {
            write();
        }
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        handleTabChange(tabIndex, window.active.name);
    }, [window.active]);
    return (
        <div className={styles.textContainer}>
            <div className={styles.terminalContent}>
                <div className={`${styles.lastLogin}`}>Last login: <span suppressHydrationWarning>{ date }</span> on { name }</div>
                <PreviousLines prevLines={window.prevLines} />
                <div className={`${styles.line} ${styles.currentLine}`} contentEditable={true}
                    suppressContentEditableWarning={true} // This should be safe since we're capturing inputs rather than allowing direct DOM manipulation.
                    onKeyDown={e => keyDown(e, window.currentText)}>
                    <span className={styles.prependLine}>Joseph$ { window.active.name } %</span><span className={styles.currentText}>{ window.currentText }</span>
                </div>
            </div>
        </div>
    );
}

export default Window;
