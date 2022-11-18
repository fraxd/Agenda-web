import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { finalize, Observable } from 'rxjs';
import { FileUpload } from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = '/uploads';

constructor(private afs: AngularFirestore, private storage: Storage) { }


}
