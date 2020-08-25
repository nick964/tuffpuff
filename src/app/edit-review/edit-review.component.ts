import {Component, Inject, Input, OnInit} from '@angular/core';
import {Upload} from '../models/upload';
import {AngularFireUploadTask} from '@angular/fire/storage';
import {UploadService} from '../service/upload.service';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Review} from '../models/review';
import {StorageService} from '../service/storage.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PopupComponent} from '../popup/popup.component';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

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
              private router: Router, private uploadService: UploadService, public dialog: MatDialog) {
    const rizoute = this.route;
    console.log(rizoute);
    this.routeId = this.route.snapshot.params.key;
    if (this.routeId) {
      // map to reviews
      this.db.object(`reviews/` + this.routeId).snapshotChanges().subscribe(snap => {
        this.reviewToEdit = snap.payload.val();
        this.reviewToEdit.dateReviewed = new Date(this.reviewToEdit.dateReviewed);
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

  deletePopup() {
    const deletePopup = this.dialog.open(PopupComponent, {
      data: {
        message: 'Are you sure you want to delete the review for ' + this.reviewToEdit.movie.title
      }
    });
    deletePopup.afterClosed().subscribe(result => {
      console.log('logging result: ' + result);
      if (result) {
        this.db.object(`reviews/` + this.reviewToEdit.key).remove().then(res => {
          const youDidIt = this.dialog.open(PopupComponent, {
            data: {
              message: 'Review has been deleted.'
            }
          });
          youDidIt.afterClosed().subscribe(postDelete => {
            this.router.navigate(['/']);
          });
        });
      }
    });

  }

  editMovie() {
    if (this.fileHasUploaded) {

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
