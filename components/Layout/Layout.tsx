import { ThemeProvider } from '../../store/theme';
import Head from 'next/head'
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { ReactElement } from 'react';

export interface Page {
    label: string,
    href: string
}

export interface pageCollection {
    nav: Array<Page>
}

const pageProps: pageCollection = { // eventually pull this asynchronously from external json
    "nav": [
        {
            "label": "About",
            "href": "#"
        },
        {
            "label": "Components",
            "href": "#"
        },
        {
            "label": "Contact",
            "href": "#"
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