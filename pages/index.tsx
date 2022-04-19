import type { NextPage } from 'next'
import Hero from '../components/Hero/Hero';
import Text from '../components/Text/Text';
import Palette from '../components/ui/Palette';
import Slider from '../components/Slider/Slider';

const Home: NextPage = () => {
    return (
        <>
            <Palette />
            <Hero />
            <Slider />
            <Text />
        </>
    )
}

export default Home
