import { ThemeProvider } from '../../store/theme';
import Head from 'next/head'
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

interface layoutProps {
    children: { props: object }
}

export interface pageCollection {
    nav: Array<{label: string, href: string}>
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

const Layout = (props: layoutProps) => {
    return (
        <ThemeProvider>
            <Head>
                <title>Joseph Murnan</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav pageProps={pageProps} />
            {props.children}
            <Footer />
        </ThemeProvider>
    );
}

export default Layout;