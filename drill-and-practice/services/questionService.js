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
        const result = await sql`SELECT id FROM (SELECT distinct(questions.id) FROM questions 
            INNER JOIN question_answer_options ON question_answer_options.question_id=questions.id 
            AND questions.topic_id=${topicId}) as s ORDER BY RANDOM() LIMIT 1`;
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
        console.log(`Exception in getRandomQuestion(): ${e}`);
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

const getByIdForQuiz = async (id) => {
    try {
        const result = await sql`SELECT DISTINCT(questions.id), questions.question_text, questions.topic_id FROM questions 
            INNER JOIN question_answer_options ON question_answer_options.question_id=questions.id 
            AND questions.id=${id}`;
        if (result && result.length === 1) {
            return result[0];
        }
    } catch (e) {
        console.log(`Exception in getByIdForQuiz(): ${e}`);
    }
    return null;
}

export {
    add,
    getAllByTopicId,
    getById,
    deleteById,
    getRandomQuestionByTopicId,
    getRandomQuestion,
    deleteByTopicId,
    getQuestionsCount,
    getByIdForQuiz,
}