/**
 * This component handles the display of ImageServer properties and viewing the images
 */

import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IService, IImageService, IImage } from '../interfaces';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  /**
   * Contains details of the ImageService.
   * Currently only contains information about extents and the name
   */
  serviceDetail: IImageService;

  /**
   * Contains the result of ExportImage
   */
  image: IImage;

  /**
   * Gets and sets the current Service (that is currently being viewed)
   *
   * On change queries the data again.
   */
  private _service: IService;
  @Input() set service(value: IService) {
    const changed = this._service !== value;
    this._service = value;

    if (changed && this.service != null && this.serviceUrl != null) {
      console.log('Service Changed. Querying image details');
      this.onImageServiceChanged();
    }
  }

  get service() {
    return this._service;
  }

  /**
   * Gets and sets the Service Folder URL
   *
   * On change queries the data again.
   */
  private _serviceUrl: string;
  @Input() set serviceUrl(value: string) {
    const changed = this._serviceUrl !== value;
    this._serviceUrl = value;

    if (changed && this.service != null && this.serviceUrl != null) {
      console.log('Service Changed. Querying image details');
      this.onImageServiceChanged();
    }
  }

  get serviceUrl() {
    return this._serviceUrl;
  }

  /**
   * Initialize HttpClient for requests
   * @param http HttpClient
   */
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  /**
   * Handles change of Service Folder URL and Current Service.
   *
   * Queries the endpoint for updated data.
   */
  onImageServiceChanged(): void {
    this.image = null;

    const jsonServiceUrl = `${this.serviceUrl}/${this.service.name}/${this.service.type}?f=json`;

    this.http.get<IImageService>(jsonServiceUrl).toPromise()
      .then((value: IImageService) => {
        console.log(value.name);
        console.log(value.extent);
        console.log(value.initialExtent);
        console.log(value.fullExtent);
        this.serviceDetail = value;
      })
      .catch((reason: any) => {
        console.log(reason);
      });
  }

  /**
   * Performs the ExportImage action on the Image server.
   *
   * Contains information on the image url and its bounding box.
   * The `extent` property of the ImageServer is used for the `bbox` value
   */
  viewImage(): void {
    const bbox = this.serviceDetail.extent;
    const bboxString = `${bbox.xmin},${bbox.ymin},${bbox.xmax},${bbox.ymax}`;
    const jsonServiceUrl = `${this.serviceUrl}/${this.service.name}/${this.service.type}`
      + `/exportImage?bbox=${bboxString}&format=jpgpng&f=json`;

    console.log(jsonServiceUrl);
    this.http.get<IImage>(jsonServiceUrl).toPromise()
      .then((value: IImage) => {
        console.log(value);
        this.image = value;
      })
      .catch((reason: any) => {
        console.log(reason);
      });
  }

}
