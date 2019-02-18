import { Component, OnInit } from '@angular/core';
import { Target } from '@angular/compiler';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  endpoints: number[];
  serviceUrl: string;
  currentService: string;

  constructor() {
    this.endpoints = [1, 2, 3];
  }

  ngOnInit() {
    this.serviceUrl = 'http://sampleserver6.arcgisonline.com/arcgis/rest/services';
  }

  viewServiceDetails(event: any): void {
    // const target = ( event.target as Element);
    console.log(event);
  }

}
