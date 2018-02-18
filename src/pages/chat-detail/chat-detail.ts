import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {

  message:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatDetailPage');
  }

  sendChat(keyCode){

    let regex = /^[\r\n/\s/g]*$/;

    if(keyCode == 13 && (regex.test(this.message) == false) && this.message!=null){
      alert(this.message);

      this.message=null;
    }
    else if(keyCode != 13 && (regex.test(this.message) == false)){

    }
    else{
      this.message=null;
    }
  }

}
