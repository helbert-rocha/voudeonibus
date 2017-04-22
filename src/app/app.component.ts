import { Component } from '@angular/core';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Deploy } from '@ionic/cloud-angular';
import { HomePage } from '../pages/home/home';
import { OneSignal } from '@ionic-native/onesignal';
import { BackgroundMode } from '@ionic-native/background-mode';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, public deploy: Deploy, public oneSignal: OneSignal, public backgroundMode: BackgroundMode, public splashScreen: SplashScreen, public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      },100)
      this.backgroundMode.enable();

      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        console.log('Token saved:', t.token);
      });

      this.push.rx.notification()
        .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
      });


      // this.oneSignal.startInit('ce3f7d37-91fa-4ad8-908c-f910caa18ca2', '451615544936');

      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      // this.oneSignal.handleNotificationReceived().subscribe(() => {
      // // do something when notification is received
      // });

      // this.oneSignal.handleNotificationOpened().subscribe(() => {
      //   // do something when a notification is opened
      // });

      // this.oneSignal.endInit();
    });
  }
}
