export interface Directory {
    name: string;
    path: string;
    current: boolean;
    type: string;
    subfolders: Subfolder;
};

export interface Tab {
    id: number,
    type: string,
    name: string,
    title: string,
    date: Function,
};

export interface Subfolder {
    [key: string]: Directory
};

export enum ActionType {
    BACKSPACE = "Backspace", // handle backspace key press
    ENTER = "Enter",         // handle enter key press
    WRITE = "Write",         // handle keystroke matching item in keystrokes array
    SET = "Set"              // replace whole string with new string
};

export interface PrevLine {
    active: string,
    text: string
};

export interface Window {
    currentText:string;
    active:Directory;
    prevLines: Array<PrevLine>
};

export interface WindowReducer {
    type: ActionType | string;
    payload: any;
};

export interface Component {
    name: string,
    title: string,
    subtitle: string,
    content: string,
    subComponents: SubComponent
};

export interface ComponentContent {
    [key: string]: Component
};

interface SubComponent {
    [key: string]: Component
};
