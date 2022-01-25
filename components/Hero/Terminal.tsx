import { useEffect, useState, Fragment } from 'react';
import styles from './Terminal.module.css';

let count: number = 0;
let index: number = 0;
let letter: string = '';
let timeout: number = 70;
const terminalText: Array<string> = ['textOne', 'textTwo'];

const Terminal = () => {
    const [terminalLock, setTerminalLock] = useState(true);
    const [writtenText, setWrittenText] = useState('');
    const write = () => {
        count === terminalText.length ? count = 0 : null;
        letter = terminalText[count].slice(0, ++index);
        setWrittenText(letter);
        if(letter.length === terminalText[count].length) {
            if(terminalText.indexOf(terminalText[count]) == (terminalText.length - 1)) {
                setTerminalLock(false);
                return;
            }
            count++;
            index = 0;
            timeout = 700;
        } else if(timeout !== 70) {
            timeout = 70;
        }
        setTimeout(write, timeout);
    };
    const changeText = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.target instanceof HTMLTextAreaElement && setWrittenText(e.target.value);
    }
    useEffect(() => {
        setTimeout(write, 2000);
    }, []);
    return (
        <div className={styles.terminal}>
            <div className={styles.windowBar}>
                <span>Joseph</span>
            </div>
            <div className={styles.textContainer}>
                <p className={styles.typing}></p>
                <textarea value={writtenText} className={styles.userInput}
                    onChange={(e) => !terminalLock && changeText(e)}></textarea>
            </div>
        </div>
    );
}

export default Terminal;