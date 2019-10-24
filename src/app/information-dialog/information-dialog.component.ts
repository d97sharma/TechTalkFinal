import { Component, OnInit } from '@angular/core';
import { ExtractedInformationService } from '../extracted-information.service';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss']
})
export class InformationDialogComponent implements OnInit {

  constructor(
              private extractedInformation : ExtractedInformationService
               ) { }

infoExtracted :any;

  ngOnInit() {
          this.infoExtracted = this.extractedInformation.extractedData;
  }

}
