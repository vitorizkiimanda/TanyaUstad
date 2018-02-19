import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-events-detail',
  templateUrl: 'events-detail.html',
})
export class EventsDetailPage {

  address:any;
  description:any;
  name: any;
  penyelenggara:any;
  picture:any;
  type:any;
  created_at:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let temp = this.navParams.data;

    this.address = temp.address;
    this.description = temp.description;
    this.name = temp.name;
    this.penyelenggara = temp.penyelenggara;
    this.picture = temp.picture;
    this.type = temp.type;
    this.created_at = temp.created_at;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsDetailPage');
  }

}
