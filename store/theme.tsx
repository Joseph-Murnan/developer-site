import React, { useState, useEffect } from 'react';

interface Props {
    children: Array <Object>
}

const Theme = React.createContext({
    theme: 'blueTheme',
    onSwitch: (props: React.MouseEvent<HTMLButtonElement>) => {}
});

export const ThemeProvider = (props: Props) => {
    const [theme, setTheme] = useState('');
    useEffect(() => setTheme((localStorage.getItem('theme') || 'blueTheme')), []);
    const switchHandler = (props: React.MouseEvent<HTMLButtonElement>) => {
        setTheme(props.currentTarget.name);
        localStorage.setItem('theme', props.currentTarget.name);
    };
    return <Theme.Provider value={{theme, onSwitch: switchHandler}}>{props.children}</Theme.Provider>
}

export default Theme;
