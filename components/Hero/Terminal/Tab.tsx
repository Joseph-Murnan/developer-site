import { useCallback, ReactElement } from 'react';

type Props = {
    title: string;
    index: number;
    setOpenTab: (index: number) => void;
}

const Tab = (props: Props): ReactElement => {
    const { title, index, setOpenTab } = props;
    const onClick = useCallback(() => setOpenTab(index), [setOpenTab, index]);
    return <a className="centre" onClick={ onClick }>{ title }</a>;
}

export default Tab;