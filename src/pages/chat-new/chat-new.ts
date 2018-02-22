import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { ChatDetailPage } from '../chat-detail/chat-detail';
import { ChatsNewDetailPage } from '../chats-new-detail/chats-new-detail';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


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
    public loadCtrl: LoadingController,
    public http: Http) {

      
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ChatNewPage');
    this.getAvailableChats();
  }

  getAvailableChats() {

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    this.authHttp.get(this.data.BASE_URL+"/getusers").subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status==true){

        this.chats=response.users;

        loading.dismiss();
      }
      else{
        //alert gagal fetch data
        console.log("error");

        loading.dismiss();
      }
    });
  }

  gotoDetail(data){
    this.nativePageTransitions.fade(null);
    this.navCtrl.push(ChatsNewDetailPage, data);
    console.log(data);
  }

}
