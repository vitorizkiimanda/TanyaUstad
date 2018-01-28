import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

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
    public loadCtrl: LoadingController,) {
  }

  ionViewDidLoad() {
    this.status = "password";
    console.log('ionViewDidLoad SignupPage');
  }

  masuk(form: NgForm) {
    
    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid){
      
      loading.present();

      //apiLogin

      loading.dismiss();
      this.Login();

      

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

  Login() {
    this.nativePageTransitions.fade(null);
    this.navCtrl.setRoot(HomePage);
  }  


  goBack() {
    this.nativePageTransitions.fade(null);
    this.navCtrl.setRoot(LoginPage);
  }

}
