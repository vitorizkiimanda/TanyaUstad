import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';


import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
    public authHttp: AuthHttp,
    private screenOrientation: ScreenOrientation,
    public http: Http) {

      this.data.getData().then((data) => {
        this.user=data.email;
        console.log(this.user);
      })

      this.getChats();
  

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

  ionViewDidLoad() {

    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    console.log('ionViewDidLoad ChatPage');
  }


  getChats() {
    this.authHttp.get(this.data.BASE_URL+"/getinbox").subscribe(data => {
      let response = data.json();
      console.log(response.inbox);
      if(response.status==true){

        this.chats=response.inbox;
        console.log('chats:' +this.chats);
      }
      else{
        //alert gagal fetch data
        console.log("error");
      }
    });
  }

}
