import { ReactElement } from 'react';
import Image from 'next/image';
import Facade from './Facade/Facade';
import styles from './Slider.module.css';

const Slider = (): ReactElement => {
    return (
        <div className={`${styles.section} section`}>
            <div className="grid">
                <div className={styles.gridBlock}>    
                    <div className={styles.svgContainer}>
                        <Image height="55" width="55" src="/svg/devices.svg" alt="devices icon" />
                        <p>Client-side</p>
                    </div>
                </div>
                <div className={styles.gridBlock}>    
                    <div className={styles.svgContainer}>
                        <Image height="55" width="55" src="/svg/storage.svg" alt="storage icon" />
                        <p>Server-side</p>
                    </div>
                </div>
            </div>
            <Facade />
        </div>
    );
}

export default Slider;
