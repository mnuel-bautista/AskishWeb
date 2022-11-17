import { Injectable } from '@angular/core';
import { getFirestore, collection, query, where, getDocs, addDoc,  connectFirestoreEmulator } from '@firebase/firestore';
import { Firebase } from '../firebase/firebase';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CuestionariosService {

  private firestore;

  constructor(private af: FirebaseService) {
    this.firestore = af.firestore; 
  }


  async createQuizz(group: string, name: string) {
    let userId = localStorage.getItem('userId')

    let qr = query(collection(this.firestore, 'grupos'),
      where('creador', '==', userId),
      where('nombre', '==', group))

    let docs = await getDocs(qr)
    let groupId = docs.docs[0].id

    await addDoc(collection(this.firestore, `grupos/${groupId}/cuestionarios`), {
      cuestionario: name, 
    })
  }
}
