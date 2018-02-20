import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-nsp-detail',
  templateUrl: 'nsp-detail.html',
})
export class NspDetailPage {

  name:any;
  status:any;
  picture:any;
  description:any;
  user:any;

  terkait:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: Data,
    public authHttp: AuthHttp,
    private nativePageTransitions: NativePageTransitions) {

      let temp = this.navParams.data;
      
      this.name = temp.name;
      this.status = temp.status;
      this.picture = temp.picture;
      this.description = temp.description;
      this.user = temp.user;

  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad NspDetailPage');

    this.getNSPTerkait();
  }

  gotoDetail(data){
    this.navCtrl.pop();
    this.nativePageTransitions.fade(null);
    this.navCtrl.push(NspDetailPage, data);
  }

  getNSPTerkait() {
    this.authHttp.get(this.data.BASE_URL+"/getnsp").subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status==true){

        this.terkait=response.nsp;
      }
      else{
        //alert gagal fetch data
        console.log("error");
      }
    });
  }

}