import Decoration from './Decoration';
import Terminal from './Terminal/Terminal';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <div className={styles.hero}>
            <Decoration />
            <Terminal />
        </div>
    );
}

export default Hero;