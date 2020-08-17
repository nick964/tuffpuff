import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Upload} from '../models/upload';
import {UploadService} from '../service/upload.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Review} from '../models/review';
import {AuthService} from '../service/auth.service';
import {Movie} from '../models/movie';

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
  fileHasUploaded = false;


  constructor(private af: AngularFireStorage, private uploadService: UploadService,
              @Inject(AngularFireDatabase) public db: AngularFireDatabase, private auth: AuthService) { }

  ngOnInit() {
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.pushUpload(this.currentUpload);
    this.fileHasUploaded = true;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  submitNewMovie() {
    if (this.form.valid && this.fileHasUploaded) {
      debugger;
      const rev = new Review();
      const movie = new Movie();
      rev.dateReviewed = this.form.get('dayWatched').value;
      rev.selectedBy = this.auth.user.name;
      movie.title = this.form.get('title').value;
      movie.img = this.currentUpload.file.name;
      rev.selectedBy = this.auth.user.username;
      rev.movie = movie;
      this.db.list('reviews/').push(rev).then(res => {
        console.log(res);
      });
    }

  }
}
