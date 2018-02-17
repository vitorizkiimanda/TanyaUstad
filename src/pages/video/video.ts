import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { MyApp } from '../../app/app.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  url:any;
  name:any;
  user:any;
  status:any;
  description:any;

  constructor(
    public navCtrl: NavController, 
    private nativePageTransitions: NativePageTransitions,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    private sanitizer: DomSanitizer) {

    let video = this.navParams.data;

    this.name = video.name;
    this.user = video.user;
    this.status = video.status;
    this.description = video.description;
    this.url = video.url;
	

    // console.log(video);

    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/kqrIimq4m14')
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://156.67.218.250:81'+this.url);

    console.log(this.url);
  }

  ionViewDidLoad() {

    this.screenOrientation.unlock();
    console.log('ionViewDidLoad VideoPage');
  }

  ionViewWillLeave() {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }



  

}
