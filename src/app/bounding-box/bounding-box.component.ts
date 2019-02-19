/**
 * This component handles display of the Extents
 */
import { Component, OnInit, Input } from '@angular/core';
import { IExtent } from '../interfaces';

@Component({
  selector: 'app-bounding-box',
  templateUrl: './bounding-box.component.html',
  styleUrls: ['./bounding-box.component.scss']
})
export class BoundingBoxComponent implements OnInit {
  @Input() extent: IExtent;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
