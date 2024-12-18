import * as questionService from "../../services/questionService.js";
import * as topicManager from "../../managers/topicManager.js";

const showTopic = async ({params, render, user}) => {
    // TODO: process invalid topic id: check and show error page in case of invalid topic id!
    const topicData =  {
        topic: await topicManager.getTopicById(params.id),
        questions: await questionService.getAllByTopicId(params.id)
    };
    render("topic.eta", topicData );
}

const deleteTopicById = async ({params, render, response, user}) => {
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
    console.log(formData);
    const name = formData.get("name");
    console.log(`name = ${name}`);
    // TODO: replace 1 with current userId
    const userId = 1;
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


const listTopics = async ({render, user}) => {
    console.log(`User email = ${user.email}`);
    const data = {
        topics: await topicManager.getAllTopics()
    };
    console.dir(data);
    render("topics.eta", data);
};

export {showTopic, deleteTopicById, addTopic, listTopics};