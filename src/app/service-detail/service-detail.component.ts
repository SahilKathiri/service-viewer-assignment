import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IService, IImageService, IExtent, IImage } from '../interfaces';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  private _service: IService;
  private _serviceUrl: string;

  serviceDetail: IImageService;
  image: IImage;

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

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
