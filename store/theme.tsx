import React, { useState, useEffect, ReactElement } from 'react';

type Props = {
    children: ReactElement | ReactElement[]
}

const Theme = React.createContext({
    theme: 'blueTheme',
    onSwitch: (props: React.MouseEvent<HTMLButtonElement>) => {}
});

export const ThemeProvider = (props: Props): ReactElement => {
    const [theme, setTheme] = useState('');
    useEffect(() => setTheme((localStorage.getItem('theme') || 'blueTheme')), []);
    const switchHandler = (props: React.MouseEvent<HTMLButtonElement>) => {
        setTheme(props.currentTarget.name);
        localStorage.setItem('theme', props.currentTarget.name);
    };
    return <Theme.Provider value={{theme, onSwitch: switchHandler}}>{props.children}</Theme.Provider>
}

export default Theme;
