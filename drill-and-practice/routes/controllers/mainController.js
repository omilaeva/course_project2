import * as topicManager from "../../managers/topicManager.js";
import * as questionManager from "../../managers/questionManager.js";
import * as answerManager from "../../managers/answerManager.js";

const showMain = async ({request, render}) => {
    render("index.eta", {
        topicsCount: await topicManager.getTopicsCount(),
        questionsCount: await questionManager.getQuestionsCount(),
        answersCount: await answerManager.getAnswersCount()
    })
}

export {showMain}