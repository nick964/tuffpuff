import {Inject, Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private user: User;

  constructor(@Inject(AngularFireAuth) private firebaseAuth: AngularFireAuth) { }


  trySignUp(email: string, password: string) {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('signed up', res);
    }).catch(error => {
      console.log('something went wrong: ', error.message);
    });
  }

  signIn(email: string, password: string) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('Succesfully signed in!');
      this.loggedIn = true;
      this.createUser(res);
    }).catch(error => {
      console.log('something went wrong during signin: ', error.message);
    });
  }

  signOut() {
    this.firebaseAuth.signOut();
    this.loggedIn = false;
  }

  createUser(res: UserCredential) {
    this.user = new User();
    this.user.username = res.additionalUserInfo.username;
    this.user.email = res.user.email;
  }




}
