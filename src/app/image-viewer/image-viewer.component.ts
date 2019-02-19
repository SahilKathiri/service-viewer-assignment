import { Component, OnInit, Input } from '@angular/core';
import { IImage } from '../interfaces';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @Input() image: IImage;

  constructor() { }

  ngOnInit() {
  }

}
