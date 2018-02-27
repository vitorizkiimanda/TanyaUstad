import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController  } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  
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
  img:any;

  birthdate_status:any=false;
  status_kawin_status:any=false;
  gender_status:any=false;

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private data : Data,
    private nativePageTransitions: NativePageTransitions,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public http: Http,
    public authHttp: AuthHttp,
    public actionSheetCtrl : ActionSheetController,
    private camera: Camera) {

    this.data.getData().then((data) => {

      console.log("editprofile:" + data.name);

      this.name=data.name;
      this.birthdate=data.birthdate;
      this.email=data.email;
      this.hp=data.hp;
      this.gender=data.gender;
      this.status_kawin=data.status_kawin;

      this.changeGender(this.gender);
      this.changeStatusKawin(this.status_kawin);
      this.changeBirthdate(this.birthdate);
      
    })



  }

  ionViewDidLoad() {
    
    this.status = "password";
    console.log('ionViewDidLoad ProfileEditPage');
  }

  

  saveProfil(form: NgForm) {
    
    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid && this.gender_status && this.status_kawin_status && this.birthdate_status){
      
      loading.present();



      // api
      let input = {
        email: this.email, 
        password: this.password,
        gender:this.gender,
        domisili:this.domisili,
        hp:this.hp,
        name:this.name,
        img:this.img,
        status_kawin:this.status_kawin,
        birthdate:this.birthdate,
        role:this.role,
      };
      console.log(input);
      

        this.authHttp.post(this.data.BASE_URL+"/updateprofil",input).subscribe(data => {
        let response = data.json();
        console.log(response); 
        if(response.status==true){    

          this.data.eraseProfile();
          this.data.login(response.model,"user");//ke lokal

          this.data.session(input);

          loading.dismiss();

          this.nativePageTransitions.fade(null);
          this.navCtrl.pop();

        }
        else {
          loading.dismiss();
           let alert = this.alertCtrl.create({
              title: 'Gagal Masuk',
              subTitle: response.message,      
              buttons: ['OK']
            });
            alert.present();
        }    

    });

      // apilogin    
    }
    else{

      let alert = this.alertCtrl.create({
                title: 'Gagal Menyimpan',
                subTitle: 'Harap lengkapi data',      
                buttons: ['OK']
              });
              // this.vibration.vibrate(1000);
              alert.present();

    }

  }

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

  changeGender(data){
    if(data){
      this.gender_status=true;
    }
  }
  changeStatusKawin(data){
    if(data){
    this.status_kawin_status=true;
    }
  }
  changeBirthdate(data){
    if(data){
    this.birthdate_status=true;
    }
  }




}
