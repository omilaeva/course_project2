import * as questionManager from "../../managers/questionManager.js";
import * as optionManager from "../../managers/optionManager.js";

const getRandomQuestion = async ({response}) => {
    const question = await questionManager.getRandomQuestion();
    if (question) {
        const options = await optionManager.getAllByQuestionId(question.id);
        const answerOptions = [];
        options.forEach((option) => {
            answerOptions.push({optionId: option.id, optionText: option.option_text});
        })
        const randomQuestion = {
            questionId: question.id,
            questionText: question.question_text,
            answerOptions: answerOptions
        }
        response.body = randomQuestion;
    } else {
        response.body = {};
    }
}

const checkAnswer = async ({request, response}) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    console.dir(document);
    const questionId = Number(document.questionId) ?? -1;
    const optionId = Number(document.optionId) ?? -1;
    const correctOption = await optionManager.getCorrectAnswerByQuestionId(questionId);
    if (correctOption.id === optionId) {
        response.body = {correct: true};
    } else {
        response.body = {correct: false}
    }
}

export {getRandomQuestion, checkAnswer}