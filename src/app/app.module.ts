import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ChatPage } from '../pages/chat/chat';
import { EventsPage } from '../pages/events/events';
import { LoginPage } from '../pages/login/login';
import { OnboardingPage } from '../pages/Onboarding/Onboarding';
import { SignupPage } from '../pages/signup/signup';
import { WallpaperPage } from '../pages/wallpaper/wallpaper';
import { ProfilPage } from '../pages/profil/profil';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Data } from '../providers/data';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { VideoPage } from '../pages/video/video';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

let storage = new Storage({});


export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: "Bearer",
    noJwtError: true,
    globalHeaders: [{'Authorization': 'application/json'}],
    tokenGetter: (() => storage.get('token').then((token: string) => token)),
  }), http);
}

console.log("ini token global :");
console.log(storage.get('token'));

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChatPage,
    EventsPage,
    LoginPage,
    OnboardingPage,
    SignupPage,
    ProfilPage,
    VideoPage,
    WallpaperPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChatPage,
    EventsPage,
    LoginPage,
    OnboardingPage,
    SignupPage,
    ProfilPage,
    VideoPage,
    WallpaperPage
  ],
  providers: [
    StatusBar,
    
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    Data,
    NativePageTransitions,
    ScreenOrientation,

    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
