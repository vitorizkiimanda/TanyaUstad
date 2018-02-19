import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { VideoPage } from '../video/video';


import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  video:any;

  images:any;
  slide1:any;
  slide2:any;
  slide3:any;

  categoryChoosen:string='action';

  constructor(
    public navCtrl: NavController,
    public data: Data,
    public authHttp: AuthHttp,
    private nativePageTransitions: NativePageTransitions,
    private screenOrientation: ScreenOrientation,
    public http: Http) {
      
      
      
      this.getVideo();
      this.getWallpaper();
  }

  ionViewWillEnter() {

    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    console.log('ionViewDidLoad homePage');
    this.updateToken();
  }

  updateToken(){
    this.data.getSession().then((data) => {

      if(data){

        this.http.post(this.data.BASE_URL+"/signin",data).subscribe(data => {
          let response = data.json();
          if(response.status==true){


            this.data.getRole().then((value)=>{
              if(value=="guest"){
                this.data.logout();
                this.data.token(response.token);   
                this.data.login(response.user,"guest");//ke lokal
              }
              else{
                this.data.logout();
                this.data.token(response.token);   
                this.data.login(response.user,"user");//ke lokal
              }
            })
            console.log(response);     


          }
          else {
            this.navCtrl.setRoot(LoginPage);
          }
  
      });
      //apilogin
      console.log("update token");

      }
      

            


    })


  }

  choose(category: string){
    this.categoryChoosen=category;
    console.log(this.categoryChoosen);
  }

  

  getVideo() {
    this.authHttp.get(this.data.BASE_URL+"/getvloggers").subscribe(data => {
      let response = data.json();
      console.log(response.vloggers);
      if(response.status==true){

        this.video=response.vloggers;
      }
      else{
        //alert gagal fetch data
        console.log("error");
      }
    });
  }

  getWallpaper() {
    this.authHttp.get(this.data.BASE_URL+"/getreviews").subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status==true){

        this.images=response.reviews;    
        this.slide1 = this.images[0].picture;
        this.slide2 = this.images[0].picture2;
        this.slide3 = this.images[0].picture3;

      }
      else{
        //alert gagal fetch data
        console.log("error");
      }
    });
  }

  gotoVideo(data){
    this.nativePageTransitions.fade(null);
    this.navCtrl.push(VideoPage, data);
  }
}
