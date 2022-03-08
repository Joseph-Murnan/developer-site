import { ReactElement } from 'react';
import Window from './Window';
import StaticWindow from './StaticWindow';
import Tabs from './Tabs';
import styles from './Terminal.module.css';

const Terminal = (): ReactElement => {
    return (
        <div className={styles.terminal}>
            <div className={styles.windowBar}>
                <div className={styles.btnContainer}>
                    <button className={styles.close}></button>
                    <button className={styles.minimise}></button>
                    <button className={styles.maximise}></button>
                </div>
                <span className={styles.terminalStatus}>Joseph</span>
            </div>
            <Tabs>
                <StaticWindow title="window1" />
                <Window title="window2" />
            </Tabs>
        </div>
    );
}

export default Terminal;
