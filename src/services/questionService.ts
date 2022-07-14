import { Question} from "@prisma/client";
import * as repository from '../repositories/questionRepository.js';
import answerService from "./answerService.js";

export type CreateQuestionData = Omit<Question, 'id'>;

async function create(question: string) {
    await repository.createQuestion(question);
}

async function checkIfQuestionExistsAndReturn(questionId: number) {
    const question = await repository.getQuestion(questionId);

    if (!question) {
        throw {
            type: 'not_found'
        }
    }

    return question;
}

async function getQuestions() {
    const questions = await repository.getQuestions();

    return questions;
}

async function getQuestionAndAnswersById(id: number) {
    const question = await checkIfQuestionExistsAndReturn(id);
    const answers = await answerService.findAnswersByQuestionId(id);

    return {...question, answers};
}

const questionService = {
    create,
    checkIfQuestionExistsAndReturn,
    getQuestions,
    getQuestionAndAnswersById
};

export default questionService;