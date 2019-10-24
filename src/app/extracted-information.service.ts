import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtractedInformationService {
  extractedData:any;
  b64MarkedImages: string[];
  constructor() { }
}
