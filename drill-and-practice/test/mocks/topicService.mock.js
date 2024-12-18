let topics = [];
let currentId = 1;

const getAllTopics = async () => {
    // console.log("getAllTopics is mocked");
    // console.log(topics);
    return topics;
}

const addTopic = async (userId, name) => {
    topics.push({id: currentId++, userId: userId, name: name});
    // console.log("Add topic");
    return 1;
}

const getTopicById = async (topicId) => {
    for (let topic of topics) {
        if (topic.id === topicId) {
            return topic;
        }
    }
    return null;
}

const deleteTopicById = async (id) => {
    const tmp = topics.filter(function (topic) {
        return topic.id !== id;
    });
    const isDone = (tmp.length !== topics.length);
    topics = tmp;
    return isDone;
}

export {getAllTopics, addTopic, getTopicById, deleteTopicById};