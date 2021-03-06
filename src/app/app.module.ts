import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewComponent } from './review/review.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ScoreComponent } from './score/score.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MyhomeComponent } from './myhome/myhome.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AddReviewComponent } from './add-review/add-review.component';
import { AddScoreComponent } from './add-score/add-score.component';
import {MatInputModule} from '@angular/material/input';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { AlertsComponent } from './alerts/alerts.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ReviewComponent,
    ScoreComponent,
    LoginComponent,
    SignupComponent,
    MyhomeComponent,
    AddReviewComponent,
    AddScoreComponent,
    EditReviewComponent,
    AlertsComponent,
    PopupComponent
  ],
  entryComponents: [
    PopupComponent
  ],
    imports: [
        MaterialModule,
        BrowserModule,
        MatInputModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        // for database
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
