import {sql} from "../database/database.js";

const saveAnswer = async (userId, questionId, optionId) => {
    try {
        await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) 
                VALUES(${userId}, ${questionId}, ${optionId})`;
    } catch (e) {
        console.log(`Exception in saveAnswer(): ${e}`);
    }
}

const deleteAnswersByOptionId = async (optionId) => {
    try {
        await sql`DELETE FROM question_answers WHERE question_answer_option_id=${optionId}`;
    } catch (e) {
        console.log(`Exception in deleteAnswersByOptionId(): ${e}`);
    }
}

const getAnswersCount = async () => {
    try {
        const result = await sql`SELECT COUNT(id) FROM question_answers`;
        if (result && result.length === 1) {
            return result[0].count;
        }
    } catch (e) {
        console.log(`Exception in getAnswersCount(): ${e}`);
    }
    return 0;
}

export {saveAnswer, deleteAnswersByOptionId, getAnswersCount};