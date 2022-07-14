import { prisma } from "../config/database.js";

export async function create(answer: string, questionId: number) {
    return await prisma.answer.create({data: {answer, questionId}})
}

export async function findAnswersByQuestionId(questionId: number) {
    const answers = await prisma.answer.findMany({where: {questionId}, select: {answer: true}});

    return answers;
}