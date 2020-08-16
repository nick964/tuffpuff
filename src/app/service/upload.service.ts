import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {Upload} from '../models/upload';
import {finalize} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = '/uploads';
  private uploadTake: af.storage.UploadTask;


  constructor(private af: AngularFireStorage, private db: AngularFireDatabase) { }

  pushUpload(upload: Upload) {
    const storageRef = this.af.storage.ref();
    this.uploadTake = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    this.uploadTake.on(this.af.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error);
      },
      () => {
      upload.url = this.uploadTake.snapshot.url;
      upload.name = upload.file.name;


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

  private deleteFileData(key:string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    let storageRef = this.af.storage.ref();
    storageRef.child((`${name}`)).delete();
  }

}
