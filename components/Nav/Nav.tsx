import { useState, useContext, ReactElement } from 'react';
import { pageCollection, Page } from '../Layout/Layout';
import Theme from '../../store/theme';

const Nav = (props: { pageProps: pageCollection }): ReactElement => {
    const [open, setOpen] = useState(false);
    const handleMenu = () => setOpen(prevOpen => !prevOpen);
    const themeContext = useContext(Theme);
    return (
        <div className={`${open} navContainer`}>
            <ul id="menu">
                {props.pageProps.nav.map((page: Page, index: number) => (
                    <li className="menuItem" key={index}>
                        <a className={`theme border-left hover ${themeContext.theme}`} href={page.href}>
                            {page.label}
                        </a>
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