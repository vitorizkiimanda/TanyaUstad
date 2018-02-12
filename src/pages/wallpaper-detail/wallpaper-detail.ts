import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-wallpaper-detail',
  templateUrl: 'wallpaper-detail.html',
})
export class WallpaperDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallpaperDetailPage');
  }

}
