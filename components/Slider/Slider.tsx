import { ReactElement } from 'react';
import Facade from './Facade/Facade';
import styles from './Slider.module.css';

const Slider = (): ReactElement => {
    return (
        <div className={`${styles.section} section`}>
            <div className="grid">
                <div className={styles.gridBlock}>    
                    <div className={styles.svgContainer}>
                        <img src="/svg/devices.svg" alt="devices icon" />
                    </div>
                </div>
                <div className={styles.gridBlock}>    
                    <div className={styles.svgContainer}>
                        <img src="/svg/storage.svg" alt="storage icon" />
                    </div>
                </div>
            </div>
            <Facade />
        </div>
    );
}

export default Slider;
