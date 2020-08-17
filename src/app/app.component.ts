import {Component, Inject, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Review} from './models/review';
import {StorageService} from './service/storage.service';
import {AuthService} from './service/auth.service';

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

  constructor(@Inject(AngularFireDatabase) public db: AngularFireDatabase,
              @Inject(StorageService) private realStorage: StorageService,
              @Inject(AuthService) private auth: AuthService) {
    this.items = db.list('reviews').valueChanges();
  }

  ngOnInit(): void {

  }

  justLogOut() {
    this.auth.signOut();
  }
}

