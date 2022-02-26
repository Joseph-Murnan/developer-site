import { useState, useContext, ReactElement } from 'react';
import { pageCollection } from '../Layout/Layout';
import Theme from '../../store/theme';

interface Props {
    pageProps: pageCollection
}

const Nav = (props: Props): ReactElement => {
    const [open, setOpen] = useState(false);
    const handleMenu = () => setOpen(prevOpen => !prevOpen);
    const themeContext = useContext(Theme);
    return (
        <div className={`${open.toString()} navContainer`}>
            <ul id="menu">
                {props.pageProps.nav.map((page: any, index: number) => (
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