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
  pushUpload(upload: Upload) {
    debugger;
    const storageRef = this.af.ref(this.basePath);

    const otherRef = storageRef.child(this.basePath + upload.file.name);

    const task = this.af.upload(this.basePath + upload.file.name, upload.file);
    task.snapshotChanges().pipe(
      finalize(() => {
       storageRef.getDownloadURL().subscribe(huh => {
         console.log('im in here');
         console.log(huh);
       });
      })
    ).subscribe(complete => {
      console.log('in end subscribe');
      console.log(complete);
    },
      error =>  {
        console.log('error');
        console.log(error);
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
