import { ReactElement } from 'react';
import Window from './Window';
import StaticWindow from './StaticWindow';
import Tabs from './Tabs';
import styles from './Terminal.module.css';

const Terminal = (): ReactElement => {
    return (
        <div className={styles.terminal}>
            <div className={styles.windowBar}>
                <span>Joseph</span>
            </div>
            <Tabs>
                <StaticWindow title="window1" />
                <Window title="window2" />
            </Tabs>
        </div>
    );
}

export default Terminal;