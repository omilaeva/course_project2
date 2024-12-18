import {sql} from "../database/database.js"

const add = async (userId, topicId, text) => {
    try {
        const result = await sql`INSERT INTO questions(user_id, topic_id, question_text) 
            VALUES (${userId}, ${topicId}, ${text})`;
        return result.count;
    } catch (e) {
        console.log(e);
    }
    return 0;
}

const getAllByTopicId = async (topicId) => {
    try {
        return await sql`SELECT * FROM questions WHERE topic_id=${topicId}`;
    } catch (e) {
        console.log(e);
    }
    return [];
}

const getById = async (questionId) => {
    try {
        const result = await sql`SELECT * FROM questions WHERE id=${questionId}`;
        if (result && result.length === 1) {
            return result[0];
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}

const deleteById = async (id) => {
    try {
        await sql`DELETE FROM questions WHERE id=${id}`;
    } catch (e) {
        console.log(e);
    }
}

const getRandomQuestionByTopicId = async (topicId) => {
    try {
        const result = await sql`SELECT * FROM questions WHERE topic_id=${topicId} ORDER BY RANDOM() LIMIT 1`;
        if (result && result.length === 1) {
            return result[0];
        }
    } catch (e) {
        console.log(`Exception in getRandomQuestionByTopicId(): ${e}`);
    }
    return null;
}

const getRandomQuestion = async () => {
    try {
        const result = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
        if (result && result.length === 1) {
            return result[0];
        }
    } catch (e) {
        console.log(`Exception in getRandomQuestionByTopicId(): ${e}`);
    }
    return null;
}

const deleteByTopicId = async (topicId) => {
    try {
        await sql`DELETE FROM questions WHERE topic_id=${topicId}`;
    } catch (e) {
        console.log(`Exception in deleteByTopicId(): ${e}`);
    }
}

const getQuestionsCount = async () => {
    try {
        const result = await sql`SELECT COUNT(id) FROM questions`;
        if (result && result.length === 1) {
            return result[0].count;
        }
    } catch (e) {
        console.log(`Exception in getQuestionsCount(): ${e}`);
    }
    return 0;
}

export {
    add,
    getAllByTopicId,
    getById,
    deleteById,
    getRandomQuestionByTopicId,
    getRandomQuestion,
    deleteByTopicId,
    getQuestionsCount
}