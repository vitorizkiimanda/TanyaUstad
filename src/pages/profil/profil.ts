import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { OnboardingPage } from '../Onboarding/Onboarding';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { Data } from '../../providers/data';
import { MyApp } from '../../app/app.component';


import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { AuthHttp } from 'angular2-jwt';

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
  password: string;

  token:any;


  role:string;


  validPhoto= false;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions,
    private screenOrientation: ScreenOrientation,
    public alertCtrl: AlertController,
    public actionSheetCtrl : ActionSheetController,
    public authHttp: AuthHttp,
    public data: Data,
    public loadCtrl: LoadingController,
    private camera: Camera,
    private transfer: FileTransfer,) {

      


  }

  ionViewWillEnter() {

    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    console.log('ionViewDidLoad ProfilPage');

    this.data.getData().then((data) => {
      console.log(data);

      this.name=data.name;
      this.birthdate=data.birthdate;
      this.email=data.email;
      this.hp=data.hp;
      this.gender=data.gender;
      this.status_kawin=data.status;
      this.img=data.img;
    })

    this.data.getRole().then((data) => {
      this.role=data;
    })

    
    this.data.getToken().then((data) => {
      this.token=data;
   })
    console.log('token'+this.token);

  }

  editProfil(){
    this.navCtrl.push(ProfileEditPage);
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





  updatePicture() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Ambil Gambar Baru',
          role: 'ambilGambar',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Pilih Dari Galleri',
          role: 'gallery',
          handler: () => {
            this.getPhotoFromGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }

  async takePicture(){
    try {
      const options : CameraOptions = {
        quality: 50, //to reduce img size
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.FILE_URI, //FILE URI itu buat image aseli
        encodingType: this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result =  await this.camera.getPicture(options);

      // this.img = 'data:image/jpeg;base64,' + result;

      this.postPhoto(result);

      this.validPhoto=true;

    }
    catch (e) {
      console.error(e);
      alert("error");
    }

  }

  getPhotoFromGallery(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType     : this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
      // this.base64Image = imageData;
      // this.uploadFoto();
      
      // this.img = 'data:image/jpeg;base64,' + imageData;
      this.postPhoto(imageData);
      
      this.validPhoto=true;
      }, (err) => {
    });
  }


  postPhoto(data){
    alert(data);
    alert("token" + this.token);

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    // api

    const fileTransfer: FileTransferObject = this.transfer.create();

    
    let options: FileUploadOptions = {
      fileKey: 'img',
      fileName: this.email,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {'Authorization': 'Bearer ' + this.token}
    }

    fileTransfer.upload(data, this.data.BASE_URL+"/updatefotoprofil", options)
      .then((data) => {
      alert(JSON.stringify(data)+" Uploaded Successfully");

      
      // this.data.login(data.model,"user");//ke lokal
      
      loading.dismiss();
      this.ionViewWillEnter();
    }, (err) => {
      console.log(err);
      loading.dismiss();
      alert( JSON.stringify(err));
    });
     
  }


  

}
