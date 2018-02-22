import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { OnboardingPage } from '../Onboarding/Onboarding';


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
    private camera: Camera) {

      


  }

  ionViewWillEnter() {

    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    console.log('ionViewDidLoad ProfilPage');

    this.data.getData().then((data) => {

      this.name=data.name;
      this.birthdate=data.birthdate;
      this.email=data.email;
      this.hp=data.hp;
      this.gender=data.gender;
      this.status_kawin=data.status;
    })

    this.data.getRole().then((data) => {
      this.role=data;
      console.log(this.role);
    })

    this.data.getDataPhoto().then((data) => {
      this.img=data;
    })

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
        destinationType: this.camera.DestinationType.DATA_URL, //to make it base64 image
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
        destinationType: this.camera.DestinationType.DATA_URL,
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

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    // api
    
      this.authHttp.post(this.data.BASE_URL+"/updatefotoprofil",data).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==true){    
        //this.data.logout();

        //tembak login si xsight buat dapetin token
        // this.data.token(response.token);   
        
        this.data.photo(response.data.img);//ke lokal khusus foto
        this.img = response.data.img; //biar foto langsung update
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


  

}
