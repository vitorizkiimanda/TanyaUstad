import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { ChatDetailPage } from '../chat-detail/chat-detail';


@Component({
  selector: 'page-chat-new',
  templateUrl: 'chat-new.html',
})
export class ChatNewPage {

  chats:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: Data,
    public authHttp: AuthHttp,
    private nativePageTransitions: NativePageTransitions,
    public http: Http) {

      this.getAvailableChats();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatNewPage');
  }

  getAvailableChats() {
    this.authHttp.get(this.data.BASE_URL+"/getusers").subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status==true){

        this.chats=response.users;
      }
      else{
        //alert gagal fetch data
        console.log("error");
      }
    });
  }

  gotoDetail(data){
    this.nativePageTransitions.fade(null);
    this.navCtrl.push(ChatDetailPage, data);
  }

}
