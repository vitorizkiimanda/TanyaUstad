import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Data {
  public BASE_URL = 'http://156.67.218.250:81';
  
  public HAS_LOGGED_IN = 'status_login';
  
  constructor(public http: Http , public storage: Storage) {
    // console.log('Hello Data Provider');
  }

  token(data : any) {
    this.storage.set('token', data);
  };

  session(data : any){
    this.storage.set('data_session', data);
  }

  getSession(){
    return this.storage.get('data_session').then((value) => {
      return value;
    });
  }

  login(data : any,role:string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user_data', data);
    this.storage.set('role', role);
  };

  photo(data : any) {
    this.storage.set('user_data_photo', data);
  };

  erasePhoto() {
    this.storage.remove('user_data_photo');
  };
  
  eraseProfile() {
    this.storage.remove('user_data');
    this.storage.remove('role');
    this.storage.remove('user_data_photo');
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user_data');
    this.storage.remove('role');
    this.storage.remove('user_data_photo');
    this.storage.remove('token');
    this.storage.remove('data_session');
  };


  isLogin(){
    return this.storage.get(this.HAS_LOGGED_IN).then((value)=>{
      return value;
    });
  }
  getRole(){
    return this.storage.get('role').then((value)=>{
      return value;
    });
  }
  getData() {
    return this.storage.get('user_data').then((value) => {
      return value;
    });
  }

  getDataPhoto() {
    return this.storage.get('user_data_photo').then((value) => {
      return value;
    });
  }

  getToken() {
    return this.storage.get('token').then((value) => {
      return value;
    });
  }

}
