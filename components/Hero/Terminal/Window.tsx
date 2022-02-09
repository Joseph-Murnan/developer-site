import { useEffect, useState, useCallback } from 'react';
import styles from './Terminal.module.css';
import fs from '../../../store/fs.json';

interface Props {
    title: string;
}

const keystrokes: Array<string> = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '
];

const commandTypes: Array<string> = [
    'cd', 'ls'
];

let count: number = 0;
let index: number = 0;
let letter: string = '';
let timeout: number;
const terminalText: Array<string> = ['textOne', 'textTwo'];
let timer: ReturnType<typeof setTimeout>;

const Window = (props: Props) => {
    const [terminalLock, setTerminalLock] = useState(true);
    const [writtenText, setWrittenText] = useState('');
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
            segments.length > 0 && (commandType = segments[0]);
            if(segments.length > 0) {
                commandType = segments[0];
                commandTypes.includes(commandType) && handleCommand(commandType, segments);
            }
        }
    };
    const handleCommand = (commandType: string, segments: Array<string>) => {};
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
