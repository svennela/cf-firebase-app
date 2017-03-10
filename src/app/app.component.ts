import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/statusbar';
import { Splashscreen } from '@ionic-native/splashscreen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';


import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any
  zone: NgZone;

  constructor(platform: Platform) {
    this.zone = new NgZone({});

    const config = {
      apiKey: "AIzaSyALKfevapBOYK202f6k5mPPfMrT1MHDv5A",
      authDomain: "bill-tracker-e5746.firebaseapp.com",
      databaseURL: "https://bill-tracker-e5746.firebaseio.com",
      storageBucket: "bill-tracker-e5746.appspot.com",
      messagingSenderId: "508248799540"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (!user) { 
          this.rootPage = LoginPage; 
        } else {
          this.rootPage = HomePage;
        }
      });     
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
