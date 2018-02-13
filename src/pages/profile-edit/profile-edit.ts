import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController  } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  
  submitted = false;

  birthdate:string;
  domisili:string;
  email:string;
  gender:string;
  hp:string;
  img:string;
  name:string;
  status_kawin:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private data : Data,
    private nativePageTransitions: NativePageTransitions,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public http: Http) {

    this.data.getData().then((data) => {

      console.log("editprofile:" + data.name);

      this.name=data.name;
      this.birthdate=data.birthdate;
      this.email=data.email;
      this.hp=data.hp;
      this.domisili=data.domisili;
      this.img=this.data.BASE_URL+data.img;
      this.gender=data.gender;
      this.status_kawin=data.status_kawin;
      
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  

  saveProfil(form: NgForm) {
    
    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid){
      
      loading.present();

      
      this.nativePageTransitions.fade(null);
      this.navCtrl.pop();

      loading.dismiss();



      //api
    //   let input = {
    //     name: this.name,
    //     email: this.email, 
    //     hp: this.hp,
    //     domisili: this.domisili
    //   };
    //   console.log(input);
      

    //     this.http.post(this.data.BASE_URL+"/login_user.php",input).subscribe(data => {
    //     let response = data.json();
    //     console.log(response); 
    //     if(response.status==200){    
    //       this.data.logout();

    //       //tembak login si xsight buat dapetin token
    //       // this.data.token(response.token);   
          
          
    //       this.data.login(response.data,"user");//ke lokal
    //       loading.dismiss();
    //     }
    //     else {
    //       loading.dismiss();
    //        let alert = this.alertCtrl.create({
    //           title: 'Gagal Masuk',
    //           subTitle: response.message,      
    //           buttons: ['OK']
    //         });
    //         alert.present();
    //     }    

    // });

      //apilogin    
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

}
