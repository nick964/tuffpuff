import {Inject, Injectable, OnInit} from '@angular/core';
import { AngularFireStorage} from '@angular/fire/storage';
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnInit {
  private basePath = '/posters';
  file: File;
  imageMap: Map<string, string> = new Map();
  url = '';

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit() {

  }



  getPosterImage(imgName: string): Promise<any> {
    const errorMsg = '';
    return new Promise(resolve =>  {
    this.storage.ref(this.basePath + '/' + imgName).getDownloadURL().subscribe(value => {
      console.log('returned url: ' + value);
      resolve(value);
      },
      error1 => {
        debugger;
        console.log('error is ' + error1);
      });
    });
  }


  // method to upload file at firebase storage
  async uploadFile() {
    if (this.file) {
      const filePath = `${this.basePath}/${this.file.name}`;    //path at which image will be stored in the firebase storage
      const snap = await this.storage.upload(filePath, this.file);    //upload task
      this.getUrl(snap);
    } else {alert('Please select an image'); }
  }

  // method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url;  // store the URL
    console.log(this.url);
  }

}
