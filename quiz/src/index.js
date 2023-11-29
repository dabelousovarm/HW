"use strict";
// import {IAnswer, IUserAnswer, IQuestion, IScore} from './models/models';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SERVER_URL = 'http://localhost:3000/';
function get(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = `${SERVER_URL}${url}`;
        return (yield fetch(api)).json();
    });
}
function post(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = `${SERVER_URL}`;
        return (yield fetch(api, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })).json();
    });
}
const question_ = document.querySelector('#question');
const answers_ = document.querySelector('#answers');
const next = document.querySelector('#next');
const btnFirst = document.querySelector('#btn-first');
const btnSecond = document.querySelector('#btn-second');
const btnThird = document.querySelector('#btn-third');
const btnFourth = document.querySelector('#btn-fourth');
const error = document.querySelector('#error');
const btns = document.querySelector('#answers');
let questionNumber = 0;
let questions = [];
let answers = [];
window.addEventListener('DOMContentLoaded', start);
function hideElements() {
    if (error) {
        error.style.display = "none";
    }
    if (btns) {
        btns.style.display = "none";
    }
}
function getQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield get('questions');
    });
}
function calculateResult(answers) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield post({ answers });
    });
}
function showScore() {
    return __awaiter(this, void 0, void 0, function* () {
        hideElements();
        const { score } = yield calculateResult(answers);
        question_.innerHTML = `You scored ${score} out of ${questions.length}`;
        next.innerHTML = 'Play Again';
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        next.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            if (answers.length < (questionNumber) && questionNumber != 0) {
                const error = document.querySelector('#error');
                error.style.display = "flex";
                questionNumber--;
            }
            else if (questionNumber < questions.length) {
                showQuestion();
            }
            else {
                yield showScore();
                questionNumber = -1;
                answers = [];
            }
            questionNumber++;
        }));
        questions = yield getQuestions();
    });
}
function selectAnswer(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectedAnswer = e.target;
        const answerId = +selectedAnswer.dataset.id;
        if (questions[questionNumber - 1].correctAnswerId === answerId) {
            selectedAnswer.classList.add('question__answer--correct');
        }
        else {
            selectedAnswer.classList.add('question__answer--incorrect');
        }
        answers.push({
            questionId: questions[questionNumber - 1].id,
            answerId
        });
        btnFirst.disabled = true;
        btnSecond.disabled = true;
        btnThird.disabled = true;
        btnFourth.disabled = true;
    });
}
function showElements() {
    const currentQuestion = document.querySelector('#question');
    next.innerHTML = 'Next';
    if (currentQuestion) {
        currentQuestion.style.display = "flex";
    }
    if (btns) {
        btns.style.display = "grid";
    }
}
function buttonControl(btn, answerIndex, answers) {
    if (btn.classList.contains("question__answer--correct")) {
        btn.classList.remove("question__answer--correct");
    }
    else if (btn.classList.contains("question__answer--incorrect")) {
        btn.classList.remove("question__answer--incorrect");
    }
    btn.innerHTML = answers[answerIndex].answer;
    btn.dataset.id = answers[answerIndex].id.toString();
    btn.disabled = false;
    btn.addEventListener('click', selectAnswer);
}
function showAnswers(question) {
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
    question_.innerHTML = `${questionNumber + 1}. ${question.question}`;
    showAnswers(question);
}
