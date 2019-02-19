import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFolder, IService } from '../interfaces';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  endpoints: IService[];
  private _serviceUrl: string;
  currentService: IService;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.serviceUrl = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services';
  }

  public set serviceUrl(value: string) {
    const changed = this._serviceUrl !== value;
    this._serviceUrl = value;

    if (changed) {
      this.getFolder();
    }
  }

  public get serviceUrl(): string {
    return this._serviceUrl;
  }

  viewServiceDetails(service: IService): void {
    this.currentService = service;
  }

  getFolder(): any {
    const jsonServiceUrl = this._serviceUrl + '?f=json';
    this.http.get<IFolder>(jsonServiceUrl).toPromise()
    .then((value: IFolder) => {
      this.endpoints = value.services.filter((service: IService) => service.type === 'ImageServer' );
      console.log(this.endpoints);
    })
    .catch((reason: any) => {
      console.log(reason);
      this.endpoints = [];
    });
  }
}
