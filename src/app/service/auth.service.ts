import {Inject, Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    }).catch(error => {
      console.log('something went wrong during signin: ', error.message);
    });
  }

  signOut() {
    this.firebaseAuth.signOut();
  }




}
