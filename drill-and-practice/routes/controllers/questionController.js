import {validateTextLength} from "../../utils/topicValidation.js";
import * as topicManager from "../../managers/topicManager.js";
import * as questionManager from "../../managers/questionManager.js";
import * as optionManager from "../../managers/optionManager.js";

const addQuestion = async ({params, request, render, response}) => {
    const topicId = params.id;
    console.log(`addQuestion: topicId = ${topicId}`);
    const formData = await request.body().value;
    const text = formData.get("question_text");
    const [passes, errors] = validateTextLength(["Question text", text]);
    if (passes) {
        const userId = 1;
        const [done, addErrors] = await questionManager.add(userId, topicId, text);
        if (done) {
            response.redirect(`/topics/${topicId}`);
            return;
        } else {
            errors.concat(addErrors);
        }
    }
    const data = {
        topic: await topicManager.getTopicById(topicId),
        question_text: text,
        errors: errors,
        questions: await questionManager.getAllByTopicId(topicId),
    }
    render("topic.eta", data);
}

const showQuestionById = async({params, render}) => {
    const topicId = params.id;
    const questionId = params.qid;
    const data = {
        topic: await topicManager.getTopicById(topicId),
        question: await questionManager.getById(questionId),
        options: await optionManager.getAllByQuestionId(questionId),
    };
    render("question.eta", data);
}

const deleteQuestionById = async ({params, response}) => {
    const questionId = params.qid;
    await questionManager.deleteById(questionId);
    response.redirect(`/topics/${params.id}`);
}

export  {addQuestion, showQuestionById, deleteQuestionById}