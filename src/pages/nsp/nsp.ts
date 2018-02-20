import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { NspDetailPage } from '../nsp-detail/nsp-detail';

@Component({
  selector: 'page-nsp',
  templateUrl: 'nsp.html',
})
export class NspPage {

  nsp:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: Data,
    public authHttp: AuthHttp,
    private nativePageTransitions: NativePageTransitions,
    public http: Http) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad NspPage');
    this.getNSP();
  }

  getNSP() {
    this.authHttp.get(this.data.BASE_URL+"/getinbox").subscribe(data => {
      let response = data.json();
      console.log(response.inbox);
      if(response.status==true){

        // this.nsp=response.inbox;
      }
      else{
        //alert gagal fetch data
        console.log("error");
      }
    });
  }

  gotoDetail(data){
    this.nativePageTransitions.fade(null);
    this.navCtrl.push(NspDetailPage, data);
  }

}
