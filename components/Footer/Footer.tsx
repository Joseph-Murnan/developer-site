import { ReactElement, useContext } from 'react';
import Theme from '../../store/theme';

const Footer = (): ReactElement => {
    const themeContext = useContext(Theme);
    return (
        <footer className={`theme ${themeContext.theme} section links`}>
            <div className="container">
                <div className="dividerContainer">
                    <div className="name">
                        <p>Joseph Murnan</p>
                        <p>Full Stack Developer</p>
                    </div>
                    <div className="divider"></div>
                </div>
                <div className="linkContainer">
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
