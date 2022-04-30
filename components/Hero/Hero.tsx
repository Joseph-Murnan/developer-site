import { ReactElement } from 'react';
import Decoration from './Decoration';
import Terminal from './Terminal/Terminal';
import styles from './Hero.module.css';

const Hero = (): ReactElement => {
    return (
        <div className={`${styles.hero} section`}>
            <div className={`${styles.titleContainer} fade slow`}>
                <h1 className={styles.title}>
                    Joseph <span>Murnan</span>
                </h1>
                <h2 className={styles.subtitle}>
                    Full stack developer
                </h2>
            </div>
            <Decoration />
            <Terminal />
        </div>
    );
}

export default Hero;