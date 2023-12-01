"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const questionService = __importStar(require("../index"));
const globals_1 = require("@jest/globals");
const app = __importStar(require("../"));
const mockQuestions = [
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
        correctAnswerId: 1
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
        correctAnswerId: 4
    },
];
describe('App', () => {
    // let app: App;
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
        // app = new App();
        globals_1.jest.spyOn(questionService, 'get')
            .mockReturnValue(Promise.resolve(mockQuestions));
    });
    it('should get questions after start', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(app.questions.length).toEqual(0);
        app.start();
        expect(app.questions.length).toEqual(2);
        expect(app.questions[0].id).toEqual(4);
        expect(app.questions[1].id).toEqual(8);
    }));
});
//# sourceMappingURL=index.spec.js.map