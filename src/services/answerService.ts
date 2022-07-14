import { Answer } from ".prisma/client";
import questionService from './questionService.js';
import * as answerRepository from '../repositories/answerRepository.js';

export type CreateAnswerData = Omit<Answer, 'id' | 'questionId'>;

async function create(answer: string, questionId: number) {
    const question = await questionService.checkIfQuestionExistsAndReturn(Number(questionId));

    await answerRepository.create(answer, questionId);
}

async function findAnswersByQuestionId(questionId: number) {
    const answers = await answerRepository.findAnswersByQuestionId(questionId);

    return answers;
}

const answerService = {
    create,
    findAnswersByQuestionId
};

export default answerService;