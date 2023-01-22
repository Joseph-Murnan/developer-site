import { useState, useContext, ReactElement } from 'react';
import { pageCollection, Page } from '../Layout/Layout';
import Theme from '../../store/theme';
import Link from 'next/link';

const Nav = (props: { pageProps: pageCollection }): ReactElement => {
    const [open, setOpen] = useState(false);
    const handleMenu = () => setOpen(prevOpen => !prevOpen);
    const themeContext = useContext(Theme);
    return (
        <div className={`${open} navContainer`}>
            <ul id="menu">
                {props.pageProps.nav.map((page: Page, index: number) => (
                    <li className="menuItem" key={index}>
                        <Link href={page.href} className={`theme border-left hover ${themeContext.theme}`}>
                            { page.label }
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="navBtn" onClick={handleMenu}>
                <div className="barContainer">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </div>
    );
}

export default Nav;