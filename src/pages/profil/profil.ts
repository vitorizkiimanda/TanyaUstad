import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { OnboardingPage } from '../Onboarding/Onboarding';


import { Data } from '../../providers/data';
import { MyApp } from '../../app/app.component';


import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  birthdate:string;
  domisili:string;
  email:string;
  gender:string;
  hp:string;
  img:string;
  name:string;
  status_kawin:string;

  role:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions,
    private screenOrientation: ScreenOrientation,
    public alertCtrl: AlertController,
    public actionSheetCtrl : ActionSheetController,
    public data: Data) {

      this.data.getData().then((data) => {
        this.name=data.name;
        this.birthdate=data.birthdate;
        this.email=data.email;
        this.hp=data.hp;
        this.domisili=data.domisili;
        this.img=this.data.BASE_URL+data.img;
        this.gender=data.gender;
        this.status_kawin=data.status_kawin;
      })

      this.data.getRole().then((data) => {
        this.role=data;
        console.log(this.role);
      })


  }

  ionViewDidLoad() {

    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    console.log('ionViewDidLoad ProfilPage');
  }

  logOut(){

    let confirm = this.alertCtrl.create({
      title: 'Anda Yakin?',
      message: 'Seluruh data yang belum tersimpan akan hilang.',
      buttons: [
        {
          text: 'Batal',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Keluar',
          handler: () => {
            console.log('Agree clicked');
            this.data.logout();  //apus storage cache local    
            this.nativePageTransitions.fade(null);
            this.navCtrl.setRoot(MyApp);
          }
        }
      ]
    });
      confirm.present();


    
  }

  updatePicture(){
    alert("update pict");
  }

}
