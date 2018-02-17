import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-wallpaper-detail',
  templateUrl: 'wallpaper-detail.html',
})
export class WallpaperDetailPage {

  name:any;
  status:any;
  description:any;
  picture:any;
  picture2:any;
  picture3:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let temp = this.navParams.data;
    this.name = temp.name;
    this.status = temp.status;
    this.description = temp.description;
    this.picture =  temp.picture;
    this.picture2 = temp.picture2;
    this.picture3 = temp.picture3;

    console.log(this.picture);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallpaperDetailPage');
  }

}
