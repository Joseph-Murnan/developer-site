import { ThemeProvider } from '../../store/theme';
import Head from 'next/head'
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { ReactElement } from 'react';

export interface Page {
    label: string,
    href: string,
    subPages: Array<Page> | Array<null>
}

export interface pageCollection {
    nav: Array<Page>
}

const pageProps: pageCollection = { // eventually pull this asynchronously from external json
    "nav": [
        {
            "label": "Home",
            "href": "/",
            "subPages": []
        },
        {
            "label": "About",
            "href": "#",
            "subPages": []
        },
        {
            "label": "Components",
            "href": "/components",
            "subPages": []
        },
        {
            "label": "Contact",
            "href": "#",
            "subPages": []
        }
    ]
}

const Layout = (props: { children: ReactElement }): ReactElement => {
    return (
        <ThemeProvider>
            <Head>
                <title>Joseph Murnan</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav pageProps={pageProps} />
            { props.children }
            <Footer />
        </ThemeProvider>
    );
}

export default Layout;
