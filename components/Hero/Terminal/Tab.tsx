import { useCallback, ReactElement } from 'react';

interface Props {
    title: string;
    index: number;
    setOpenTab: (index: number) => void;
}

const Tab = (props: Props): ReactElement => {
    const title = props.title;
    const setOpenTab = props.setOpenTab;
    const index = props.index;
    const onClick = useCallback(() => setOpenTab(index), [setOpenTab, index]);
    return <a onClick={onClick}>{title}</a>;
}

export default Tab;