let questions = [];
let currentId = 1;

const getAllByTopicId= async (id) => {
    const topicsQuestions = [];
    for (let question of questions) {
        if (question.topicId === id) {
            topicsQuestions.push(question);
        }
    }
    return topicsQuestions;
}

const add = async (userId, topicId, name) => {
    questions.push({id: currentId++, userId: userId, topicId: topicId, name: name});
    // console.log("Add question");
    return 1;
}

const getById = async (id) => {
    for (let question of questions) {
        if (question.id === id) {
            return question;
        }
    }
    return null;
}

const deleteById = async (id) => {
    const tmp = questions.filter(function (question) {
        return question.id !== id;
    });
    const isDone = (tmp.length !== questions.length);
    questions = tmp;
    return isDone;
}

const deleteByTopicId = async (topicId) => {
    const tmp = questions.filter(function (question) {
        return question.topicId !== topicId;
    });
    const isDone = (tmp.length !== questions.length);
    questions = tmp;
    return isDone;
}

export {getAllByTopicId, add, getById, deleteById, deleteByTopicId};