import { MatDialog, MatDialogConfig } from '@angular/material';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import Cropper from "cropperjs";
import { HttpClient } from '@angular/common/http';
import { ImageDetails } from "./image-details"
import { TemplatePreviewComponent } from '../template-preview/template-preview.component';
import { TemplateUrlService } from '../template-url.service';
import { NotificationService } from '../notification.service';
import { ServeB64imagesService } from '../serve-b64images.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.component.html',
    styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

    @ViewChild("image", { static: false })
    public imageElement: ElementRef;
    public croppedImageName:string="hi";
    // public imageSource: string;
    public imageSource: any;

    public pageNumber:number;

    public imgWidth: number;
    public imgHeight: number;
    public uploadButton:boolean=false;
    public imageDestination: string;
    public base64: string;
    private cropper: Cropper;

    imageList: any[];
    pdfImagesUrl: any[];
    formData = new FormData();

    //My additions
    imageDetails:ImageDetails;
    imageDetailsList:ImageDetails[] = [];

    public constructor(
              private http : HttpClient,
              private dialog:MatDialog,
              private templateUrl:TemplateUrlService,
              private notification:NotificationService,
              private serveImages:ServeB64imagesService,
              private _sanitizer: DomSanitizer
    ) {
        // this.imageDestination = "";
        // this.imageSource = "assets/angular.png";
        //this.pdfImagesUrl = ["assets/angular.png","C:/Images/AmeriHome 1/AmeriHome 11"];
        //this.imageSource = "C:/Images";
    }

    ngOnInit() { 

        this.pageNumber = 0;
        this.imageDestination = "";
        this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + this.serveImages.markedb64Images[this.pageNumber]);

        this.imageDetails = {ImageName : "", ImageDataURL : "", ImgH:0, ImgW:0}
    }

    public ngAfterViewInit() {

        this.cropper = new Cropper(this.imageElement.nativeElement, {
            zoomable: false,
            scalable: false,
            aspectRatio: 0,
            autoCrop:false,
            autoCropArea: 0.0,
            crop: () => {
                const canvas = this.cropper.getCroppedCanvas();
                this.imgWidth = canvas.width;
                this.imgHeight = canvas.height;
                this.imageDestination = canvas.toDataURL("image/png");
                // console.log(this.imageDestination);
            }
        });
        
    }

    public convToJPG(imageDetails:ImageDetails)
    {

      const imageName = imageDetails.ImageName +'.jpg';
      // call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(imageDetails.ImageDataURL);
      const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });

      this.formData.append(imageName,imageFile);

    }

    addtoImgList(){
        this.uploadButton=true;
        this.imageDetails.ImageDataURL = this.imageDestination;
        this.imageDetails.ImgH = this.imgHeight;
        this.imageDetails.ImgW = this.imgWidth;
        this.imageDetailsList.push(this.imageDetails);
        this.imageDetails = {ImageName : "", ImageDataURL : "", ImgH:0, ImgW:0};
        this.cropper.reset();
    }


    uploadTemplates(){
        if (this.imageDetailsList.length === 0) {
            return;
          }
        
        this.imageDetailsList.forEach(element => { this.convToJPG(element);
            
        });
        //replace with "images"
        this.http.post<any>("http://localhost:2136/api/upload/images", this.formData).subscribe(
        (data: any) => { 
            this.notification.showSuccess("Templates Uploaded Successfully","");
      }
    ); 
         
    }


    public dataURItoBlob(dataURI) 
    {
      this.base64 = dataURI.substr(22);
      const byteString = window.atob(this.base64);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });    
      return blob;
   }

   removeTemplate(idx){
    this.imageDetailsList.splice(idx, 1);
   }

   imagePreview(template)
  {

    this.templateUrl.templateDetails=template;
    const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;

          this.dialog.open(TemplatePreviewComponent, {
            height: '400px',
            width: '1000px',
          });
  }
  incrementPage(){
    this.pageNumber +=1 ;

    this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + this.serveImages.markedb64Images[this.pageNumber]);
  }
  decrementPage(){
    if (this.pageNumber == 0){
      return
    }
    this.pageNumber -=1;

    this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + this.serveImages.markedb64Images[this.pageNumber]);

  }
}

