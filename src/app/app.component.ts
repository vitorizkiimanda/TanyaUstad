import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Data } from "../providers/data";

import { ScreenOrientation } from '@ionic-native/screen-orientation';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OnboardingPage } from '../pages/Onboarding/Onboarding';
import { WallpaperPage } from '../pages/wallpaper/wallpaper';
import { EventsPage } from '../pages/events/events';
import { ChatPage } from '../pages/chat/chat';
import { ProfilPage } from '../pages/profil/profil';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  role:string;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public data: Data,
    private screenOrientation: ScreenOrientation,
    public events: Events) {

      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

      events.subscribe('user:created', (user) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        console.log('Welcome', user, 'at');
        if(user=='user'){

          console.log('ini role utama :' + user);
          this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Wallpaper', component: WallpaperPage },
            { title: 'Events', component: EventsPage },
            { title: 'Chat', component: ChatPage },
            { title: 'Profil', component: ProfilPage }
          ];
  
        }
        else {
    
          console.log('ini role utama :' + user);
          this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Wallpaper', component: WallpaperPage },
            { title: 'Events', component: EventsPage },
            { title: 'Login', component: LoginPage }
          ];
        }
      });

    // used for an example of ngFor and navigation


    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.data.isLogin().then((value)=>{
      if(value){

        this.data.getRole().then((data) => {
          console.log("dari storage"+data);
          this.events.publish('user:created', data);
        })


        this.rootPage = HomePage;
      } else {
         this.rootPage = OnboardingPage;
      }    
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
