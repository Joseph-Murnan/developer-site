import { ReactElement, useState, Fragment } from 'react';
import Tab from './Tab';
import styles from './Terminal.module.css';

interface Props {
    children: ReactElement[];
}

const Tabs = (props: Props) => {
    const windows = props.children;
    const [openTab, setOpenTab] = useState(0);
    return (
        <Fragment>
            <ul>
                { windows.map((item, index) => 
                    <li key={index} className={`${styles.tab} ` + (index == openTab && `${'active'}`)}>
                        <Tab title={item.props.title} index={index} setOpenTab={setOpenTab} />
                    </li>
                ) }
            </ul>
            { windows[openTab] }
        </Fragment>
    )
}

export default Tabs;