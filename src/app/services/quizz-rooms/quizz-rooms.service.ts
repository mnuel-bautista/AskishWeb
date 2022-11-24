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
      let quizId = doc.get('cuestionario.id_cuestionario') as string
      let quizName = doc.get('cuestionario.nombre') as string
      let quizzStatus = doc.get('estado_sala') as string
      let question = doc.get('question') as CurrentQuestion
      let guests = doc.get('invitados') as Object
      let participants = doc.get('participantes') as Object

      this.quizzRoom$.next(<QuizzRoom>{
        host,
        group: { groupId, name: groupName },
        quiz: { quizId, name: quizName },
        quizzRoomStatus: quizzStatus,
        question: question,
        guests,
        participants,
      })
    })
  }

  async createQuizzRoom(room: QuizzRoom): Promise<string> {

    let doc = await addDoc(collection(this.firestore, 'salas'), { ...room })

    return doc.id
  }

  async startQuizRoom(quizRoomId: string) {
    await updateDoc(doc(this.firestore, 'salas', quizRoomId), {
      estado_sala: 'In Progress'
    })
  }

  async setQuestion(question: CurrentQuestion, quizzRoomId: string) {
    await updateDoc(doc(this.firestore, 'salas', quizzRoomId), {
      question : question 
    })
  }

  async markQuestionAsCompleted(quizRoomId: string) {
    await updateDoc(doc(this.firestore, `salas`, quizRoomId), {
      "question.status" : 'Completed' 
    })
  }

  async markQuizRoomAsCompleted(quizRoomId: string) {
    await updateDoc(doc(this.firestore, `salas`, quizRoomId), {
      quizzRoomStatus : 'Completed' 
    })
  }
}
