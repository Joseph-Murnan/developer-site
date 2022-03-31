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
    BACKSPACE = "Backspace",
    ENTER = "Enter",
    WRITE = "Write",
    SET = "Set"
};

export interface Window {
    currentText:string;
    active:Directory;
    prevLines:Array<string>;
};

export interface WindowReducer {
    type: ActionType | string;
    payload: any;
};
