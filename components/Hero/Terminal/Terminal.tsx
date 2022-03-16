import { ReactElement, useState, useEffect, useCallback } from 'react';
import Window from './Window';
import StaticWindow from './StaticWindow';
import Tabs from './Tabs';
import styles from './Terminal.module.css';
import fs from '../../../store/fs.json';
import { FileSystem } from '../../../store/types';

const Terminal = (): ReactElement => {
    const importedFiles: FileSystem = fs;
    const [files, setFiles] = useState(importedFiles);
    const getDate = useCallback(() => {
        const date = new Date();
        const time = date.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return `${date.toDateString()} ${time}`;
    }, []);
    const [tabs, setTabs] = useState([
        {
            id: 0,
            type: 'static',
            name: 'console',
            title: 'window1',
            date: getDate,
        }
    ]);
    const [openTab, setOpenTab] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setTabs(prevState => 
                [...prevState, {
                    id: 1,
                    type: 'interactive',
                    name: 'ttys000',
                    title: 'window2',
                    date: getDate
                }]
            );
            setOpenTab(1);
        }, 2000);
    }, []);
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
            <Tabs openTab={openTab} setOpenTab={setOpenTab}>
                {
                    tabs.map((t: { id: number, type: string, title: string, date: Function, name: string }): ReactElement => {
                        if(t.type == 'interactive') {
                            return <Window name={t.name} date={t.date()} key={t.id} files={files} setFiles={setFiles} title={t.title} />
                        } else {
                            return <StaticWindow name={t.name} date={t.date()} key={t.id} title={t.title} />
                        }
                    })
                }
            </Tabs>
        </div>
    );
}

export default Terminal;
