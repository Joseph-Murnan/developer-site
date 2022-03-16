import { ReactElement, Fragment } from 'react';
import Tab from './Tab';
import styles from './Terminal.module.css';

interface Props {
    children: ReactElement[];
    openTab: number;
    setOpenTab: React.Dispatch<React.SetStateAction<number>>;
}

const Tabs = (props: Props): ReactElement => {
    const windows = props.children;
    const openTab = props.openTab;
    const setOpenTab = props.setOpenTab;
    return (
        <Fragment>
            <ul className={`${styles.tabList} ` + (windows.length === 1 ? `${styles.hide}` : `${styles.show}`)}>
                { windows.map((item, index): ReactElement => 
                    <li key={index} className={`${styles.tab} ` + (index == openTab ? `${styles.active}` : `${styles.inactive}`)}>
                        <Tab title={item.props.title} index={index} setOpenTab={setOpenTab} />
                    </li>
                ) }
            </ul>
            { windows[openTab] }
        </Fragment>
    )
}

export default Tabs;