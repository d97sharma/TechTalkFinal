import { Component, OnInit } from '@angular/core';
import { ExtractedInformationService } from '../extracted-information.service';

@Component({
  selector: 'app-marked-images',
  templateUrl: './marked-images.component.html',
  styleUrls: ['./marked-images.component.scss']
})
export class MarkedImagesComponent implements OnInit {

  constructor(private extractedInformation : ExtractedInformationService) { }
b64MarkedImages:string[];
  ngOnInit() {
    this.b64MarkedImages = this.extractedInformation.b64MarkedImages;
  }

}
