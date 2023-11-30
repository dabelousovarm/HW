import {IAnswer, IUserAnswer, IQuestion, IScore} from './models/models';
import './style.css';
import './normalize.css';
import { stringify } from 'querystring';

const SERVER_URL = 'http://localhost:3000/';

export async function get<T>(url: string): Promise<T> {
    const api = `${SERVER_URL}${url}`;
    
    return (await fetch(api)).json();
}

export async function post<T>(data: any): Promise<T> {
    const api = `${SERVER_URL}`;
    
    return (await fetch(api, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })).json();
}

export class App {
    public questionEl: HTMLHeadingElement;
    public next: HTMLButtonElement;
    public btnFirst: HTMLButtonElement;
    public btnSecond: HTMLButtonElement;
    public btnThird: HTMLButtonElement;
    public btnFourth: HTMLButtonElement;
    public error: HTMLSpanElement;
    public btns: HTMLDivElement;

public constructor() {
    this.questionEl = document.querySelector<HTMLHeadingElement>('#question') as HTMLHeadingElement;
    this.next = document.querySelector<HTMLButtonElement>('#next') as HTMLButtonElement;
    this.btnFirst = document.querySelector<HTMLButtonElement>('#btn-first') as HTMLButtonElement;
    this.btnSecond = document.querySelector<HTMLButtonElement>('#btn-second') as HTMLButtonElement;
    this.btnThird = document.querySelector<HTMLButtonElement>('#btn-third') as HTMLButtonElement;
    this.btnFourth = document.querySelector<HTMLButtonElement>('#btn-fourth') as HTMLButtonElement;
    this.error = document.querySelector<HTMLSpanElement>('#error') as HTMLSpanElement;
    this.btns = document.querySelector<HTMLDivElement>('#answers') as HTMLDivElement;
}

public questionNumber = 0;
public questions: IQuestion[] = [];
public answers: IUserAnswer[] = [];

public hideElements(){
    if(this.error){
        this.error.style.display = "none";
    }
    if(this.btns){
        this.btns.style.display = "none";
    }
}

public async getQuestions() {
    return await get<IQuestion[]>('questions');
  }
  
   public async calculateResult(answers: IUserAnswer[]) {
    return await post<IScore>({answers});
  }

  public async showScore() {
    this.hideElements();
    const {score} = await this.calculateResult(this.answers);
    this.questionEl.innerHTML = `You scored ${score} out of ${this.questions.length}`;
    this.next.innerHTML = 'Play Again';
}

public async start() {
    this.next.addEventListener('click', async () => {
        
        if(this.answers.length < (this.questionNumber) && this.questionNumber != 0){
            this.error.style.display = "flex";
            this.questionNumber--;
        }
        else if(this.questionNumber < this.questions.length){
            this.showQuestion();
        }else{
            await this.showScore();
            this.questionNumber = -1;
            this.answers = [];
        }
        this.questionNumber++;
    })
    this.questions = await this.getQuestions();
}

public async selectAnswer(e : MouseEvent) {
    const selectedAnswer = e.target as HTMLButtonElement;
    
    if (!selectedAnswer.dataset.id) {
        throw Error('Can not find id info');
    }
    const answerId : number = +selectedAnswer.dataset.id;

    if(this.questions[(this.questionNumber)-1].correctAnswerId === answerId){
        selectedAnswer.classList.add('answers__btn--correct');
    } else {
        selectedAnswer.classList.add('answers__btn--incorrect');
    }

    this.answers.push({
        questionId: this.questions[this.questionNumber-1].id,
        answerId
    });

    this.btnFirst.disabled = true;
    this.btnSecond.disabled = true;
    this.btnThird.disabled = true;
    this.btnFourth.disabled = true;
}

public showElements() {
    const currentQuestion = document.querySelector<HTMLHeadingElement>('#question') as HTMLHeadingElement;
    this.next.innerHTML = 'Next';
    if(currentQuestion) {
        currentQuestion.style.display = "flex";
    }
    if(this.btns){
        this.btns.style.display = "grid";  
    }
}

public buttonControl (btn: HTMLButtonElement, answerIndex: number, answers: IAnswer[]){
    if(btn.classList.contains("answers__btn--correct")){
        btn.classList.remove("answers__btn--correct");
    }
    else if(btn.classList.contains("answers__btn--incorrect")){
        btn.classList.remove("answers__btn--incorrect")
    }
    const index = answerIndex;
    btn.innerHTML = answers[index].answer;
    btn.dataset.id = answers[index].id.toString();
    btn.disabled = false;
}

public showAnswers(question: IQuestion) {
    this.showElements();
    let answers = question.answers;

    if (this.error) {
        this.error.style.display = "none";
    }

    this.buttonControl(this.btnFirst, 0, answers);
    this.buttonControl(this.btnSecond, 1, answers);
    this.buttonControl(this.btnThird, 2, answers);
    this.buttonControl(this.btnFourth, 3, answers);
    this.btnFirst.addEventListener('click', this.selectAnswer);
    this.btnSecond.addEventListener('click', this.selectAnswer);
    this.btnThird.addEventListener('click', this.selectAnswer);
    this.btnFourth.addEventListener('click', this.selectAnswer);

}

public showQuestion() {
    let question = this.questions[this.questionNumber];
    this.questionEl.innerHTML = `${this.questionNumber+1}. ${question.question}`;
    this.showAnswers(question);
}
}

