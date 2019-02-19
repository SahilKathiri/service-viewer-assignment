export interface IFolder {
    currentVersion: number;
    folders: string[];
    services: IService[];
}

export interface IService {
    name: string;
    type: string;
}

export interface IImageService {
    name: string;
    extent: IExtent;
    initialExtent: IExtent;
    fullExtent: IExtent;
}

export interface IExtent {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    spatialReference: ISpatialReference;
}

export interface ISpatialReference {
    wkid: number;
    latestWkid: number;
}

export interface IImage {
    href: string;
    width: number;
    height: number;
    extent: IExtent;
    scale: number;
}
