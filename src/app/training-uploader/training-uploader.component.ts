import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/notification.service';
import { FileNameService } from 'src/app/file-name.service';
import { ServeB64imagesService } from '../serve-b64images.service';

@Component({
  selector: 'app-training-uploader',
  templateUrl: './training-uploader.component.html',
  styleUrls: ['./training-uploader.component.scss'],
})
export class TrainingUploaderComponent implements OnInit {

  // markedImages: any = null;

  progress: number;
  files: any[] = [];
  fileNames: string[]= [];
  fileType: string;
  myJson = {
    "FileName":"",
    "FileType":""
  }

  constructor(private http: HttpClient,
    private notifyService : NotificationService,
    private fileNameService: FileNameService,
    private serveImages: ServeB64imagesService
    ) { }

    ngOnInit() {
      this.fileType = this.fileNameService.fileType;
    }
    sendFiles (){ 
      this.fileType = this.fileNameService.fileType;
      this.myJson = {
        "FileName":this.fileNames[0],
        "FileType":this.fileNameService.fileType
      }
      
      if (this.files.length === 0) {
        return;
      }
     
      const formData = new FormData();
      
      for (let file of this.files) {
        formData.append("File", file);
      }
  
      this.http.post("http://localhost:2136/api/upload/files", formData).subscribe(
          () => {
            this.notifyService.showSuccess("File uploaded successfully", "Notification");
            // change the IP when in office
            this.http.post("http://172.23.179.252:5000/api/GetTrainingImgs",this.myJson).subscribe(
              (data: any) => {
                this.serveImages.markedb64Images = data["Base64Imgs"];
                this.notifyService.showSuccess("File converted successfully", "Notification");
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
    deleteAttachment(index) {
      this.files.splice(index, 1);
      this.fileNames.splice(index, 1);
      this.fileNameService.fileName = this.fileNames;
    }

}
