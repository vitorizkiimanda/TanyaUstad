import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';

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
  gender:string;
  domisili:string="indonesia";
  hp:string;
  name:any;
  status_kawin:any;
  birthdate:any;
  role:any="user";

  birthdate_status:any=false;
  status_kawin_status:any=false;
  gender_status:any=false;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions,
    public alertCtrl: AlertController,
    public http: Http,
    public data: Data,
    public loadCtrl: LoadingController,
    public events: Events) {
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

    if(form.valid && this.gender_status && this.status_kawin_status && this.birthdate_status){
      
      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 10000);

      //apiLogin
      let input = {
        email: this.email, 
        password: this.password,
        gender:this.gender,
        domisili:this.domisili,
        hp:this.hp,
        name:this.name,
        status_kawin:this.status_kawin,
        birthdate:this.birthdate,
        role:this.role,
      };
        this.http.post(this.data.BASE_URL+"/signup",input).subscribe(data => {
        let response = data.json();
        
        console.log(response);   
        if(response.status==true){
          this.Login();
          loading.dismiss();
        }
        else {
          loading.dismiss();
           let alert = this.alertCtrl.create({
              title: 'Gagal Membuat Akun',
              subTitle: 'Silahkan coba lagi',      
              buttons: ['OK']
            });
            alert.present();
        }

    });
    //apilogin        


      

    }
    else{

      let alert = this.alertCtrl.create({
                title: 'Gagal Membuat Akun',
                subTitle: 'Harap cek kembali data',      
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
    this.navCtrl.setRoot(LoginPage);
  }  


  goBack() {
    this.nativePageTransitions.fade(null);
    this.navCtrl.setRoot(LoginPage);
  }

  createUser(user) {
    console.log('User created!')
    this.events.publish('user:created', user);
  }

  changeGender(){
    this.gender_status=true;
  }
  changeStatusKawin(){
    this.status_kawin_status=true;
  }
  changeBirthdate(){
    this.birthdate_status=true;
  }

}
