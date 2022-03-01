import { ReactElement } from 'react';
import styles from './Text.module.css';
import TextSlice from './TextSlice';

const Text = (): ReactElement => {
    return (
        <div className={`${styles.textContainer} section`}>
            <TextSlice />
            <TextSlice />
        </div>
    );
}

export default Text;