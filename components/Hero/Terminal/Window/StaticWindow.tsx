import { ReactElement } from 'react';
import styles from '../Terminal.module.css';

interface Props {
    title: string;
    name: string;
    date: string;
}

const StaticWindow = (props: Props): ReactElement => {
    const { date, name } = props;
    return (
        <div className={styles.textContainer}>
            <div className={styles.terminalContent}>
                <div className={`${styles.lastLogin}`}>Last login: <span suppressHydrationWarning>{ date }</span> on { name }</div>
                <div className={`${styles.line}`}>
                    <span className={styles.prependLine}>Joseph$ ~ %</span><span>Static Text</span>
                </div>
            </div>
        </div>
    );
}

export default StaticWindow;