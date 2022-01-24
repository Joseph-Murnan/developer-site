import { Fragment } from 'react';
import styles from '../Slider.module.css';

const Facade = () => {
    return (
        <Fragment>
            <div className="grid">
                <div className="left"><span>left content</span></div>
                <div className="right"><span>right content</span></div>
            </div>
            <div draggable="true" className={styles.separator}>
                <div className={styles.indicator}></div>
            </div>
        </Fragment>
    );
};

export default Facade;
