import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';


import firebase from 'firebase';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform) {

    const config = {
      apiKey: "AIzaSyALKfevapBOYK202f6k5mPPfMrT1MHDv5A",
      authDomain: "bill-tracker-e5746.firebaseapp.com",
      databaseURL: "https://bill-tracker-e5746.firebaseio.com",
      storageBucket: "bill-tracker-e5746.appspot.com",
      messagingSenderId: "508248799540"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.rootPage = HomePage;
        console.log("There's a logged in user!", this.rootPage);
      } else {
        this.rootPage = LoginPage;
        console.log("There is not a logged in user!", this.rootPage);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
