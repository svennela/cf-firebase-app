import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthData {

  constructor() {}

  loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      firebase.database().ref('/userProfile').child(newUser.uid).set({
          email: email
      });
    });
  }

  createUser(fullname: string, email: string,message: string): firebase.Promise<any> {
    return  firebase.database().ref('/cfuser').push({
          fullname: fullname,
          email: email,
          message: message,
          status: 'pending',
          dbid: 0

      });

  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return firebase.auth().signOut();
  }

}
