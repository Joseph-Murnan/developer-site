import { ReactElement } from 'react';
import styles from './Terminal.module.css';

interface Props {
    title: string;
}

const StaticWindow = (props: Props): ReactElement => {
    return (
        <div className={styles.textContainer}>
            <p className={styles.user}></p>
            <div className={styles.terminalContent}>
                Static Text
            </div>
        </div>
    );
}

export default StaticWindow;