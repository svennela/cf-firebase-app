import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/statusbar';
import { Splashscreen } from '@ionic-native/splashscreen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

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
      apiKey: "AIzaSyB4WDmccjH8OpqaY6Bx3RAmWRXqFD-UjTM",
      authDomain: "cloudfoundry.firebaseapp.com",
      databaseURL: "https://cloudfoundry.firebaseio.com",
      storageBucket: "firebase-cloudfoundry.appspot.com",
      messagingSenderId: "667814353863"
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = SignupPage;
        } else {
          this.rootPage = SignupPage;
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
