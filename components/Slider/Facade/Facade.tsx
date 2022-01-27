import { Fragment } from 'react';
import styles from '../Slider.module.css';

const Facade = () => {
    const onDragStart = (e: React.DragEvent) => {
        const img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer.setDragImage(img, 0, 0);
    }
    return (
        <Fragment>
            <div className="grid">
                <div className="left"><span>left content</span></div>
                <div className="right"><span>right content</span></div>
            </div>
            <div draggable="true" onDragStart={e => onDragStart(e)} className={styles.separator}>
                <div className={styles.indicator}></div>
            </div>
        </Fragment>
    );
};

export default Facade;
