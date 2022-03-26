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
