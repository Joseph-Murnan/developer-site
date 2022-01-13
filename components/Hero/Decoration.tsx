import styles from './Decoration.module.css';

const Decoration = () => {
    return (
        <div className={`${styles.decoration} blueTheme`}>
            <div className={styles.pane}></div>
        </div>
    );
}

export default Decoration;
