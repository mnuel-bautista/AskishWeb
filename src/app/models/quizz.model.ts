export interface Quizz { 
    name: string, 
    questions: Array<Question>
}

export interface Question {
    question: string,
    description: string, 
    correct_answer: string, 
    answers: Answers
}

export interface Answers {
    A: string, 
    B: string, 
    C: string, 
    D: string 
}