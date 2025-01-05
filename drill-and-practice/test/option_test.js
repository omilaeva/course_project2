import {assertEquals, assertNotEquals} from "../deps.js";
import {generateString} from "./utils/testingUtils.js";
import * as optionManager from "../managers/optionManager.js";

Deno.test("Get empty option list", async () => {
    const options = await optionManager.getAllByQuestionId(1);
    assertEquals(options, []);
});

Deno.test("Add option", async() => {
    const text = generateString(100);
    const isCorrect = false;
    const questionId = 1;
    const [done, res] = await optionManager.add(questionId, text, isCorrect);
    assertEquals(done, true);
    assertNotEquals(res, -1);
    const result = await optionManager.getAllByQuestionId(questionId);
    let questionCount = 0;
    for (let i = 0; i < result.length; i++) {
        if (result[i].optionText === text && result[i].isCorrect === isCorrect) {
            questionCount++;
        }
    }
    assertEquals(questionCount, 1);
});

Deno.test("Delete option", async () => {
    const text = generateString(100);
    const isCorrect = false;
    const questionId = 1;
    const [done, res] = await optionManager.add(questionId, text, isCorrect);
    assertEquals(done, true);
    assertNotEquals(res, -1);
    let result = await optionManager.getAllByQuestionId(questionId);
    let optionId = 0;
    for (let i = 0; i < result.length; i++) {
        if (result[i].optionText === text && result[i].isCorrect === isCorrect) {
            optionId = result[i].id;
        }
    }
    assertNotEquals(optionId, 0);
    await optionManager.deleteById(optionId);
    result = await optionManager.getAllByQuestionId(questionId);
    let optionIsFound = false;
    for (let i = 0; i < result.length; i++) {
        if (result[i].optionText === text && result[i].isCorrect === isCorrect) {
            optionIsFound = true;
        }
    }
    assertEquals(optionIsFound, false);
});