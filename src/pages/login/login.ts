import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { OnboardingPage } from '../Onboarding/Onboarding';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { MyApp } from '../../app/app.component';


import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  submitted = false;
  status:string;
  lihat = true;
  email: string;
  password: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions,
    public alertCtrl: AlertController,
    private screenOrientation: ScreenOrientation,
    public loadCtrl: LoadingController,
    public http: Http,
    public data: Data,
    public events: Events
  ) {

    this.data.logout();
  }

  ionViewDidLoad() {

    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.status = "password";
    console.log('ionViewDidLoad LoginPage');
  }

    masuk(form: NgForm) {
    
      this.submitted = true;
  
      let loading = this.loadCtrl.create({
          content: 'memuat..'
      });
  
      if(form.valid){
        
        loading.present();
  
        //apiLogin
        let input = {
          email: this.email, 
          password: this.password
        };
          this.http.post(this.data.BASE_URL+"/signin",input).subscribe(data => {
          let response = data.json();
          if(response.status==true){
            console.log(response);     
            this.data.logout();
            this.data.token(response.token);   
            this.data.login(response.user,"user");//ke lokal
            this.createUser("user");
            this.Login();
            loading.dismiss();
          }
          else {
            loading.dismiss();
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
      else{
  
        let alert = this.alertCtrl.create({
                  title: 'Gagal Masuk',
                  subTitle: 'Email atau Password salah',      
                  buttons: ['OK']
                });
                // this.vibration.vibrate(1000);
                alert.present();
  
      }
  
    }
  
    // masuk() {
    //   this.navCtrl.setRoot(TabsDonaturPage);
    // }
  
    showPassword(){
      this.status = "text";
      this.lihat = false;
      console.log(this.status);
    }
  
    hidePassword(){
      this.status = "password";
      this.lihat = true;
      console.log(this.status);
    }
  
    signUp() {
      this.nativePageTransitions.fade(null);
      this.navCtrl.setRoot(SignupPage);
    }  

    Login() {
      this.nativePageTransitions.fade(null);
      this.navCtrl.setRoot(MyApp);
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
          this.navCtrl.setRoot(MyApp);
  
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
