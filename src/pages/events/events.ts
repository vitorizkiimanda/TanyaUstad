import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';


import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { EventsDetailPage } from '../events-detail/events-detail';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  events:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: Data,
    public authHttp: AuthHttp,
    private screenOrientation: ScreenOrientation,
    public http: Http,
    private nativePageTransitions: NativePageTransitions) {

      this.getEvents();
  }

  ionViewDidLoad() {

    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    console.log('ionViewDidLoad EventsPage');
  }

  getEvents() {
    this.authHttp.get(this.data.BASE_URL+"/getevents").subscribe(data => {
      let response = data.json();
      console.log(response.rundowns);
      if(response.status==true){

        this.events=response.rundowns;
        console.log(this.events);
      }
      else{
        //alert gagal fetch data
        console.log("error");
      }
    });
  }

  gotoDetail(data){
    this.nativePageTransitions.fade(null);
    this.navCtrl.push(EventsDetailPage, data);
  }

}
