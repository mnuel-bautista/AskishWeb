import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firebase/firestore.service';
import { QuizzRoom } from '../models/quizz-room.model';
import { CurrentQuestion } from '../models/quizz.model';
import { CuestionariosService } from '../services/cuestionarios.service';
import { QuizzRoomsService } from '../services/quizz-rooms/quizz-rooms.service';

@Component({
  selector: 'app-waiting-participants',
  templateUrl: './waiting-participants.component.html',
  styleUrls: ['./waiting-participants.component.css']
})
export class WaitingParticipantsComponent implements OnInit {

  constructor(private service: QuizzRoomsService,
    private router: Router) { }

  ngOnInit(): void {
    let host = localStorage.getItem('userId')
    let groupId = localStorage.getItem('groupId')
    let groupName = localStorage.getItem('groupName')
    let quizzId = localStorage.getItem('quizzId')
    let quizzName = localStorage.getItem('quizzName')
    let roomStatus = "En espera"

    let quizz = <QuizzRoom>{
      host,
      group: { groupId, name: groupName },
      quizz: { quizzId, name: quizzName },
      quizzRoomStatus: roomStatus,
      guests: { "jaYl9hlDSAHCTWzA2ez5YWc1VhrQ": true },
      participants: {}
    }
    this.service.createQuizzRoom(quizz).then((e) => {
      localStorage.setItem('quizzRoomId', e)
    })
  }

  async startQuizzRoom() {
    this.router.navigate(['/sala']);
  }

}
