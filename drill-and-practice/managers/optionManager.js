import {validateTextLength} from "../utils/topicValidation.js";
import * as optionService from "optionService";
import * as answerManager from "./answerManager.js";

const add = async (questionId, optionText, isCorrect) => {
    console.log(optionText);
    const [passes, errors] = validateTextLength(["Option text", optionText], 1);
    if (passes) {
        const id = await optionService.add(questionId, optionText, isCorrect);
        if (id !== -1) {
            return [true, id];
        } else {
            errors.push(`Can't add option ${optionText}`);
        }
    }
    return [false, errors];
}

const deleteById = async (id) => {
    await optionService.deleteById(id);
}

const getAllByQuestionId = async (questionId) => {
    return await optionService.getAllByQuestionId(questionId);
}

const getCorrectAnswerByQuestionId = async (questionId) => {
   return await optionService.getCorrectAnswerByQuestionId(questionId);
}

const deleteByQuestionId = async (questionId) => {
    const allOptions = await getAllByQuestionId(questionId);
    for (const option of allOptions) {
        await answerManager.deleteAnswersByOptionId(option.id);
    }
    await optionService.deleteOptionsByQuestionId(questionId);
}

export {add, deleteById, getAllByQuestionId, getCorrectAnswerByQuestionId, deleteByQuestionId};