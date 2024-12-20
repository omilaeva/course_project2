import {sql} from "../database/database.js"

const getTopicById = async (id) => {
    try {
        const result = await sql`SELECT * FROM topics WHERE id=${id}`;
        if (result && result.length === 1) {
            return result[0];
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}

const getAllTopics = async () => {
    try {
        return await sql`SELECT * FROM topics ORDER BY name ASC`;
    } catch (e) {
        console.log(e);
    }
    return [];
}

const getAllTopicsWithAvailableQuestions = async () => {
    try {
        return await sql`SELECT DISTINCT(topics.id), topics.name FROM topics INNER JOIN  questions ON topics.id=questions.topic_id 
            INNER JOIN question_answer_options ON question_answer_options.question_id=questions.id;`;
    } catch (e) {
        console.log(e);
    }
    return [];
}

const addTopic = async (userId, name) => {
    try {
        const result = await sql`INSERT INTO topics(user_id, name) VALUES(${userId}, ${name})`;
        return result.count;
    } catch (e) {
        console.log(e);
    }
    return 0;
}

const deleteTopicById = async (topicId) => {
    try {
        const result = await sql`DELETE FROM topics WHERE id=${topicId}`;
        return result.count;
    } catch (e) {
        console.log(e);
    }
    return 0;
}

const getTopicsCount = async () => {
    try {
        const result = await sql`SELECT COUNT(id) FROM topics`;
        if (result && result.length === 1) {
            return result[0].count;
        }
    } catch (e) {
        console.log(e);
    }
    return 0;
}

export {getTopicById, getAllTopics, getAllTopicsWithAvailableQuestions, addTopic, deleteTopicById, getTopicsCount};