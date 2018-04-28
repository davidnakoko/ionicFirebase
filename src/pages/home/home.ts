import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private afDB: AngularFireDatabase  ) {
    this.items = afDB.list('siswa').valueChanges();
  }

  add(){
     let prompt = this.alertCtrl.create({
       title: 'New Siswa',
       subTitle: 'Masukkan data siswa',
       inputs: [
         {
           name: 'nis',
           placeholder: 'Nomor Induk Siswa',
           type: 'text'
         },
         {
           name: 'nama',
           placeholder: 'Nama Siswa',
           type: 'text'
         },
         {
           name: 'kelas',
           placeholder: 'Kelas',
           type: 'text'
         }
       ],
       buttons: [
         {
           text: 'Cancel'
         },
         {
           text: 'Save',
           handler: (data)=>{
             this.afDB.list('siswa').set(data.nis, data)
             .catch(err=>{
               console.log('error save', err);
             });
           }
         }
       ]
     });
     prompt.present();
  }

  edit(item){
    let prompt = this.alertCtrl.create({
      title: 'New Siswa',
      subTitle: 'Masukkan data siswa',
      inputs: [
        {
          name: 'nis',
          placeholder: 'Nomor Induk Siswa',
          type: 'text',
          value: item.nis
        },
        {
          name: 'nama',
          placeholder: 'Nama Siswa',
          type: 'text',
          value: item.nama
        },
        {
          name: 'kelas',
          placeholder: 'Kelas',
          type: 'text',
          value: item.kelas
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data)=>{
            this.afDB.list('siswa').set(data.nis, data)
            .catch(err=>{
              console.log('error save', err);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  delete(item){
    let confirm = this.alertCtrl.create({
      title:'Delete',
      subTitle: 'Are you sure delete this item ?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text:'Delete',
          handler: ()=>{
            this.afDB.list('siswa').remove(item.nis);
          }
        }
      ]
    });
    confirm.present();
  }

}
