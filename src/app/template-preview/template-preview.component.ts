import { Component, OnInit } from '@angular/core';
import { TemplateUrlService } from '../template-url.service';

@Component({
  selector: 'app-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss']
})
export class TemplatePreviewComponent implements OnInit {

  constructor(
            private templateServiceObj:TemplateUrlService
  ) { }
  public imgUrl:string;
  public imgName:string;
  ngOnInit() {
    this.imgUrl = this.templateServiceObj.templateDetails.ImageDataURL;
    this.imgName = this.templateServiceObj.templateDetails.ImageName;

  }

}
