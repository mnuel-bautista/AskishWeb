import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzRoom } from 'src/app/models/quizz-room.model';
import { Quizz } from 'src/app/models/quizz.model';
import { CuestionariosService } from 'src/app/services/cuestionarios.service';
import { QuizzRoomsService } from 'src/app/services/quizz-rooms/quizz-rooms.service';

@Component({
  selector: 'app-quizz-room',
  templateUrl: './quizz-room.component.html',
  styleUrls: ['./quizz-room.component.css']
})
export class QuizzRoomComponent implements OnInit {

  quizz: Quizz | null = null; 

  quizzRoom: QuizzRoom | null = null; 

  currentQuestion = 0; 

  answers = Object.entries(this.quizzRoom?.question?.answers ?? {});

  constructor(
    private quizzService: CuestionariosService,
     private quizzRoomService: QuizzRoomsService, 
     private router: Router) { }

  ngOnInit(): void {
    let quizzId = localStorage.getItem('quizzId')!
    let groupId = localStorage.getItem('groupId')!

    this.quizzService.getQuizz(groupId, quizzId).then((quizz) => {
      this.quizz = quizz
      this.setQuestion().then((e) => {})
    })

    this.quizzRoomService.quizzRoom.subscribe((e) => {
      this.quizzRoom = e; 
      this.answers = Object.entries(this.quizzRoom?.question?.answers ?? {});
    })
    let quizzRoomId = localStorage.getItem('quizzRoomId') ?? ""
    this.quizzRoomService.getQuizzRoom(quizzRoomId).then(() =>{})
  }

  async setQuestion() {
    let quizzRoomId = localStorage.getItem('quizzRoomId')!
    if(this.quizz?.questions.length ?? 0 > 0) {
      let cq = this.quizz?.questions[this.currentQuestion]!;
      await this.quizzRoomService.setQuestion({...cq, status: 'In Progress'}, quizzRoomId);
      this.currentQuestion++; 
    }
  }

  markQuestionAsCompleted() {

  }

  finishQuizzRoom() {
    localStorage.removeItem('groupId')
    localStorage.removeItem('groupName')
    localStorage.removeItem('quizzId')
    localStorage.removeItem('quizzRoomId')
    localStorage.removeItem('quizzName')
    this.router.navigate(['/grupos'])
  }

}
