import { ReactElement } from 'react';
import styles from './Terminal.module.css';

interface Props {
    title: string;
}

const StaticWindow = (props: Props): ReactElement => {
    return (
        <div className={styles.textContainer}>
            <div className={styles.terminalContent}>
                <div className={`${styles.lastLogin}`}>Last login: Wed Mar 16 12:00:00 on console</div>
                <div className={`${styles.line} ${styles.prependUser}`}>Static Text</div>
            </div>
        </div>
    );
}

export default StaticWindow;