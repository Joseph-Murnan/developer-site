import { ReactElement, DragEvent, useState, useEffect, useCallback, TouchEvent } from 'react';
import Grid from '../Grid';
import styles from '../Slider.module.css';

const onDragStart = (e: DragEvent) => {
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer.setDragImage(img, 0, 0);
}

const Facade = (): ReactElement => {
    const [dragPos, setDragPos] = useState({ left:'50%' });
    const [facade, setFacade] = useState({ container: { left:'0px', width:'0px' }, target: { left:'-50vw' }});
    const [windowDimensions, setWindowDimensions] = useState(0);
    const setWindowWidth = () => setWindowDimensions(window.innerWidth);
    const touchMove = (e: TouchEvent) => {
        const leftOffset = e.nativeEvent.touches[0].pageX - (windowDimensions / 2);
        handleDrag(leftOffset);
    };
    const onDrag = (e: DragEvent) => {
        const leftOffset = e.pageX - (windowDimensions / 2);
        handleDrag(leftOffset);     
    };
    const handleDrag = (leftOffset: number) => {
        if(leftOffset < 0) {
            setFacade(() => {
                const positiveOffset = Math.abs(leftOffset);
                const newContainer = { left:`${leftOffset}px`, width:`${(positiveOffset)}px` }
                const newTarget = { left:`calc(-50vw + ${positiveOffset}px)` }
                return { container: newContainer, target: newTarget }
            })
        } else {
            setFacade(prevState => {
                const newContainer = { left: prevState.container.left, width: `${leftOffset}px` }
                return { ...prevState, container: newContainer }
            })
        }
        setDragPos({ left: `calc(50% + ${leftOffset}px)` });
    };
    const handleDragEnd = useCallback(() => {
        setDragPos({ left: `calc(50% - 0px)` });
        setFacade(() => {
            const newContainer = { left:`0px`, width:`0px` }
            const newTarget = { left:`-50vw` } // calc(-50vw + 0px)
            return { container: newContainer, target: newTarget }
        })
    }, []);
    useEffect(() => {
        if(typeof window !== 'undefined') {
            setWindowDimensions(window.innerWidth);
            window.addEventListener("resize", setWindowWidth, false);
        }
    }, []);
    return (
        <>
            <div className={styles.facadeContainer} style={facade.container}>
                <div className={`${styles.facade} ${styles.iconGrid}`} style={facade.target}>
                    <Grid />
                </div>
            </div>
            <div
                draggable="true"
                onDragStart={e => onDragStart(e)}
                onDrag={e => onDrag(e)}
                onDragEnd={() => handleDragEnd()}
                onTouchMove={e => touchMove(e)}
                onTouchEnd={() => handleDragEnd()}
                className={`${styles.separator}`}
                style={dragPos}
            >
                <div className={styles.indicator}></div>
            </div>
        </>
    );
};

export default Facade;
