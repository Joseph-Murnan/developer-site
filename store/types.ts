export interface Directory {
    name: string;
    current: boolean;
    type: string;
};

export interface FileSystem {
    [key: string]: Directory;
}
