import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}

export class SettingsService {






  

}
