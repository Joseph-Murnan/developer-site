import styles from './Text.module.css';
import TextSlice from './TextSlice';

const Text = () => {
    return (
        <div className={styles.textContainer}>
            <TextSlice />
            <TextSlice />
        </div>
    );
}

export default Text;