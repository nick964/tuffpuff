import {Component, Inject, Input, OnInit} from '@angular/core';
import {Review} from '../models/review';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
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

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private realStorage: StorageService) { }

  ngOnInit() {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    debugger;
    const ref = this.storage.ref('/posters');
    console.log('logging all');
    const reviewRef = this.storage.ref(this.review.img);
    this.imagePath = reviewRef.getDownloadURL();
  }

}
