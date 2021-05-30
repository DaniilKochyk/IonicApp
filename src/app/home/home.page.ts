import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tran: any;
  darkMode: boolean = false;
  constructor( public firebaseService: FirebaseService, public toastController: ToastController) {
this.firebaseService.get_Data().subscribe((res:any) => {
     this.tran = res.map(e => {
       return {
         id: e.payload.doc.id,
         type: e.payload.doc.data()['type'],
         title: e.payload.doc.data()['title'],
         stitle: e.payload.doc.data()['stitle'],
         kwota: e.payload.doc.data()['kwota']
       }
     })
     console.log(this.tran);
}, (err:any) => {
  console.log(err);
})
  }

  delete_data(dataId){
    this.firebaseService.delete_data(dataId).then((res:any) => {
      console.log(res);
    })
  }

 
  ddrk() {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle('dark');
    
  }

async toastDel(){
  const toast = await this.toastController.create({
message: 'Punkt został usunięty',
animated: false,
buttons: [
  {
    text: 'Zamknąć',
    role: 'cancel',
    handler: () => {
      console.log('toast został zamknięty');
    }
  }
]
  });
  toast.present();
 /*  toast.onDidDismiss().then((val) => {
    console.log('toast został zamkięty'); 
  })*/
}


}
