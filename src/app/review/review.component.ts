import {Component, Inject, Input, OnInit} from '@angular/core';
import {Review} from '../models/review';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() review: Review;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit() {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const ref = this.storage.ref('/posters');
    console.log('logging all');
    ref.listAll().subscribe(value => {
      console.log(value);
    });
  }

}
