import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Events,Slides } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';


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
  custom2:any;

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
      this.custom2=false;
    }
    if(currentIndex==0) {
      this.basic=true;
      this.custom=false;
      this.custom2=false;
    }
    else{
      this.basic=false;
      this.custom=false;
      this.custom2=true;
    }

    console.log(this.custom2);
  }

  Login() {
    this.nativePageTransitions.fade(null);
    this.navCtrl.setRoot(LoginPage);
  }

  Signup(){
    this.nativePageTransitions.fade(null);
    this.navCtrl.setRoot(SignupPage);
  }

  Guest(){

    let input = {
      email: 'drikdoank@gmail.com', 
      password: '12345678'
    };
    console.log(input);
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
