import { Injectable } from '@angular/core';
import { collection, doc, query, where, getDocs, getDoc, addDoc } from '@firebase/firestore';
import { Question, Quizz } from '../models/quizz.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CuestionariosService {

  private firestore;

  constructor(private af: FirebaseService) {
    this.firestore = af.firestore;
  }


  async createQuizz(group: string, name: string): Promise<{ groupId: string, quizzId: string }> {
    let userId = localStorage.getItem('userId')

    let qr = query(collection(this.firestore, 'grupos'),
      where('creador', '==', userId),
      where('nombre', '==', group))

    let docs = await getDocs(qr)
    let groupId = docs.docs[0].id

    let res = await addDoc(collection(this.firestore, `grupos/${groupId}/cuestionarios`), {
      cuestionario: name,
    })

    return { groupId: groupId, quizzId: res.id }
  }

  async addQuestion(groupId: string, quizzId: string, question: Question) {
    await addDoc(collection(this.firestore, `grupos/${groupId}/cuestionarios/${quizzId}/preguntas`), {
      pregunta: question.question, 
      descripcion: question.description, 
      respuestaCorrecta: question.correctAnswer, 
      respuestas: question.answers, 
    })
  }

  async getQuizz(groupId: string, quizzId: string): Promise<Quizz> {
    let document = await getDoc(doc(this.firestore, `grupos/${groupId}/cuestionarios/${quizzId}`))

    let name = document.get('cuestionario') as string

    let qDocuments = await getDocs(collection(this.firestore, `grupos/${groupId}/cuestionarios/${quizzId}/preguntas`))

    let questions = qDocuments.docs.map((e) => {

      let questionId = e.id
      let question = e.get('pregunta') as string
      let description = e.get('descripcion') as string
      let correctAnswer = e.get('respuestaCorrecta') as string
      let answers = e.get('respuestas') as Object

      return <Question>{ 
        questionId,
        question,
        description,
        correctAnswer, 
        answers 
      }
    })

    return <Quizz>{ quizzId: document.id, name: name, questions: questions }
  }
}
