import {Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Review} from './models/review';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  itemValue = '';
  items: Observable<any[]>;
  reviews: Review[];
  title = 'tuffin-app';

  constructor(public db: AngularFireDatabase) {
    this.items = db.list('reviews').valueChanges();
  }

  ngOnInit(): void {
    this.items.subscribe(value => {
      console.log(value);
      this.reviews = value;
    });
  }

  onSubmit() {
    this.db.list('items').push({ content: this.itemValue});
    this.itemValue = '';
  }
}
