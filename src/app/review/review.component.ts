import {Component, Inject, Input, OnInit} from '@angular/core';
import {Review} from '../models/review';
import {Score} from '../models/score';
import {StorageService} from '../service/storage.service';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() review: Review;
  scores: Score[];
  public imagePath: any;
  selectedAvatar: string;

  constructor(@Inject(StorageService) private realStorage: StorageService,
              @Inject(AngularFireDatabase) public db: AngularFireDatabase,) { }

  ngOnInit() {
    if (this.review && this.review.movie.img.indexOf('firebasestorage') === -1) {
      debugger;
      this.realStorage.getPosterImage(this.review.movie.img).then(value => {
        this.review.movie.img = value;
        this.db.object(`reviews/` + this.review.key).update(this.review).then(res => {
          console.log('updated with image');
          console.log(res);
        }).catch(err => {
          console.log('error');
          console.log(err);
        });
      });
    }



  }




}
