import { Component, OnInit } from '@angular/core';
import { ExtractedInformationService } from '../extracted-information.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss']
})
export class InformationDialogComponent implements OnInit {

  constructor(
              private extractedInformation : ExtractedInformationService,
              private notifyService : NotificationService
               ) { }

infoExtracted :any;

  ngOnInit() {
          this.infoExtracted = this.extractedInformation.extractedData;
  }
  notifTrial(value: string){
    this.notifyService.showSuccess(value,"");
  }

}
