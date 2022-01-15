import type { NextPage } from 'next'
import Hero from '../components/Hero/Hero';
import { Fragment } from 'react';
import Text from '../components/Text/Text';

const Home: NextPage = () => {
    return (
        <Fragment>
            <Hero />
            <Text />
        </Fragment>
    )
}

export default Home
