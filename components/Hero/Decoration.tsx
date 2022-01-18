import { useContext } from 'react';
import Theme from '../../store/theme';
import styles from './Decoration.module.css';

const Decoration = () => {
    const themeContext = useContext(Theme);
    return (
        <div className={`${styles.decoration} ${themeContext.theme}`}>
            <div className={styles.pane}></div>
        </div>
    );
}

export default Decoration;
