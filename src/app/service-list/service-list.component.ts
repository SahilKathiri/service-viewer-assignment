/**
 * Main component.
 * Handles the initial call to Service Folder url and populates the sidebar with ImageServices.
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFolder, IService } from '../interfaces';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  /**
   * List of ImageServer endpoints
   */
  endpoints: IService[];

  /**
   * Currently selected service
   */
  currentService: IService;

  /**
   * Initialize HttpClient for requests
   * @param http HttpClient
   */
  constructor(private http: HttpClient) {
  }

  private _serviceUrl: string;
  /**
   * Sets the Service Folder URL.
   * On value change, calls `this.getFolder()` to populate sidebar
   */
  public set serviceUrl(value: string) {
    const changed = this._serviceUrl !== value;
    this._serviceUrl = value;

    if (changed) {
      this.getFolder();
    }
  }

  /**
   * Gets the Service Folder URL
   */
  public get serviceUrl(): string {
    return this._serviceUrl;
  }

  /**
   * Sets the default service url.
   * Must use https:// since application is hosted on Azure as a secure site
   */
  ngOnInit() {
    this.serviceUrl = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services';
  }

  /**
   * Sets the currently viewing service to the clicked service.
   *
   * Executed on click of sidebar list item.
   * @param service Clicked Service
   */
  viewServiceDetails(service: IService): void {
    this.currentService = service;
  }

  /**
   * Gets ImageServer results from the Service Folder.
   *
   * Populates `this.endpoints` to the resulting list.
   */
  getFolder(): any {
    const jsonServiceUrl = this._serviceUrl + '?f=json';
    this.http.get<IFolder>(jsonServiceUrl).toPromise()
      .then((value: IFolder) => {
        this.endpoints = value.services.filter((service: IService) => service.type === 'ImageServer');
        console.log(this.endpoints);
      })
      .catch((reason: any) => {
        console.log(reason);
        this.endpoints = [];
      });
  }
}
