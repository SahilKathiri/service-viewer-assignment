/**
 * Holds results of Service Folder query:
 * e.g., https://sampleserver6.arcgisonline.com/arcgis/rest/services
 */
export interface IFolder {
    currentVersion: number;
    folders: string[];
    services: IService[];
}

/**
 * Structure of `services` object of `IFolder`
 */
export interface IService {
    name: string;
    type: string;
}

/**
 * Holds results of ImageServer query
 * e.g., https://sampleserver6.arcgisonline.com/arcgis/rest/services/<name>/ImageServer
 */
export interface IImageService {
    name: string;
    extent: IExtent;
    initialExtent: IExtent;
    fullExtent: IExtent;
}

/**
 * Structure of `extent` objects of `IImageService`
 */
export interface IExtent {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    spatialReference: ISpatialReference;
}

/**
 * Structure of `spatialReference` objects
 */
export interface ISpatialReference {
    wkid: number;
    latestWkid: number;
}

/**
 * Holds result of ExportImage action on ImageServer
 * e.g., https://sampleserver6.arcgisonline.com/arcgis/rest/services/<name>/ImageServer/exportImage?bbox=<extent>&format=jpgpng&f=json
 */
export interface IImage {
    href: string;
    width: number;
    height: number;
    extent: IExtent;
    scale: number;
}
