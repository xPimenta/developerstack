import { prisma } from "../config/database.js";

export async function createQuestion(question: string) {
    return await prisma.question.create({data: {question}});
}

export async function getQuestion(id: number) {
    const question = await prisma.question.findUnique({where: {id}});

    return question;
}

export async function getQuestions() {
    const questions = await prisma.question.findMany();

    return questions;
}
