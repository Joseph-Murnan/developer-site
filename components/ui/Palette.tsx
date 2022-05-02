import { useContext, ReactElement } from 'react';
import Theme from '../../store/theme';
import styles from './Palette.module.css';
// import { clickEvent } from '../components/ui/Palette';

const Palette = (): ReactElement => {
    const themeContext = useContext(Theme);
    return (
        <div className={styles.switchContainer}>
            <div className={styles.iconContainer}>
                <button aria-label="blueTheme" name="blueTheme" onClick={themeContext.onSwitch} className={`${styles.icon} ${styles.iconBlue}`}></button>
            </div>
            <div className={styles.iconContainer}>
                <button aria-label="purpleTheme" name="purpleTheme" onClick={themeContext.onSwitch} className={`${styles.icon} ${styles.iconPurple}`}></button>
            </div>
            <div className={styles.iconContainer}>
                <button aria-label="yellowTheme" name="yellowTheme" onClick={themeContext.onSwitch} className={`${styles.icon} ${styles.iconYellow}`}></button>
            </div>
            <div className={styles.iconContainer}>
                <button aria-label="orangeTheme" name="orangeTheme" onClick={themeContext.onSwitch} className={`${styles.icon} ${styles.iconOrange}`}></button>
            </div>
            <div className={styles.iconContainer}>
                <button aria-label="tealTheme" name="tealTheme" onClick={themeContext.onSwitch} className={`${styles.icon} ${styles.iconTeal}`}></button>
            </div>
        </div>
    );
}

export default Palette;