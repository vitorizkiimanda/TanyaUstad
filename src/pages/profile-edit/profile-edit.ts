import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController  } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  password:string;

  
  validPhoto= false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private data : Data,
    private nativePageTransitions: NativePageTransitions,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public http: Http,
    public actionSheetCtrl : ActionSheetController,
    private camera: Camera) {

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



      // api
      let input = {
        name: this.name,
        email: this.email, 
        hp: this.hp,
        domisili: this.domisili,
        img : this.img,
        password : this.password,
        gender :this.gender
      };
      console.log(input);
      

        this.http.post(this.data.BASE_URL+"/updateprofil",input).subscribe(data => {
        let response = data.json();
        console.log(response); 
        if(response.status==true){    
          //this.data.logout();

          //tembak login si xsight buat dapetin token
          // this.data.token(response.token);   
          
          this.data.login(response.data,"user");//ke lokal
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

      this.img = 'data:image/jpeg;base64,' + result;

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
      this.img = 'data:image/jpeg;base64,' + imageData;
      this.validPhoto=true;
      }, (err) => {
    });
  }

}
