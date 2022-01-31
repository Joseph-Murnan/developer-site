import React, { useState, useEffect } from 'react';

interface Props {
    children: Array <Object>
}

interface themeButton extends HTMLButtonElement {
    name: string
}

interface clickEvent extends React.MouseEvent<HTMLButtonElement> {
    target: themeButton
}

const Theme = React.createContext({
    theme: 'blueTheme',
    onSwitch: (props: clickEvent) => {}
});

export const ThemeProvider = (props: Props) => {
    const [theme, setTheme] = useState('');
    useEffect(() => setTheme((localStorage.getItem('theme') || 'blueTheme')), []);
    const switchHandler = (props: clickEvent) => {
        setTheme(props.target.name);
        localStorage.setItem('theme', props.target.name);
    };
    return <Theme.Provider value={{theme, onSwitch: switchHandler}}>{props.children}</Theme.Provider>
}

export default Theme;
