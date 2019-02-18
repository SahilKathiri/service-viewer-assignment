import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  @Input() serviceUrl: string;

  constructor() { }

  ngOnInit() {
  }

}
