import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/notification.service';
import { FileNameService } from 'src/app/file-name.service';
import { ServeB64imagesService } from '../serve-b64images.service';
import { MatDialog } from '@angular/material';
import { FilePreViewComponent } from '../file-pre-view/file-pre-view.component';

export interface FilePreviewData {
  fileName: string,
  fileData: any;
}

@Component({
  selector: 'app-training-uploader',
  templateUrl: './training-uploader.component.html',
  styleUrls: ['./training-uploader.component.scss'],
})
export class TrainingUploaderComponent implements OnInit {

  // markedImages: any = null;

  showSpinner:boolean;
  pdfURL: string = "";
  files: any[] = [];
  fileNames: string[]= [];
  fileType: string;
  myJson = {
    "FileName":"",
    "FileType":""
  }

  constructor(
    private http: HttpClient,
    private notifyService : NotificationService,
    private fileNameService: FileNameService,
    private serveImages: ServeB64imagesService,
    private dialog: MatDialog
    ) { 
      this.showSpinner = false;
    }

    ngOnInit() {
      this.fileType = this.fileNameService.fileType;
    }
    sendFiles (){ 
      if (this.files.length === 0) {
        return;
      }

      this.showSpinner = true;
      this.fileType = this.fileNameService.fileType;
      this.myJson = {
        "FileName":this.fileNames[0],
        "FileType":this.fileNameService.fileType
      }
      const formData = new FormData();
      
      for (let file of this.files) {
        formData.append("File", file);
      }
  
      this.http.post("http://localhost:2136/api/upload/files", formData).subscribe(
          () => {
            // change the IP when in office
            // Home IP: 192.168.0.102
            // Office IP: 172.23.179.252
            this.http.post("http://192.168.0.102:5000/api/GetTrainingImgs",this.myJson).subscribe(
              (data: any) => {
                this.serveImages.markedb64Images = data["Base64Imgs"];
                this.notifyService.showSuccess("File uploaded successfully", "Notification");
              }
            )
          });
        
     
    }
  
    uploadFile(event) {
      for (let index = 0; index < event.length; index++) {
        const element = event[index];
        this.fileNames.push(element.name.split('.')[0]);
        this.files.push(element);
        //this.fileNameService.fileName.push(element.name);
      }  
      this.fileNameService.fileName = this.fileNames;

      
    }

    filePreview(index: number){
      // this.notifyService.showSuccess(this.fileNames[index],"");
      this.openDialog();  
    }
    deleteAttachment(index) {
      this.files.splice(index, 1);
      this.fileNames.splice(index, 1);
      this.fileNameService.fileName = this.fileNames;
    }

    openDialog()
        {

          this.pdfURL = window.URL.createObjectURL(this.files[0]);
          

          this.dialog.open(FilePreViewComponent, {
            height: '98%',
            width: '88%',
            panelClass: 'full-screen-modal',
            data:{fileName: this.fileNames[0], fileData: this.pdfURL},
            autoFocus: true
          });
        }

}
