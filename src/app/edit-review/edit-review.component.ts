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
import {debug} from 'util';
import {Score} from '../models/score';
import {AuthService} from '../service/auth.service';
import {User} from '../models/user';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  items: Observable<any[]>;
  reviews: Review[] = [];
  review: AngularFireObject<Review[]>;
  reviewToEdit: Review;
  yourScore: Score;
  yourScores: Score[] = [];
  errors: string[] = [];


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
              private router: Router, private uploadService: UploadService, public dialog: MatDialog,
              private auth: AuthService) {
    this.routeId = this.route.snapshot.params.key;
    if (this.routeId) {
      // map to reviews
      this.db.object(`reviews/` + this.routeId).snapshotChanges().subscribe(snap => {
        this.reviewToEdit = snap.payload.val() as Review;
        this.reviewToEdit.dateReviewed = new Date(this.reviewToEdit.dateReviewed);
        debugger;
        if (this.reviewToEdit && this.reviewToEdit.scores && this.auth.loggedIn) {
          const user = this.auth.user;
          const scores = Object.values(this.reviewToEdit.scores);
          scores.forEach(score => {
            if (user.username.indexOf(score.user) > -1) {
              this.yourScore = score;
              this.yourScores.push(this.yourScore);
            }
          });
        }
        this.isLoaded = true;
      });

    } else {
      // display error
    }
  }


  ngOnInit() {



  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.pushUpload(this.currentUpload).then(onfufil => {
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
    if (this.checkValid()) {
      this.db.object(`reviews/` + this.routeId).update(this.reviewToEdit).then(res => {
        console.log('succes');
        console.log(res);
      }).catch(err => {
        console.log('error');
        console.log(err);
      });

    }
  }
   checkValid(): boolean {
    this.errors = [];
    let isValid = true;
    if (!this.reviewToEdit.movie.title) {
      this.errors.push('Title is missing');
      isValid = false;
    }
    if (!this.reviewToEdit.dateReviewed) {
      this.errors.push('Date reviewed is not present');
      isValid = false;
    }
    if (!this.reviewToEdit.img || this.reviewToEdit.img.indexOf('firebase') === -1) {
      this.errors.push('Image uploaded is invalid');
      isValid = false;
    }
    return isValid;
  }
}
