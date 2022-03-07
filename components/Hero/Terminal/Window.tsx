import { useEffect, useState, useCallback, ReactElement } from 'react';
import styles from './Terminal.module.css';
import fs from '../../../store/fs.json';

interface FileSystem {
    [key: string]: Directory;
}

interface Directory {
    name: string;
    current: boolean;
    type: string;
};

interface DirectorySearchResponse {
    success: boolean;
    folder: Directory;
};

interface Props {
    title: string;
};

interface CommandSet {
    [key: string]: Function
};

const defaultActiveState: Directory = {
    name: 'developer-site',
    current: true,
    type: 'directory'
};

const keystrokes: Array<string> = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    ' ', '/', '1', '2', '3', '4', '5', '6', '7', '8', '9', "'", '"',
    '@', '#', '-', '.', ','
];

let count: number = 0;
let index: number = 0;
let letter: string = '';
let timeout: number;
const terminalText: Array<string> = ['textOne', 'textTwo'];
let timer: ReturnType<typeof setTimeout>;
const loopLimit: number = 99;
let loopCounter: number = 0;

const Window = (props: Props): ReactElement => {
    const [terminalLock, setTerminalLock] = useState(true);
    const [writtenText, setWrittenText] = useState('');
    const importedFiles: FileSystem = fs;
    const [files, setFiles] = useState(importedFiles);
    const [active, setActive] = useState(defaultActiveState);
    const write = useCallback(() => {
        count === terminalText.length ? count = 0 : null;
        letter = terminalText[count].slice(0, ++index);
        setWrittenText(letter);
        if(letter.length === terminalText[count].length) {
            if(terminalText.indexOf(terminalText[count]) == (terminalText.length - 1)) {
                setTerminalLock(false);
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
        const commandTypes: CommandSet = {
            'cd': changeDirectory,
            'ls': list
        };
        if(commandTypes.hasOwnProperty(commandType)) {
            return commandTypes[commandType];
        } else {
            return handleCommandNotFound;
        }
    }, []);
    const searchFolders = (folder: Directory): DirectorySearchResponse => {
        let current: boolean = folder['current'];
        loopCounter++;
        if(current) {
            setActive(folder);
            return { 'success': true, 'folder': folder };
        } else if(current === false && loopCounter <= loopLimit) {
            let subdirectories = Object.values(folder).filter(f => (typeof f === 'object' && f.type === 'directory') && f);
            subdirectories.length > 0 && subdirectories.find(s => searchFolders(s)['success']);
        }
        return { 'success': false, 'folder': folder };
    };
    const setCurrent = (fileSystem: FileSystem) => {
        loopCounter = 0;
        Object.values(fileSystem).forEach(f => searchFolders(f));
    };
    const changeDirectory = (segments: Array<string>) => {
        let fileSystem = files;
        setCurrent(fileSystem);
    };
    const list = (segments: Array<string>) => {};
    const handleCommandNotFound = (segments: Array<string>) => {};
    const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        let input: string = e.key;
        if(keystrokes.includes(input)) {
            let prevState: string = writtenText;
            setWrittenText(prevState += input);
        } else if(input === 'Backspace') {
            let prevState: string = writtenText;
            setWrittenText(prevState.slice(0, -1));
        } else if(input === 'Enter') {
            let commandType: string;
            let prevState: string = writtenText;
            let segments: Array<string> = prevState.split(' ');
            if(segments.length > 0) {
                commandType = segments[0];
                let command = getCommand(commandType);
                command && command(segments);
            }
        }
    };
    useEffect(() => {
        writtenText === '' && write();
        return () => {
            // setWrittenText('');
            clearTimeout(timer);
        };
    }, []);
    return (
        <div className={styles.textContainer}>
            <p className={styles.user}></p>
            <div className={styles.terminalContent} 
            contentEditable={true} suppressContentEditableWarning={true} // This should be safe since we're capturing inputs rather than allowing direct DOM manipulation.
            onKeyDown={e => !terminalLock && keyDown(e)}>{writtenText}</div>
        </div>
    );
}

export default Window;
