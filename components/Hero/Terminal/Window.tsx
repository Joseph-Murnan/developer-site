import { useEffect, useState, useCallback, ReactElement } from 'react';
import styles from './Terminal.module.css';
import { Directory, FileSystem } from '../../../store/types';

interface Props {
    title: string;
    name: string;
    files: FileSystem;
    setFiles: React.Dispatch<React.SetStateAction<FileSystem>>;
    date: string;
};

const defaultActiveState: Directory = {
    name: 'developer-site',
    current: true,
    type: 'directory',
    path: '~/documents/sites/developer-site'
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
let loopCounter: number = 0;
const defaultPreviousLines: Array<string> = [];

const Window = (props: Props): ReactElement => {
    const [writtenText, setWrittenText] = useState('');
    const [active, setActive] = useState(defaultActiveState);
    const [previousLines, setPreviousLines] = useState(defaultPreviousLines);
    const write = useCallback(() => {
        count === terminalText.length ? count = 0 : null;
        letter = terminalText[count].slice(0, ++index);
        setWrittenText(letter);
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
    }, []);
    const searchFolders = (folder: Directory): { success: boolean, folder: Directory } => {
        const current: boolean = folder['current'];
        loopCounter++;
        if(current) {
            setActive(folder);
            return { 'success': true, 'folder': folder };
        } else if(current === false && loopCounter <= loopLimit) {
            const subdirectories = Object.values(folder).filter(f => (typeof f === 'object' && f.type === 'directory') && f);
            subdirectories.length > 0 && subdirectories.find(s => searchFolders(s)['success']);
        }
        return { 'success': false, 'folder': folder };
    };
    const setCurrent = (fileSystem: FileSystem) => {
        loopCounter = 0;
        Object.values(fileSystem).forEach(f => searchFolders(f));
    };
    const changeDirectory = (segments: Array<string>) => {
        setCurrent(props.files);
    };
    const list = (segments: Array<string>) => {};
    const handleCommandNotFound = (segments: Array<string>) => {};
    const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const input: string = e.key;
        switch(true) {
            case keystrokes.includes(input):
                setWrittenText(prevState => prevState += input);
                break;
            case input === 'Backspace':
                setWrittenText(prevState => prevState.slice(0, -1));
                break;
            case input === 'Enter':
                const text = writtenText;
                setPreviousLines(prevState => {
                    prevState.push(text); // <-- runs twice on development server due to react strict mode
                    return prevState;
                });
                const segments: Array<string> = writtenText.split(' ');
                if(segments.length > 0) {
                    const command = getCommand(segments[0]);
                    command && command(segments);
                }
                setWrittenText('');
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        (writtenText === '' && loopCounter === 0) && write();
        return () => {
            // setWrittenText('');
            clearTimeout(timer);
        };
    }, []);
    return (
        <div className={styles.textContainer}>
            <div className={styles.terminalContent}>
                <div className={`${styles.lastLogin}`}>Last login: <span suppressHydrationWarning>{ props.date }</span> on ttys000</div>
                { previousLines.map((p, index) => 
                    <div className={`${styles.line}`} key={index}>
                        <span className={styles.prependLine}>Joseph$ { active.name } %</span><span>{ p }</span>
                    </div>
                ) }
                <div className={`${styles.line} ${styles.currentLine}`} contentEditable={true}
                    suppressContentEditableWarning={true} // This should be safe since we're capturing inputs rather than allowing direct DOM manipulation.
                    onKeyDown={e => keyDown(e)}>
                    <span className={styles.prependLine}>Joseph$ { active.name } %</span><span>{writtenText}</span>
                </div>
            </div>
        </div>
    );
}

export default Window;
