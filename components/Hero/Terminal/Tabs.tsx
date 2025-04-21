import { ReactElement, Fragment, JSX } from 'react';
import Tab from './Tab';
import styles from './Terminal.module.css';

interface Props {
    children: JSX.Element[];
    openTab: number;
    setOpenTab: React.Dispatch<React.SetStateAction<number>>;
}

interface WindowData {
    tabs: Array<ReactElement>,
    windows: Array<ReactElement>
}

const Tabs = (props: Props): ReactElement => {
    const { children, openTab, setOpenTab } = props;
    const windowData: WindowData = { tabs: [], windows: [] };
    children.forEach((item, index) => {
        windowData.tabs.push(
            <li key={index} className={`${styles.tab} ` + (index == openTab ? `${styles.active}` : `${styles.inactive}`)}>
                <Tab title={item.props.title} index={index} setOpenTab={setOpenTab} />
            </li>
        );
        windowData.windows.push(
            index == openTab ? <div className={styles.showWindow} key={index}>{ item }</div> : <div key={index} className={styles.hideWindow}>{ item }</div>
        );
    });
    return (
        <Fragment>
            <ul className={`${styles.tabList} ` + (windowData.tabs.length === 1 ? `${styles.hide}` : `${styles.show}`)}>{ windowData.tabs }</ul>
            { windowData.windows }
        </Fragment>
    )
}

export default Tabs;