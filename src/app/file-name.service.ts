import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileNameService {
fileName : string[];
fileType : string;
  constructor() { }
}
