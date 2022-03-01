import { ReactElement } from 'react';
import Decoration from './Decoration';
import Terminal from './Terminal/Terminal';
import styles from './Hero.module.css';

const Hero = (): ReactElement => {
    return (
        <div className={`${styles.hero} section`}>
            <Decoration />
            <Terminal />
        </div>
    );
}

export default Hero;