import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Upload} from '../models/upload';
import {finalize, map, tap} from 'rxjs/operators';
import UploadTask = firebase.storage.UploadTask;



@Injectable({
  providedIn: 'root'
})
export class UploadService {




  constructor(private af: AngularFireStorage, private db: AngularFireDatabase) { }


  private basePath = 'posters/';
  pushUpload(upload: Upload): Promise<any> {
    return new Promise((resolve, reject) =>  {
    const storageRef = this.af.ref(this.basePath + upload.file.name);
    const task = this.af.upload(this.basePath + upload.file.name, upload.file);
    task.snapshotChanges().pipe(
      finalize(() => {
         console.log('done uploading');
         storageRef.getDownloadURL().subscribe(res => {
           upload.url = res;
           resolve(res);
         });
      })
    ).subscribe(complete => {
      console.log('uploading');
      upload.progress = ((complete.bytesTransferred / complete.totalBytes) * 100);
      console.log(complete);
    },
      error =>  {
        console.log('error');
        console.log(error);
        reject(error);
      });
    });
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key).then(
      () => {
        this.deleteFileStorage(upload.name);
      }).catch(error => {
        console.log(error);
    });
  }

  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = this.af.storage.ref();
    storageRef.child((`${name}`)).delete();
  }

}
