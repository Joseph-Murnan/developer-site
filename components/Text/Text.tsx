import { ReactElement } from 'react';
import styles from './Text.module.css';
import TextSlice from './TextSlice';

const Text = (): ReactElement => {
    return (
        <div className={styles.textContainer}>
            <TextSlice />
            <TextSlice />
        </div>
    );
}

export default Text;