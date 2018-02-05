import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Events,Slides } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';


import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { MyApp } from '../../app/app.component';


@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  @ViewChild(Slides) slides: Slides;

  basic:any;
  custom:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions,
    public alertCtrl: AlertController,
    public http: Http,
    public data: Data,
    public events: Events) {
  }

  ionViewDidLoad() {
    this.basic=true;
    console.log('ionViewDidLoad OnboardingPage');
    console.log(this.basic);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    if(currentIndex==1) {
      this.basic=false;
      this.custom=true;
    }
    else {
      this.basic=true;
      this.custom=false;
    }

    console.log(this.basic);
  }

  Login() {
    this.nativePageTransitions.fade(null);
    this.navCtrl.setRoot(LoginPage);
  }

  Guest(){

    let input = {
      email: 'drikdoank@gmail.com', 
      password: '123456'
    };
      this.http.post(this.data.BASE_URL+"/signin",input).subscribe(data => {
      let response = data.json();
      if(response.status==true){
        console.log(response);     
        this.data.token(response.token);   
        this.data.login(response.user,"guest");//ke lokal
        
        this.createUser("guest");

        this.nativePageTransitions.fade(null);
        this.navCtrl.setRoot(HomePage);

      }
      else {
         let alert = this.alertCtrl.create({
            title: 'Gagal Masuk',
            subTitle: 'Invalid User',      
            buttons: ['OK']
          });
          alert.present();
      }
    //apilogin        

  });



  }

  createUser(user) {
    console.log('User created!')
    this.events.publish('user:created', user);
  }


}
