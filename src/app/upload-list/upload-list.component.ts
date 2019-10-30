import { Component, OnInit } from '@angular/core';
import { FileNameService } from '../file-name.service';
import { HttpClient } from '@angular/common/http';
import { ExtractedInformationService } from '../extracted-information.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss'],
})

export class UploadListComponent implements OnInit {

showFlag : boolean = false;
fileList: string[]= null;
myJson = {
  "FileName":"",
  "FileType":""
}

b64MarkedImg: any = null; // contains the recieved base64 images

  constructor(
              private fileNameService : FileNameService,
              private http:HttpClient,
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
            // IP (Office): 172.23.179.252 / 172.23.115.77
            // IP (Home): 192.168.0.102
            this.http.post("http://192.168.0.102:5000/api/InfoExtractor  ",this.myJson).subscribe(
              (data: any) => {
                this.extractedInformation.b64MarkedImages = data["MarkedImages"]
                this.extractedInformation.extractedData = data["Info"];            
            }
            );
            
      }

      convertToJpeg(){
                      this.showFlag = true;
                      // IP (Office): 172.23.179.252 / 172.23.115.77
                      // IP (Home): 192.168.0.102
                      this.http.post("http://192.168.0.102:5000/api/ConvertPDFs",this.myJson).subscribe(
                      (data: any) => {
                        this.displayInfo();                      
                    }
                    );
                                 
                }
      
        
}
