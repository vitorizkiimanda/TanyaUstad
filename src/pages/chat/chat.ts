import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';


import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ChatDetailPage } from '../chat-detail/chat-detail';
import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ChatNewPage } from '../chat-new/chat-new';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  chats: any;
  user:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: Data,
    public loadCtrl: LoadingController,
    public authHttp: AuthHttp,
    private screenOrientation: ScreenOrientation,
    private nativePageTransitions: NativePageTransitions,
    public http: Http) {

      this.data.getData().then((data) => {
        this.user=data.email;
        console.log(this.user);
      })

      //this.getChats();
  

    // this.chats = [
    //   {
    //     position: 'left',
    //     content: 'Hello from the other side.',
    //     senderName: 'Gregory',
    //     time: '28-Jun-2016 21:53'
    //   },
    //   {
    //     position: 'right',
    //     content: 'Hi! How are?',
    //     senderName: 'Me',
    //     time: '28-Jun-2016 21:55'
    //   },
    //   {
    //     position: 'left',
    //     content: "This is some really long test that I'm writing here. Let's see how it wraps.",
    //     senderName: 'Gregory',
    //     time: '28-Jun-2016 21:57'
    //   }
    // ];
  
  
  }

  ionViewWillEnter() {

    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    console.log('ionViewDidLoad ChatPage');

    

    this.getChats();

    
  }


  getChats() {

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    this.authHttp.get(this.data.BASE_URL+"/getinbox").subscribe(data => {
      let response = data.json();
      console.log(response.inbox);
      if(response.status==true){

        this.chats=response.inbox;
        loading.dismiss();
      }
      else{
        //alert gagal fetch data
        console.log("error");
        loading.dismiss();
      }
    });
  }

  gotoNewMessage(){
    this.nativePageTransitions.fade(null);
    this.navCtrl.push(ChatNewPage);
  }


  gotoDetail(data){
    this.nativePageTransitions.fade(null);
    this.navCtrl.push(ChatDetailPage, data);
  }

}
