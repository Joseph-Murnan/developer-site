import { useContext, ReactElement } from 'react';
import Theme from '../../store/theme';
import styles from './Decoration.module.css';

const Decoration = (): ReactElement => {
    const themeContext = useContext(Theme);
    return (
        <div className={`${styles.decoration} theme background ${themeContext.theme}`}>
            <div className={styles.pane}></div>
        </div>
    );
}

export default Decoration;
