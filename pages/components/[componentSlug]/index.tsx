import { useRouter } from 'next/router';
import { ComponentContent } from '../../../store/types';
import componentContent from '../../../store/componentContent.json';
import Internal from '../../../components/Internal/Internal';

const ComponentDetail = () => {
    const router = useRouter();
    const content: ComponentContent = componentContent;
    const slug: string | string[] | undefined = router.query.componentSlug;
    return (
        <>
            {
            (typeof slug == 'string' && content[slug]) ? 
                <Internal title={content[slug].title}>
                    <div>{ content[slug].content }</div> 
                </Internal>
            : 
                <Internal title="Not Found"><div></div></Internal>
            }
        </>
    );
}

export default ComponentDetail;
