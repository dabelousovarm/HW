export interface IAnswer {
  id: number;
  answer: string;
}

export interface IUserAnswer {
  questionId: number;
  answerId: number;
}

export interface IQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
  correctAnswerId: number;
}

export interface IScore {
  score: number;
}