import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

/**
 * Generated class for the InputSiswaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-input-siswa',
  templateUrl: 'input-siswa.html',
})
export class InputSiswaPage {

  data: any;
  photo: any;
  photoPreview: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
            private afDB: AngularFireDatabase, private afStorage: AngularFireStorage ) {
    this.data = {}; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputSiswaPage');
  }

  selectPhoto(event){
    this.photo = event.target.files[0];

    //baca dan tampilkan preview photo
    let reader = new FileReader();
    reader.onload = (evr:any) => {
      this.photoPreview  = evr.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);

  }

  async save(){
    try{
      let resUpload = await this.afStorage.upload('siswa/' + this.data.nis + '.jpg', this.photo );
      //console.log('Upload', resUpload);
      this.data.photo = resUpload.downloadURL;
      await this.afDB.list('siswa').set(this.data.nis, this.data);
      //console.log('Result', resSave);
      
      this.navCtrl.pop();

    }catch(err){
      console.error(err);
    }

  }

}
