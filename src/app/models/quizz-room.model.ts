import { CurrentQuestion } from "./quizz.model";

export interface QuizzRoom {
    host: string, 
    group: { groupId: string, name: string }, 
    quiz: { quizId: string, name: string }, 
    quizzRoomStatus: string,
    question?: CurrentQuestion,  
    guests: Object, 
    participants: Object
}