import styles from './Palette.module.css'

const Palette = () => {
    return (
        <div className={styles.switchContainer}>
            <div className={styles.iconContainer}>
                <button name="one" className={`${styles.icon} ${styles.iconOne}`}></button>
            </div>
            <div className={styles.iconContainer}>
                <button name="two" className={`${styles.icon} ${styles.iconTwo}`}></button>
            </div>
        </div>
    );
}

export default Palette;