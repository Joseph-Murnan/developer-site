import { ReactElement, useState, useEffect } from 'react';
import Window from './Window/Window';
import StaticWindow from './Window/StaticWindow';
import Tabs from './Tabs';
import styles from './Terminal.module.css';
import fs from '../../../store/fs.json';
import { Subfolder, Tab, Directory } from '../../../store/types';

const getDate = () => {
    const date = new Date();
    const time = date.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${date.toDateString()} ${time}`;
};

const routeToFolder = (subfolders: Subfolder, pathSegments: Array<string>, i: number): Array<Directory | undefined> => {
    return Object.values(subfolders).map((folder: Directory) => {
        if(folder.name == pathSegments[i] && pathSegments.at(-1) === pathSegments[i] && pathSegments.length === (i + 1)) {
            return folder;
        } else if(Object.values(folder.subfolders).length > 0 && i < 99) {
            return routeToFolder(folder.subfolders, pathSegments, i + 1).filter(Boolean)[0];
        }
    })
}

const constructPath = (activePath: Array<string>, targetPath: Array<string>) => {
    targetPath.forEach(p => {
        switch(p) {
            case '..':
                activePath.pop();
                break;
            default:
                activePath.push(p);
                break;
        }
    })
    return activePath;
}

const initialTab: Tab = { id: 0, type: 'static', name: 'console', title: 'window1', date: getDate }
const secondTab: Tab = { id: 1, type: 'interactive', name: 'ttys000', title: 'window2', date: getDate }

const Terminal = (): ReactElement => {
    const importedFiles: Subfolder = fs;
    const [files, setFiles] = useState(importedFiles);
    const [tabs, setTabs] = useState([initialTab]);
    const [openTab, setOpenTab] = useState(0);
    const handleTabChange = (index: number, newTitle: string) => {
        setTabs(prevState => {
            const newState = [...prevState];
            newState[index] = { ...newState[index], title: newTitle };
            return newState;
        });
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setTabs(prevState => [...prevState, secondTab]);
            setOpenTab(1);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={`${styles.terminal} fade fast`}>
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
                    tabs.map((t: { id: number, type: string, title: string, date: Function, name: string }, index: number): ReactElement => {
                        if(t.type == 'interactive') {
                            return <Window 
                                        key={t.id}
                                        handleTabChange={handleTabChange}
                                        constructPath={constructPath}
                                        routeToFolder={routeToFolder}
                                        tabIndex={index}
                                        name={t.name}
                                        date={t.date()}
                                        files={files}
                                        title={t.title}
                                    />
                        } else {
                            return <StaticWindow key={t.id} name={t.name} date={t.date()} title={t.title} />
                        }
                    })
                }
            </Tabs>
        </div>
    );
}

export default Terminal;
