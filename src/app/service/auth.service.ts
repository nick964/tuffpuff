import {Inject, Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {User} from '../models/user';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = false;
  public user: User;

  constructor(@Inject(AngularFireAuth) private firebaseAuth: AngularFireAuth) { }


  trySignUp(email: string, password: string) {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('signed up', res);
    }).catch(error => {
      console.log('something went wrong: ', error.message);
    });
  }

  signIn(loginData: any): Promise<any> {
    return new Promise((resolve) => {
      this.firebaseAuth.signInWithEmailAndPassword(loginData.email, loginData.password).then(res => {
        console.log('Succesfully signed in!');
        this.loggedIn = true;
        resolve(this.createUser(res));
      }).catch(error => {
        console.log('something went wrong during signin: ', error.message);
        resolve('Error:' + error.message);
      });
    });
  }

  signOut() {
    this.firebaseAuth.signOut();
    this.loggedIn = false;
    this.user = null;
  }

  createUser(res: UserCredential) {
    this.user = new User();
    this.user.username = res.additionalUserInfo.username;
    this.user.email = res.user.email;
    this.user.username = this.resolveUser(res.user.email);
    return this.user;
  }

  resolveUser(email: string) {
    const name = '';
    if (email.indexOf('nick') > -1) {
      return 'nick';
    }
    return name;
  }




}
