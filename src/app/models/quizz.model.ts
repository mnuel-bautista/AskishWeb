export interface Quizz { 
    name: string, 
    questions: Array<Question>
}

export interface Question {
    question: string,
    description: string, 
    correctAnswer: string, 
    answers: Answers
}

export interface Answers {
    a: string, 
    b: string, 
    c: string, 
    d: string 
}