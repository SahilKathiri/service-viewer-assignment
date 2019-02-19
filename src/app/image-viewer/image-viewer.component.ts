/**
 * This component handles the display of the image
 */
import { Component, OnInit, Input } from '@angular/core';
import { IImage } from '../interfaces';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  /**
   * Contains information from the ExportImage action
   */
  @Input() image: IImage;

  constructor() { }

  ngOnInit() {
  }

}
