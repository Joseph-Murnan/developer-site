import { useContext } from 'react';
import Theme from '../../store/theme';
import styles from './Palette.module.css';
// import { clickEvent } from '../components/ui/Palette';

const Palette = () => {
    const themeContext = useContext(Theme);
    return (
        <div className={styles.switchContainer}>
            <div className={styles.iconContainer}>
                <button name="blueTheme" onClick={themeContext.onSwitch} className={`${styles.icon} ${styles.iconOne}`}></button>
            </div>
            <div className={styles.iconContainer}>
                <button name="redTheme" onClick={themeContext.onSwitch} className={`${styles.icon} ${styles.iconTwo}`}></button>
            </div>
            <div className={styles.iconContainer}>
                <button name="purpleTheme" onClick={themeContext.onSwitch} className={`${styles.icon} ${styles.iconThree}`}></button>
            </div>
        </div>
    );
}

export default Palette;