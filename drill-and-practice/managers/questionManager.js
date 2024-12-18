import {validateTextLength} from "../utils/topicValidation.js";
import * as questionService from "questionService";
import * as optionManager from "./optionManager.js";

const add = async (userId, topicId, text) => {
    const [passes, errors] = validateTextLength(["Question text", text]);

    if (passes) {
        if (await questionService.add(userId, topicId, text)) {
            return [true, []];
        } else {
            errors.push(`Can't add question ${text}`);
        }
    }
    return [passes, errors];

}

const getById = async (id) => {
    return await questionService.getById(id);
}

const deleteById = async (id) => {
    if (await questionService.deleteById(id)) {
        return [true, []];
    }
    return [false, ["No such question"]];
}

const getAllByTopicId = async (topicId) => {
    return await questionService.getAllByTopicId(topicId);
}

const getRandomQuestionByTopicId = async (topicId) => {
    return await questionService.getRandomQuestionByTopicId(topicId);
}

const getRandomQuestion = async () => {
    return await questionService.getRandomQuestion();
}

const deleteByTopicId = async (topicId) => {
    const allQuestions = await getAllByTopicId(topicId);
    for (let question of allQuestions) {
        await optionManager.deleteByQuestionId(question.id);
    }
    await questionService.deleteByTopicId(topicId);
}

const getQuestionsCount = async () => {
    return await questionService.getQuestionsCount();
}

export {
    add,
    getById,
    deleteById,
    getAllByTopicId,
    getRandomQuestionByTopicId,
    getRandomQuestion,
    deleteByTopicId,
    getQuestionsCount
}