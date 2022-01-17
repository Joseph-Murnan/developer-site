import type { NextPage } from 'next'
import { Fragment } from 'react';
import Hero from '../components/Hero/Hero';
import Text from '../components/Text/Text';
import Palette from '../components/ui/Palette';

const Home: NextPage = () => {
    return (
        <Fragment>
            <Palette />
            <Hero />
            <Text />
        </Fragment>
    )
}

export default Home
