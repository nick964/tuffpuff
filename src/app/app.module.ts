import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {  MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewComponent } from './review/review.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import { environment } from '../environments/environment';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ReviewComponent
  ],
    imports: [
        MatSliderModule,
        MatToolbarModule,
        MatIconModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        MatCardModule,
        // for database
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
