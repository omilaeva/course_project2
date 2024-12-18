import * as topicService from "topicService";
import {validateTextLength} from "../utils/topicValidation.js";
import * as questionManager from "./questionManager.js";

const getTopicById = async (topicId) => {
    return await topicService.getTopicById(topicId);
};

const deleteTopicById = async (topicId) => {
    await questionManager.deleteByTopicId(topicId);
    const result = await topicService.deleteTopicById(topicId);
    if (result) {
        return [true, []];
    }
    return [false, ["Can't delete topic"]];
}

const getAllTopics = async () => {
    return await topicService.getAllTopics();
}

const addTopic = async (userId, name) => {
    const [passes, errors] = validateTextLength(["Topic name", name], 4);
    if (passes) {
        if (await topicService.addTopic(userId, name)) {
            return [true, []];
        } else {
            errors.push(`Can't add topic ${name}`);
        }
    }
    return [false, errors];
}

const getTopicsCount = async () => {
    return await topicService.getTopicsCount();
}

export {getTopicById, deleteTopicById, getAllTopics, addTopic, getTopicsCount};