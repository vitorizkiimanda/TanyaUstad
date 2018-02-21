import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { MyApp } from '../../app/app.component';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  url:any;
  name:any;
  user:any;
  status:any;
  description:any;
  id:any;

  previous:any;
  next:any;

  constructor(
    public navCtrl: NavController, 
    private nativePageTransitions: NativePageTransitions,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public data: Data,
    public authHttp: AuthHttp,
    private screenOrientation: ScreenOrientation,
    private sanitizer: DomSanitizer) {

    let video = this.navParams.data;

    this.name = video.name;
    this.user = video.user;
    this.status = video.status;
    this.description = video.description;
    this.url = video.youtube;
    this.id = video.id;
	

    // console.log(video);

    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/kqrIimq4m14')
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

    console.log(this.url);
  }

  ionViewWillEnter() {

    this.screenOrientation.unlock();
    console.log('ionViewDidLoad VideoPage');

    this.getPaginate();
  }

  ionViewWillLeave() {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  getPaginate() {
    this.authHttp.get(this.data.BASE_URL+"/getvloggerspaginate/"+this.id).subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status==true){

        this.previous = response.previous;
        this.next = response.next;
        

      }
      else{
        //alert gagal fetch data
        console.log("error");
      }
    });
  }

  gotoPrev(){

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();


    this.authHttp.get(this.data.BASE_URL+"/getvloggerspaginate/"+this.id).subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status==true){

        this.previous = response.previous;
        this.next = response.next;

        if(this.previous!=null){

          this.authHttp.get(this.data.BASE_URL+"/getvloggerspaginate/"+this.previous).subscribe(data => {
            let response = data.json();
            console.log(response);
            if(response.status==true){
      
              this.navCtrl.pop();
              this.navCtrl.push(VideoPage, response.vlogger);

              loading.dismiss();

      
            }
            else{
              //alert gagal fetch data
              console.log("error");

              loading.dismiss();

            }
          });

        }
        else{
          alert("Tidak ada video")

          loading.dismiss();
        }

        
        

      }
      else{
        //alert gagal fetch data
        console.log("error");

        loading.dismiss();
      }
    });

  }

  gotoNext(){

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    this.authHttp.get(this.data.BASE_URL+"/getvloggerspaginate/"+this.id).subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status==true){

        this.previous = response.previous;
        this.next = response.next;

        if(this.next!=null){

          this.authHttp.get(this.data.BASE_URL+"/getvloggerspaginate/"+this.next).subscribe(data => {
            let response = data.json();
            console.log(response);
            if(response.status==true){
      
              this.navCtrl.pop();
              this.navCtrl.push(VideoPage, response.vlogger);
              loading.dismiss();      
            }
            else{
              //alert gagal fetch data
              console.log("error");
              loading.dismiss();
            }
          });

        }
        else{
          alert("Tidak ada video")
          loading.dismiss();
        }

        
        

      }
      else{
        //alert gagal fetch data
        console.log("error");
        loading.dismiss();
      }
    });

  }



  

}
