import { Fragment, ReactElement, DragEvent } from 'react';
import styles from '../Slider.module.css';

const Facade = (): ReactElement => {
    const onDragStart = (e: DragEvent) => {
        const img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer.setDragImage(img, 0, 0);
    }
    const onDragEnd = (e: DragEvent) => {
        
    };
    const onDrag = (e: DragEvent) => {
        
    };
    return (
        <Fragment>
            <div className={styles.facadeContainer}>
                <div className={`${styles.facade} grid`}>
                    <div className="left"><span>left content</span></div>
                    <div className="right"><span>right content</span></div>
                </div>
            </div>
            <div draggable="true" onDragStart={e => onDragStart(e)} onDrag={e => onDrag(e)} onDragEnd={e => onDragEnd(e)} className={styles.separator}>
                <div className={styles.indicator}></div>
            </div>
        </Fragment>
    );
};

export default Facade;
