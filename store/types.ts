export interface Directory {
    name: string;
    path: string;
    current: boolean;
    type: string;
};

export interface FileSystem {
    [key: string]: Directory;
}
