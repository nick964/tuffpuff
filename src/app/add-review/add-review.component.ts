import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Upload} from '../models/upload';
import {UploadService} from '../service/upload.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    dayWatched: new FormControl(new Date()),
    uploadPoster: new FormControl('')
  });

  @Input() error: string | null;

  task: AngularFireUploadTask;
  uploadProgress: any;
  selectedFiles: FileList;
  currentUpload: Upload;


  constructor(private af: AngularFireStorage, private uploadService: UploadService) { }

  ngOnInit() {
  }
  uploadSingle() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.pushUpload(this.currentUpload);

  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.uploadSingle();
  }
  upload(event) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    const ref = this.af.ref(randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
  }

  submitNewMovie() {

  }
}
