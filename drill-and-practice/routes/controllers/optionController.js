import * as optionService from "../../services/optionService.js";
import * as optionManager from "../../managers/optionManager.js";
import * as topicManager from "../../managers/topicManager.js";
import * as questionManager from "../../managers/questionManager.js";
import * as answerManager from "../../managers/answerManager.js";

const addOption = async ({params, request, render, response}) => {
    const topicId = params.id;
    const questionId = params.qid;
    const formData = await request.body().value;
    const optionText = formData.get("option_text") ?? "";
    const isCorrect = !!(formData.get("is_correct") ?? false);
    console.log(`isCorrect = ${isCorrect}`);
    const [passes, errors] = await optionManager.add(questionId, optionText, isCorrect);
    if (passes) {
        response.redirect(`/topics/${topicId}/questions/${questionId}`);
    } else {
        const data = {
            topic: await topicManager.getTopicById(topicId),
            question: await questionManager.getById(questionId),
            options: await optionService.getAllByQuestionId(questionId),
            optionText: optionText,
            optionIsCorrect: isCorrect,
            errors: errors,
        }
        render("question.eta", data);
    }
}

const deleteOptionById = async ({params, response}) => {
    const optionId = params.oid;
    await answerManager.deleteAnswersByOptionId(optionId);
    await optionManager.deleteById(optionId);
    response.redirect(`/topics/${params.id}/questions/${params.qid}`);
}

export {addOption, deleteOptionById}