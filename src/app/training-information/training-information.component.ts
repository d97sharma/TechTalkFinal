import { Component, OnInit } from '@angular/core';
// import { TemplateInfo } from '../training-module/template-info'

@Component({
  selector: 'app-training-information',
  templateUrl: './training-information.component.html',
  styleUrls: ['./training-information.component.scss']
})
export class TrainingInformationComponent implements OnInit {

  // index:number;
  // templateInfo: TemplateInfo;
  // templateInfoList: TemplateInfo[] = [];
  // templateZones: number[] = [];
  // constructor() { }

  ngOnInit() {
    // this.index = 0;
    // this.templateInfo = { TemplateImgURL: null, TemplateName: ""}
    
  }

  // addTemplate(){
  //   // this.index += 1;
  //   // this.templateZones.push(this.index); 
  //   this.templateInfoList.push(this.templateInfo);
  //   this.templateInfo = { TemplateImgURL: null, TemplateName: ""}
  // }

  // removeTemplate(idx){
  //   this.templateInfoList.splice(idx, 1);
  // }

}