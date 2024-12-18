import * as answerService from "../services/answerService.js";

const saveAnswer = async (userId, questionId, optionId) => {
    await answerService.saveAnswer(userId, questionId, optionId);
}

const deleteAnswersByOptionId = async (optionId) => {
    await answerService.deleteAnswersByOptionId(optionId);
}

const getAnswersCount = async () => {
    return await answerService.getAnswersCount();
}

export {saveAnswer, deleteAnswersByOptionId, getAnswersCount};