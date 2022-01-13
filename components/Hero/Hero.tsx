import Decoration from './Decoration';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <div className={styles.hero}>
            <Decoration />
        </div>
    );
}

export default Hero;