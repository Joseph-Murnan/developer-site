import { ReactElement } from 'react';
import styles from './Internal.module.css';
import Decoration from '../Hero/Decoration';

const Internal = (props: {title: string | string[] | undefined, children: ReactElement[] | ReactElement}) => {
    return (
        <div className={`${styles.section}`}>
            <Decoration />
            <div className="container">
                <div className={styles.card}>
                <div className="section">
                    <h1 className={styles.title}>{ props.title }</h1>
                </div>
                <div className="section">
                    { props.children }
                </div>
                </div>
            </div>
        </div>
    );
}

export default Internal;
