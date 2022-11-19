import { Injectable } from '@angular/core';
import { QuizzRoom } from 'src/app/models/quizz-room.model';

import { collection, doc, updateDoc, onSnapshot, addDoc, connectFirestoreEmulator } from '@firebase/firestore';
import { FirebaseService } from '../firebase.service';
import { Subject, ReplaySubject } from 'rxjs';
import { CurrentQuestion, Question } from 'src/app/models/quizz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzRoomsService {

  private firestore;

  private quizzRoom$: Subject<QuizzRoom> = new ReplaySubject();

  public quizzRoom = this.quizzRoom$.asObservable();

  constructor(private af: FirebaseService) {
    this.firestore = af.firestore;
  }

  async getQuizzRoom(quizzRoomId: string) {
    onSnapshot(doc(this.firestore, 'salas', quizzRoomId), (doc) => {

      let host = doc.get('anfitrion') as string
      let groupId = doc.get('grupo.id_grupo') as string
      let groupName = doc.get('grupo.nombre') as string
      let quizzId = doc.get('cuestionario.id_cuestionario') as string
      let quizzName = doc.get('cuestionario.nombre') as string
      let quizzStatus = doc.get('estado_sala') as string
      let question = doc.get('question') as CurrentQuestion
      let guests = doc.get('invitados') as Object
      let participants = doc.get('participantes') as Object

      this.quizzRoom$.next(<QuizzRoom>{
        host,
        group: { groupId, name: groupName },
        quizz: { quizzId, name: quizzName },
        quizzRoomStatus: quizzStatus,
        question: question,
        guests,
        participants,
      })
    })
  }

  async createQuizzRoom(room: QuizzRoom): Promise<string> {

    let doc = await addDoc(collection(this.firestore, 'salas'), {
      anfitrion: room.host, 
      grupo: { id_grupo: room.group.groupId, nombre: room.group.name },
      cuestionario: { id_cuestionario: room.quizz.quizzId, nombre: room.quizz.name },
      estado_sala: room.quizzRoomStatus,
      invitados: { "jaYl9hlDSAHCTWzA2ez5YWc1VhrQ": true },
      participantes: {}
    })

    return doc.id
  }

  async setQuestion(question: Question, quizzRoomId: string) {
    await updateDoc(doc(this.firestore, 'salas', quizzRoomId), {
      question : question 
    })
  }
}
