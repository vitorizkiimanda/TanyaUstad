import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-nsp-detail',
  templateUrl: 'nsp-detail.html',
})
export class NspDetailPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NspDetailPage');
  }

  gotoDetail(data){
    this.nativePageTransitions.fade(null);
    this.navCtrl.push(NspDetailPage, data);
  }

}
