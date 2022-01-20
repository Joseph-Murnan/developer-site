import styles from './Slider.module.css';

const Slider = () => {
    return (
        <div className={`${styles.section}`}>
            <div className="grid">
                <div className="centre">Data One</div>
                <div className="centre">Data Two</div>
            </div>
        </div>
    );
}

export default Slider;
