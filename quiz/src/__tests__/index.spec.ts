import { IQuestion } from '../models/models';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import * as app from '../index';

const mockQuestions: IQuestion[] = [
  {
    id: 4,
    question: '2 + 2 = ?',
    answers: [
      {
        id: 1,
        answer: '4'
      },
      {
        id: 2,
        answer: '1'
      },
      {
        id: 3,
        answer: '3'
      },
      {
        id: 4,
        answer: '2'
      }
    ],
    correctAnswerId: 1,
  },
  {
    id: 8,
    question: '3 + 2 = ?',
    answers: [
      {
        id: 1,
        answer: '4'
      },
      {
        id: 2,
        answer: '1'
      },
      {
        id: 3,
        answer: '3'
      },
      {
        id: 4,
        answer: '5'
      }
    ],
    correctAnswerId: 4,
  },
];

describe('App', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="wrapper__card card" id="card">
    <h1 class="wrapper__title">Quiz</h1>
    <h2 class="card__question" id="question">Question?</h2>
    <div class="card__answers answers" id="answers">
      <button class="answers__btn button" type="button" id="btn-first"></button>
      <button class="answers__btn button" type="button" id="btn-second"></button>
      <button class="answers__btn button" type="button" id="btn-third"></button>
      <button class="answers__btn button" type="button" id="btn-fourth"></button>
    </div>
    <span class="answers__error" id="error">Please, select an answer :3</span>
    <button class="card__next button" id="next">Start!</button>
  </div>`;

    jest.spyOn(app, 'getQuestions')
      .mockReturnValue(Promise.resolve(mockQuestions));
  });

  it('there should be no questions before start', async () => {
    expect(app.questions.length).toEqual(0);
  });

  it('should get questions after start', async () => {
    expect(app.questions.length).toEqual(0);
    const questions = await app.getQuestions();
    expect(questions.length).toBeDefined();
    expect(questions).toHaveLength(mockQuestions.length);
    expect(questions[0].id).toEqual(4);
    expect(questions[1].id).toEqual(8);
  });

  it('questions should be displayed until the test is over', async () => {
    const showQuestionStub = jest.spyOn(app, 'showQuestion');
    const showScoreStub = jest.spyOn(app, 'showScore');

    if (app.questionNumber < app.questions.length) {
      expect(showQuestionStub).toHaveBeenCalled();
    }
  });

  it('the correct style is applied to the answer button', () => {
    const answerId = 1;
    const selectedAnswer = document.querySelector<HTMLButtonElement>('#btn-first') as HTMLButtonElement;

    if (app.questionNumber == 1) {
      if (app.questions[app.questionNumber - 1].correctAnswerId === answerId) {
        expect(selectedAnswer.classList).toContain('answers__btn--correct');
      }
    }
  });
});