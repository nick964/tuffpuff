import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {StorageService} from '../service/storage.service';
import {Observable} from 'rxjs';
import {Review} from '../models/review';

@Component({
  selector: 'app-myhome',
  templateUrl: './myhome.component.html',
  styleUrls: ['./myhome.component.css']
})
export class MyhomeComponent implements OnInit {
  items: Observable<any[]>;
  reviews: Review[];

  constructor(@Inject(AngularFireDatabase) public db: AngularFireDatabase,
              @Inject(StorageService) private realStorage: StorageService) {
    this.items = db.list('reviews').valueChanges();
  }

  ngOnInit(): void {
    this.items.subscribe(value => {
      console.log(value);
      this.reviews = value;
    });
  }
}
