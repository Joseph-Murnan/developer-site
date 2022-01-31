import { useEffect, useState, useCallback } from 'react';
import styles from './Terminal.module.css';

interface Props {
    title: string;
}

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
    const changeText = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        e.target instanceof HTMLTextAreaElement && setWrittenText(e.target.value);
    }, []);
    useEffect(() => {
        write();
        return () => {
            setWrittenText('');
            clearTimeout(timer);
        };
    }, []);
    return (
        <div className={styles.textContainer}>
            <p className={styles.user}></p>
            <textarea value={writtenText} className={styles.terminalContent}
                onChange={e => !terminalLock && changeText(e)}></textarea>
        </div>
    );
}

export default Window;
