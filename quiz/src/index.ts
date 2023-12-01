import { IAnswer, IUserAnswer, IQuestion, IScore } from './models/models';
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

const questionEl = document.querySelector<HTMLHeadingElement>('#question')!;
const next = document.querySelector<HTMLButtonElement>('#next')!;
const btnFirst = document.querySelector<HTMLButtonElement>('#btn-first')!;
const btnSecond = document.querySelector<HTMLButtonElement>('#btn-second')!;
const btnThird = document.querySelector<HTMLButtonElement>('#btn-third')!;
const btnFourth = document.querySelector<HTMLButtonElement>('#btn-fourth')!;
const error = document.querySelector<HTMLSpanElement>('#error');
const btns = document.querySelector<HTMLDivElement>('#answers');

export let questionNumber = 0;
export let questions: IQuestion[] = [];
export let answers: IUserAnswer[] = [];

window.addEventListener('DOMContentLoaded', start);

function hideElements() {
    if (error) {
        error.style.display = "none";
    }
    if (btns) {
        btns.style.display = "none";
    }
}

export async function getQuestions() {
    return await get<IQuestion[]>('questions');
}

export async function calculateResult(answers: IUserAnswer[]) {
    return await post<IScore>({ answers });
}

async function showScore() {
    hideElements();
    const { score } = await calculateResult(answers);
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}`;
    next.innerHTML = 'Play Again';
}

export async function start() {
    next.addEventListener('click', async () => {

        if (answers.length < (questionNumber) && questionNumber != 0) {
            const error = document.querySelector<HTMLSpanElement>('#error')!;
            error.style.display = "flex";
            questionNumber--;
        }
        else if (questionNumber < questions.length) {
            showQuestion();
        } else {
            await showScore();
            questionNumber = -1;
            answers = [];
        }
        questionNumber++;
    })
    questions = await getQuestions();
}

async function selectAnswer(e: MouseEvent) {
    const selectedAnswer = e.target as HTMLButtonElement;

    const answerId = +selectedAnswer.dataset.id!;
    if (questions[questionNumber - 1].correctAnswerId === answerId) {
        selectedAnswer.classList.add('answers__btn--correct');
    } else {
        selectedAnswer.classList.add('answers__btn--incorrect');
    }

    answers.push({
        questionId: questions[questionNumber - 1].id,
        answerId
    });

    btnFirst.disabled = true;
    btnSecond.disabled = true;
    btnThird.disabled = true;
    btnFourth.disabled = true;
}

function showElements() {
    const currentQuestion = document.querySelector<HTMLHeadingElement>('#question');
    next.innerHTML = 'Next';
    if (currentQuestion) {
        currentQuestion.style.display = "flex";
    }
    if (btns) {
        btns.style.display = "grid";
    }
}

function buttonControl(btn: HTMLButtonElement, answerIndex: number, answers: IAnswer[]) {
    if (btn.classList.contains("answers__btn--correct")) {
        btn.classList.remove("answers__btn--correct");
    }
    else if (btn.classList.contains("answers__btn--incorrect")) {
        btn.classList.remove("answers__btn--incorrect")
    }
    btn.innerHTML = answers[answerIndex].answer;
    btn.dataset.id = answers[answerIndex].id.toString();
    btn.disabled = false;
    btn.addEventListener('click', selectAnswer)
}

function showAnswers(question: IQuestion) {
    showElements();
    const answers = question.answers;

    if (error) {
        error.style.display = "none";
    }

    buttonControl(btnFirst, 0, answers);
    buttonControl(btnSecond, 1, answers);
    buttonControl(btnThird, 2, answers);
    buttonControl(btnFourth, 3, answers);
}

function showQuestion() {
    let question = questions[questionNumber];
    questionEl.innerHTML = `${questionNumber + 1}. ${question.question}`;
    showAnswers(question);
}