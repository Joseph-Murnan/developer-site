import React, { useState, useEffect } from 'react';

interface themeProps {
    children: Array <Object>
}

interface themeButton extends HTMLButtonElement {
    name: string
}

interface clickEvent extends React.MouseEvent<HTMLButtonElement> {
    target: themeButton
}

const Theme = React.createContext({
    theme:'one',
    onSwitch:(props: clickEvent) => {}
    // onSwitch:(props: clickEvent) => {}
});

export const ThemeProvider = (props: themeProps) => {
    const [theme, setTheme] = useState('one');
    useEffect(() => setTheme((localStorage.getItem('theme') || 'blueTheme')), []);
    const switchHandler = (props: clickEvent) => {
        setTheme(props.target.name);
        localStorage.setItem('theme', props.target.name);
    };
    return <Theme.Provider value={{theme, onSwitch: switchHandler}}>{props.children}</Theme.Provider>
}

export default Theme;
