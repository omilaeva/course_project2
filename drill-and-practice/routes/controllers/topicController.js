import * as questionService from "../../services/questionService.js";
import * as topicManager from "../../managers/topicManager.js";

const showTopic = async ({params, render}) => {
    const topicData =  {
        topic: await topicManager.getTopicById(params.id),
        questions: await questionService.getAllByTopicId(params.id)
    };
    render("topic.eta", topicData );
}

const deleteTopicById = async ({params, render, response}) => {
    const [done, errors] = await topicManager.deleteTopicById(params.id);
    if (done) {
        response.redirect("/topics");
    } else {
        const topicData = {
            topics: await topicManager.getAllTopics(),
            errors: errors
        };
        render("topics.eta", topicData);
    }
}

const addTopic =async ({request, render, response, user}) => {
    const formData = await request.body().value;
    const name = formData.get("name");
    const userId = user.id;
    const [done, errors] = await topicManager.addTopic(userId, name);
    if (!done) {
        const topicData = {
            topics: await topicManager.getAllTopics(),
            errors: errors,
            name: name
        };
        render("topics.eta", topicData);
    } else {
        response.redirect("/topics");
    }
};


const listTopics = async ({render}) => {
    render("topics.eta", { topics: await topicManager.getAllTopics() });
};

export {showTopic, deleteTopicById, addTopic, listTopics};