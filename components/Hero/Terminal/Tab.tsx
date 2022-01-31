import { useCallback } from 'react';

type Props = {
    title: string;
    index: number;
    setOpenTab: (index: number) => void;
}

const Tab = (props: Props) => {
    const title = props.title;
    const setOpenTab = props.setOpenTab;
    const index = props.index;
    const onClick = useCallback(() => setOpenTab(index), [setOpenTab, index]);
    return <a onClick={onClick}>{title}</a>;
}

export default Tab;