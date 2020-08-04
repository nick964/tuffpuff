import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    dayWatched: new FormControl(new Date()),
  });

  @Input() error: string | null;

  task: AngularFireUploadTask;
  uploadProgress: any;

  constructor(private af: AngularFireStorage) { }

  ngOnInit() {
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
