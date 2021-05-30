import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
collectionName = 'IonApp'
  constructor(private firestore: AngularFirestore) {  }

  get_Data(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  add_Data(data){
    return this.firestore.collection(this.collectionName).add(data);
  }
  delete_data(id){
    return this.firestore.doc(this.collectionName+ '/' + id).delete();
  }
  get_single_data(id){
    return this.firestore.collection(this.collectionName).doc(id).valueChanges();
  }

  update_Data(id, data){
return this.firestore.doc(this.collectionName + '/' + id).update(data);
  }
}
