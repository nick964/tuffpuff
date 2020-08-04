import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {MyhomeComponent} from './myhome/myhome.component';
import {AddReviewComponent} from './add-review/add-review.component';


const routes: Routes = [
  {path: '', component: MyhomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'addreview', component: AddReviewComponent},
  {path: 'signup', component: SignupComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
