import { ReactElement } from 'react';
import Facade from './Facade/Facade';
import styles from './Slider.module.css';

const Slider = (): ReactElement => {
    return (
        <div className={`${styles.section} section`}>
            <div className="grid">
                <div className="centre">Data One</div>
                <div className="centre">Data Two</div>
            </div>
            <Facade />
        </div>
    );
}

export default Slider;
