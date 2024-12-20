import * as topicManager from "../../managers/topicManager.js";
import * as questionManager from "../../managers/questionManager.js";
import * as optionManager from "../../managers/optionManager.js";
import * as answerManager from "../../managers/answerManager.js";

const showQuizMain = async ({render}) => {
    render("quiz.eta", {topics: await topicManager.getAllTopics()});
}

const getRandomQuestion = async ({params, response, render}) => {
    const topicId = params.tId;
    const question = await questionManager.getRandomQuestionByTopicId(topicId);
    if (question) {
        response.redirect(`/quiz/${topicId}/questions/${question.id}`)
    } else {
        render("empty_quiz.eta");
    }
}

const showQuizQuestion = async ({params, render}) => {
    const questionId = params.qId;
    const question = await questionManager.getById(questionId);
    if (question) {
        render("quiz_question.eta", {question: question, options: await optionManager.getAllByQuestionId(questionId)});
    } else {
        render("quiz_question.eta", {error: "No such question"});
    }
}

const answer = async ({user, params, response}) => {
    const optionId = Number(params.oId);
    const questionId = Number(params.qId);
    await answerManager.saveAnswer(user.id, questionId, optionId);
    const correctOption = await optionManager.getCorrectAnswerByQuestionId(questionId);
    if (!correctOption) {
        response.redirect(`/quiz/${params.tId}/questions/${questionId}/incorrect`);
    }
    console.log(`Correct option id = ${correctOption.id}, your answer id = ${optionId}`);
    if (correctOption.id === optionId) {
        response.redirect(`/quiz/${params.tId}/questions/${questionId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${questionId}/incorrect`);
    }
}

const processCorrect = async ({params, render}) => {
    const topicId = Number(params.tId);
    render("correct_quiz.eta", {topicId: topicId});
}

const processIncorrect = async ({params, render}) => {
    const topicId = Number(params.tId);
    const correctOption = await optionManager.getCorrectAnswerByQuestionId(Number(params.qId));
    if (!correctOption) {
        render("incorrect_quiz.eta", {topicId: topicId, optionText: "No correct answer"})
    } else {
        render("incorrect_quiz.eta", {topicId: topicId, optionText: correctOption.option_text})
    }

}

export {showQuizMain, getRandomQuestion, showQuizQuestion, answer, processCorrect, processIncorrect}