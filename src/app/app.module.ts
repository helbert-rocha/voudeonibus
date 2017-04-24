import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CloudSettings, CloudModule} from '@ionic/cloud-angular';
import { IonicStorageModule} from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ResultsPage } from '../pages/results/results';
import { AboutPage } from '../pages/about/about';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';
 
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '0e09670b'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultsPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultsPage,
    AboutPage
  ],
  providers: [
    OneSignal,
    BackgroundMode,
    Network,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
