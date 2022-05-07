import Link from 'next/link';
import Internal from '../../components/Internal/Internal';

const ComponentsPage = () => {
    return (
        <Internal title="components">
            <div className="section">
                <Link href='/components/hero'>
                    Hero
                </Link>
            </div>
        </Internal>   
    );
}

export default ComponentsPage;
