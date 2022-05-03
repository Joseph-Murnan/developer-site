import Link from 'next/link';
import Decoration from '../../components/Hero/Decoration';
import styles from '../../styles/internal.module.css';

const ComponentsPage = () => {
    return (
        <div className={`${styles.section}`}>
            <Decoration />
            <div className="container">
                <div className={styles.card}>
                    <div className="section">
                        <h1 className={styles.title}>Components</h1>
                    </div>
                    <div className="section">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComponentsPage;