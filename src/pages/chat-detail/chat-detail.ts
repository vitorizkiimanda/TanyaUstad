import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content  } from 'ionic-angular';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';


@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {

  @ViewChild(Content) content:Content;

  message:string;
  sender_name:any;
  chats:any;
  id_sender:any;
  id_receiver:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: Data,
    public authHttp: AuthHttp,
    public http: Http
  ) {

    let temp = this.navParams.data;
    this.sender_name = temp.sender_name;
    this.id_sender = temp.id_user;
    this.id_receiver = temp.id_receiver;

    this.getChats();

  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ChatDetailPage');

    // this.scrollToBottom();

  }

  scrollToBottom() {
    setTimeout(() => {
        this.content.scrollToBottom(0);
    });
  }

  sendChat(keyCode){

    let regex = /^[\r\n/\s/g]*$/;

    if(keyCode == 13 && (regex.test(this.message) == false) && this.message!=null){
      // alert(this.message);
      this.postChat(this.message);

      this.message=null;
    }
    else if(keyCode != 13 && (regex.test(this.message) == false)){

    }
    else{
      this.message=null;
    }
  }

  getChats() {

    console.log("id sender:" + this.id_sender);

    this.authHttp.get(this.data.BASE_URL+"/getinboxbyidsender"+"/"+this.id_sender).subscribe(data => {
      let response = data.json();
      console.log(response.inbox);
      if(response.status==true){

        this.chats=response.inbox;

        this.scrollToBottom();
      }
      else{
        //alert gagal fetch data
        console.log("error");
      }
    });
  }

  postChat(data) {
    console.log("id post new chat:" + this.id_receiver);
    let input = {
      id_receiver: this.id_receiver, 
      title: data,
      description: ''
    };
    this.authHttp.post(this.data.BASE_URL+"/inbox", input).subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status==true){

        this.getChats();
        
      }
      else{
        alert("Chat Error");
        console.log("error");
      }
    });
  }

}
