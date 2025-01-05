import {sql} from "../database/database.js"

const getAllByQuestionId = async (questionId) => {
    try {
        return await sql`SELECT * FROM question_answer_options WHERE question_id=${questionId}`;
    } catch (e) {
        console.log(e);
    }
    return [];
}

const add = async (questionId, optionText, isCorrect) => {
    try {
        const result = await sql`INSERT INTO question_answer_options(question_id, option_text, is_correct) 
            VALUES (${questionId}, ${optionText}, ${isCorrect}) RETURNING id`;
        return result[0].id;
    } catch (e) {
        console.log(e);
    }
    return -1;
}

const deleteById = async (id) => {
    try {
        await sql`DELETE FROM question_answer_options WHERE id=${id}`;
    } catch (e) {
        console.log(e);
    }
}

const getCorrectAnswerByQuestionId = async (questionId) => {
    try {
        const result = await sql`SELECT * FROM question_answer_options WHERE question_id=${questionId} AND is_correct=TRUE`;
        if (result && result.length !== 0) {
            return result[0];
        }
    } catch (e) {
        console.log(`Exception in getCorrectAnswerByQuestionId(): ${e}`);
    }
    return null;
}

const deleteOptionsByQuestionId = async (questionId) => {
    try {
        await sql`DELETE FROM question_answer_options WHERE question_id=${questionId}`;
    } catch (e) {
        console.log(`Exception in deleteOptionsByQuestionId(): ${e}`);
    }
}

export {getAllByQuestionId, add, deleteById, getCorrectAnswerByQuestionId, deleteOptionsByQuestionId}