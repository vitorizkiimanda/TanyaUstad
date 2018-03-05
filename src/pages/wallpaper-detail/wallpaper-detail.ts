import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController, Platform } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { Data } from '../../providers/data';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

declare var cordova: any;

@Component({
  selector: 'page-wallpaper-detail',
  templateUrl: 'wallpaper-detail.html',
})
export class WallpaperDetailPage {

  name:any;
  status:any;
  description:any;
  picture:any;
  picture2:any;
  picture3:any;

  storageDirectory: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl : ActionSheetController,
    public authHttp: AuthHttp,
    public data: Data,
    public loadCtrl: LoadingController,
    private transfer: FileTransfer,
    public platform: Platform) {


      this.platform.ready().then(() => {
        // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
        if(!this.platform.is('cordova')) {
          return false;
        }
  
        if (this.platform.is('ios')) {
          // this.storageDirectory = cordova.file.documentsDirectory;
          this.storageDirectory = cordova.file.externalRootDirectory + '/Download/';
        }
        else if(this.platform.is('android')) {
          // this.storageDirectory = cordova.file.dataDirectory;
          this.storageDirectory = cordova.file.externalRootDirectory + '/Download/';
        }
        else {
          // exit otherwise, but you could add further types here e.g. Windows
          return false;
        }
      });


    let temp = this.navParams.data;
    this.name = temp.name;
    this.status = temp.status;
    this.description = temp.description;
    this.picture =  temp.picture;
    this.picture2 = temp.picture2;
    this.picture3 = temp.picture3;

    console.log(this.picture);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallpaperDetailPage');
  }

  
  downloadImage(data: any){
    let temp = data;
    data = 'http://156.67.218.250:81'+data;
    console.log(data);

    let confirm = this.alertCtrl.create({
      title: 'Download Gambar?',
      buttons: [
        {
            text: 'Batal',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Download',
            handler: () => {
              console.log('Agree clicked');

              // download foto


              let loading = this.loadCtrl.create({
                content: 'download..'
              });
          
              loading.present();
          
              setTimeout(() => {
                loading.dismiss();
              }, 5000);
              // api
          
              const fileTransfer: FileTransferObject = this.transfer.create();

              let location = this.storageDirectory + '/TanyaUstad/' + Date.now()+'.png';
          
              
              fileTransfer.download(data, location).then((entry) => {
                console.log('download complete: ' + entry.toURL());

                loading.dismiss();

                let alert = this.alertCtrl.create({
                  title: 'Download Foto Berhasil',
                  message: 'Lokasi Penyimpanan : '+location,
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        console.log('Agree clicked');
                      }
                    }
                  ]
                });
                  alert.present();   

              }, (error) => {
                alert(error);
                // handle error

                loading.dismiss();
                let alertError = this.alertCtrl.create({
                  title: 'Download Foto Gagal',
                  message: 'silahkan coba kembali',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        console.log('Agree clicked');
                      }
                    }
                  ]
                });
                alertError.present();   
              });
          
             
              // download foto




          }
        }
      ]
    });
      confirm.present();    

  }



}
