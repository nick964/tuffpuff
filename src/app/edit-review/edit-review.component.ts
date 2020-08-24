import {Component, Inject, Input, OnInit} from '@angular/core';
import {Upload} from '../models/upload';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {UploadService} from '../service/upload.service';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {AuthService} from '../service/auth.service';
import {Review} from '../models/review';
import {StorageService} from '../service/storage.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    dayWatched: new FormControl(new Date()),
    uploadPoster: new FormControl('')
  });

  items: Observable<any[]>;
  reviews: Review[] = [];
  review: AngularFireObject<Review[]>;
  reviewToEdit: any;


  @Input() error: string | null;

  isLoaded = false;
  task: AngularFireUploadTask;
  uploadProgress: any;
  routeId: string;
  selectedFiles: FileList;
  currentUpload: Upload;
  fileHasUploaded = false;
  constructor(@Inject(AngularFireDatabase) public db: AngularFireDatabase,
              @Inject(StorageService) private realStorage: StorageService, private route: ActivatedRoute,
              private uploadService: UploadService) {
    const rizoute = this.route;
    console.log(rizoute);
    this.routeId = this.route.snapshot.params.key;
    if (this.routeId) {
      // map to reviews
      this.db.object(`reviews/` + this.routeId).snapshotChanges().subscribe(snap => {
        this.reviewToEdit = snap.payload.val();
        this.realStorage.getPosterImage(this.reviewToEdit.movie.img).then(value => {
          this.reviewToEdit.movie.img = value;
          console.log(this.reviewToEdit);
        });
        this.isLoaded = true;
      });

    } else {
      // display error
    }
  }


  ngOnInit() {
    console.log('logging review to edit');


  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.pushUpload(this.currentUpload).then(onfufil => {
      debugger;
      this.reviewToEdit.movie.img = onfufil;
      this.fileHasUploaded = true;
    });

  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  editMovie() {
    if (this.form.valid && this.fileHasUploaded) {

      this.db.object(`reviews/` + this.routeId).update(this.reviewToEdit).then(res => {
        console.log('succes');
        console.log(res);
      }).catch(err => {
        console.log('error');
        console.log(err);
      });

    }
  }
}
