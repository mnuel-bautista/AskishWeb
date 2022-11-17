import { Injectable } from '@angular/core';
import { Firebase } from './firebase';
import { getFirestore, collection, query, where, getDocs, connectFirestoreEmulator } from '@firebase/firestore';
import { addDoc } from '@firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Question, Quizz } from '../models/quizz.model';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore;

  private auth;

  private $grupos: BehaviorSubject<Array<Group>> = new BehaviorSubject(<Array<Group>>[]);

  grupos = this.$grupos.asObservable();

  constructor(private af: Firebase) {
    this.firestore = getFirestore(this.af.app)
    this.auth = getAuth(this.af.app)
    connectAuthEmulator(this.auth, "http://localhost:9099")
    connectFirestoreEmulator(this.firestore, 'localhost', 8080);

    this.getAllGroupsByUser().then(()=> {

    }).catch((error) => {
      alert(error); 
    })
  }

  async createGroup(group: string) {

    let userId = localStorage.getItem('userId')
    
    let groupCode = this.makeid(6)
    await addDoc(collection(this.firestore, 'grupos'), {
      nombre: group, 
      creador: userId, 
      codigo: groupCode, 
    })
  }

  private makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}


  //Obtiene todos los grupos del usuario que ha iniciado sesión.
  async getAllGroupsByUser() {

    let userId = localStorage.getItem('userId')

    if (userId != null) {

      let ref = collection(this.firestore, 'grupos')
      let qr = query(ref, where("creador", "==", userId))

      let res = (await getDocs(qr)).docs
      console.log(res)
      let grupos = res.map((element) => {
        let groupId = element.id as string;
        let name = element.get('nombre') as string
        let code = element.get('codigo') as string
        let creator = element.get('creator') as string

        return { groupId, code, creator, name } as Group 
      })

      console.log(grupos)
      this.$grupos.next(grupos)
    }

  }

  async getAllQuizzesByGroup(groupId: string): Promise<Quizz[]> {

    let ref = collection(this.firestore, `grupos/${groupId}/cuestionarios`)
    let documents = await getDocs(ref)

    let quizzes = documents.docs.map((document) => {
      let name = document.get('cuestionario') as string 
      let questions = document.get('preguntas') as Array<Question>

      return <Quizz>{ name: name, questions: questions}
    })

    return quizzes 
  }

}
