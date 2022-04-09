import { ReactElement } from 'react';
import styles from '../Terminal.module.css';
import { Tab } from '../../../../store/types';

interface Props {
    title: string;
    name: string;
    date: string;
    tab: Tab,
}

const StaticWindow = (props: Props): ReactElement => {
    const { date, tab } = props;
    return (
        <div className={styles.textContainer}>
            <div className={styles.terminalContent}>
                <div className={`${styles.lastLogin}`}>Last login: <span suppressHydrationWarning>{ date }</span> on { tab.name }</div>
                <div className={`${styles.line}`}>
                    <span className={styles.prependLine}>Joseph$ ~ %</span><span>Static Text</span>
                </div>
            </div>
        </div>
    );
}

export default StaticWindow;