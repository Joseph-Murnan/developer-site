import { useRouter } from 'next/router';
import { ComponentContent } from '../../../../store/types';
import componentContent from '../../../../store/componentContent.json';
import Internal from '../../../../components/Internal/Internal';

const ComponentDetail = () => {
    const router = useRouter();
    const content: ComponentContent = componentContent;
    const parentSlug: string | string[] | undefined = router.query.componentSlug;
    const slug: string | string[] | undefined = router.query.subComponentSlug;
    return (
        <>
            {
            (typeof parentSlug == 'string' && typeof slug == 'string' && content[parentSlug] && content[parentSlug].subComponents[slug]) ? 
                <Internal title={content[parentSlug].subComponents[slug].title}>
                    <div>{ content[parentSlug].subComponents[slug].content }</div> 
                </Internal>
            : 
                <Internal title="Not Found"><div></div></Internal>
            }
        </>
    );
}

export default ComponentDetail;
