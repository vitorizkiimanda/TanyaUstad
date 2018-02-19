import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';


@Component({
  selector: 'page-chats-new-detail',
  templateUrl: 'chats-new-detail.html',
})
export class ChatsNewDetailPage {

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

    console.log('temp'+temp);

    this.sender_name = temp.name;
    this.id_sender = temp.email;

    this.data.getData().then((data) => {
      console.log("profile :"+ data.status);
      this.id_receiver = data.email;
    })

    this.getChats();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatDetailPage');
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