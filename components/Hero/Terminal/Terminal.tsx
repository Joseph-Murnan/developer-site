import { ReactElement, useState } from 'react';
import Window from './Window';
import StaticWindow from './StaticWindow';
import Tabs from './Tabs';
import styles from './Terminal.module.css';
import fs from '../../../store/fs.json';
import { FileSystem } from '../../../store/types';

const Terminal = (): ReactElement => {
    const importedFiles: FileSystem = fs;
    const [files, setFiles] = useState(importedFiles);
    const [openTabs, setOpenTabs] = useState([
        {
            id: 0,
            type: 'static',
            title: 'window1'
        },
        {
            id: 1,
            type: 'interactive',
            title: 'window2'
        }
    ]);
    return (
        <div className={styles.terminal}>
            <div className={styles.windowBar}>
                <div className={styles.btnContainer}>
                    <button className={styles.close}></button>
                    <button className={styles.minimise}></button>
                    <button className={styles.maximise}></button>
                </div>
                <div className={`${styles.terminalStatus} ${styles.folderDefaults}`}>
                    <span className={`${styles.folderBack} ${styles.folderDefaults}`}></span>
                    <span className={`${styles.folderTab} ${styles.folderDefaults}`}></span>
                    Joseph
                </div>
            </div>
            <Tabs>
                {
                    openTabs.map((t: { id: number, type: string, title: string }): ReactElement => {
                        if(t.type == 'interactive') {
                            return <Window key={t.id} files={files} setFiles={setFiles} title={t.title} />
                        } else {
                            return <StaticWindow key={t.id} title={t.title} />
                        }
                    })
                }
            </Tabs>
        </div>
    );
}

export default Terminal;
