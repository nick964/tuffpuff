import {Component, Inject, Input, OnInit} from '@angular/core';
import {Review} from '../models/review';
import {Score} from '../models/score';
import {StorageService} from '../service/storage.service';

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

  constructor(@Inject(StorageService) private realStorage: StorageService) { }

  ngOnInit() {
    this.setSelectedImg();
    this.realStorage.getPosterImage(this.review.movie.img).then(value => {
      this.review.img = value;
    });


  }

  setSelectedImg() {
    if (this.review.selectedBy) {

    }
  }



}
