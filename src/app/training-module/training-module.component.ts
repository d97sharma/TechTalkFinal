import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-training-module',
  templateUrl: './training-module.component.html',
  styleUrls: ['./training-module.component.css']
})
export class TrainingModuleComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor() { }

  ngOnInit() {
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
      // show cropper
  }

  cropperReady() {
      // cropper ready
  }

  loadImageFailed() {
      // show message
  }

}
