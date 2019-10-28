import { Component, OnInit } from '@angular/core';

import {PdfUploaderComponent} from '../extraction-module/pdf-uploader/pdf-uploader.component';
import { FileNameService } from '../file-name.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { InformationDialogComponent } from '../information-dialog/information-dialog.component';
import { HttpClient } from '@angular/common/http';

import { NotificationService } from '../notification.service';

import { ExtractedInformationService } from '../extracted-information.service';



@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss'],
  providers: [PdfUploaderComponent]
})

export class UploadListComponent implements OnInit {

showFlag : boolean = true;
fileList: string[]= null;
myJson = {
  "FileName":"",
  "FileType":""
}

b64MarkedImg: any = null; // contains the recieved base64 images

  constructor(
              private fileNameService : FileNameService,
              private dialog: MatDialog,
              private http:HttpClient,
              private notifyService : NotificationService,
              private extractedInformation : ExtractedInformationService
              ){ }
  
  deleteAttachment(index) {
    //this.files.splice(index, 1);
    this.fileList.splice(index, 1)
  }
  
  ngOnInit() {
    this.fileList = this.fileNameService.fileName;
    this.myJson = {
      "FileName":this.fileList[0],
      "FileType":this.fileNameService.fileType
    }    
   this.fileNameService.fileName = undefined;
    // this.files = this.fileComponent.files;
  }
  displayInfo() {
            // change the IP when in office
            // IP (Office): 172.23.179.252
            // IP (Home): 192.168.0.102
            this.http.post("http://172.23.179.252:5000/api/InfoExtractor  ",this.myJson).subscribe(
              (data: any) => {
                this.extractedInformation.b64MarkedImages = data["MarkedImages"]
                this.extractedInformation.extractedData = data["Info"];
                this.openDialog();                      
            }
            );
            
      }

      convertToJpeg(){
                      // change the IP to 172.23.179.252 when in office
                      this.http.post("http://172.23.179.252:5000/api/ConvertPDFs",this.myJson).subscribe(
                      (data: any) => {
                        this.notifyService.showSuccess(data["Status"],"");
                        this.displayInfo();                      
                    }
                    );
                                 
                }
      
        openDialog()
        {
          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;

          this.dialog.open(InformationDialogComponent, {
            height: '400px',
            width: '1000px',
          });
        }

  // imagePreview()
  // {

  //   const dialogConfig = new MatDialogConfig();

  //         dialogConfig.disableClose = true;
  //         dialogConfig.autoFocus = true;

  //         this.dialog.open(MarkedImagesComponent, {
  //           height: '850px',
  //           width: '750px',
  //         });
  // }
}