window.addEventListener('DOMContentLoaded', () =>{
    const app : App = new App();
    app.start();
});


// const questionEl = document.querySelector<HTMLHeadingElement>('#question')!;
// const next = document.querySelector<HTMLButtonElement>('#next')!;
// const btnFirst = document.querySelector<HTMLButtonElement>('#btn-first')!;
// const btnSecond = document.querySelector<HTMLButtonElement>('#btn-second')!;
// const btnThird = document.querySelector<HTMLButtonElement>('#btn-third')!;
// const btnFourth = document.querySelector<HTMLButtonElement>('#btn-fourth')!;
// const error = document.querySelector<HTMLSpanElement>('#error');
// const btns = document.querySelector<HTMLDivElement>('#answers');

// let questionNumber = 0;
// let questions: IQuestion[] = [];
// let answers: IUserAnswer[] = [];

// window.addEventListener('DOMContentLoaded', start);

// function hideElements(){
//     if(error){
//         error.style.display = "none";
//     }
//     if(btns){
//         btns.style.display = "none";
//     }
// }

// async function getQuestions() {
//     return await get<IQuestion[]>('questions');
//   }
  
//    async function calculateResult(answers: IUserAnswer[]) {
//     return await post<IScore>({answers});
//   }

//   async function showScore() {
//     hideElements();
//     const {score} = await calculateResult(answers);
//     questionEl.innerHTML = `You scored ${score} out of ${questions.length}`;
//     next.innerHTML = 'Play Again';
// }

// async function start() {
//     next.addEventListener('click', async () => {
        
//         if(answers.length < (questionNumber) && questionNumber != 0){
//             const error = document.querySelector<HTMLSpanElement>('#error')!;
//             error.style.display = "flex";
//             questionNumber--;
//         }
//         else if(questionNumber < questions.length){
//             showQuestion();
//         }else{
//             await showScore();
//             questionNumber = -1;
//             answers = [];
//         }
//         questionNumber++;
//     })
//     questions = await getQuestions();
// }

// async function selectAnswer(e: MouseEvent) {
//     const selectedAnswer = e.target as HTMLButtonElement;

//     const answerId = +selectedAnswer.dataset.id!;
//     if(questions[questionNumber-1].correctAnswerId === answerId){
//         selectedAnswer.classList.add('question__answer--correct');
//     } else {
//         selectedAnswer.classList.add('question__answer--incorrect');
//     }

//     answers.push({
//         questionId: questions[questionNumber-1].id,
//         answerId
//     });

//     btnFirst.disabled = true;
//     btnSecond.disabled = true;
//     btnThird.disabled = true;
//     btnFourth.disabled = true;
// }

// function showElements() {
//     const currentQuestion = document.querySelector<HTMLHeadingElement>('#question');
//     next.innerHTML = 'Next';
//     if(currentQuestion) {
//         currentQuestion.style.display = "flex";
//     }
//     if(btns){
//         btns.style.display = "grid";  
//     }
// }

// function buttonControl (btn: HTMLButtonElement, answerIndex: number, answers: IAnswer[]){
//     if(btn.classList.contains("question__answer--correct")){
//         btn.classList.remove("question__answer--correct");
//     }
//     else if(btn.classList.contains("question__answer--incorrect")){
//         btn.classList.remove("question__answer--incorrect")
//     }
//     btn.innerHTML = answers[answerIndex].answer;
//     btn.dataset.id = answers[answerIndex].id.toString();
//     btn.disabled = false;
//     btn.addEventListener('click', selectAnswer)
// }

// function showAnswers(question: IQuestion) {
//     showElements();
//     const answers = question.answers;

//     if (error) {
//         error.style.display = "none";
//     }

//     buttonControl(btnFirst, 0, answers);
//     buttonControl(btnSecond, 1, answers);
//     buttonControl(btnThird, 2, answers);
//     buttonControl(btnFourth, 3, answers);
// }

// function showQuestion() {
//     let question = questions[questionNumber];
//     questionEl.innerHTML = `${questionNumber+1}. ${question.question}`;
//     showAnswers(question);
// }