import { Fragment } from 'react'
import Head from 'next/head'

interface layoutProps {
    children: Object
}

const Layout = (props: layoutProps) => {
    return (
        <Fragment>
            <Head>
                <title>Joseph Murnan</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {props.children}
        </Fragment>
    );
}

export default Layout;