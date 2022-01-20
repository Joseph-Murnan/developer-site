import type { NextPage } from 'next'
import { Fragment } from 'react';
import Hero from '../components/Hero/Hero';
import Text from '../components/Text/Text';
import Palette from '../components/ui/Palette';
import Slider from '../components/Slider/Slider';

const Home: NextPage = () => {
    return (
        <Fragment>
            <Palette />
            <Hero />
            <Text />
            <Slider />
        </Fragment>
    )
}

export default Home
