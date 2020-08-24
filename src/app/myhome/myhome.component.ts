import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {StorageService} from '../service/storage.service';
import {Observable} from 'rxjs';
import {Review} from '../models/review';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-myhome',
  templateUrl: './myhome.component.html',
  styleUrls: ['./myhome.component.css']
})
export class MyhomeComponent implements OnInit {
  items: Observable<any[]>;
  reviews: Review[] = [];

  constructor(@Inject(AngularFireDatabase) public db: AngularFireDatabase,
              @Inject(StorageService) private realStorage: StorageService) {
    this.items = this.db.list(`reviews`)
      .snapshotChanges()
      .pipe(map(items => {             // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, data};           // or {key, ...data} in case data is Obj
        });
      }));

    // map to reviews
    this.items.subscribe(vals => {
      vals.forEach(value => {
        const rev: Review = value.data;
        rev.key = value.key;
        this.reviews.push(rev);
      });
    });
  }

  ngOnInit(): void {
  }
}
