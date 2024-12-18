import * as topicManager from "../managers/topicManager.js";
import {assertEquals, assertNotEquals} from "../deps.js";
import {generateString} from "./utils/testingUtils.js";
import * as questionManager from "../managers/questionManager.js";

Deno.test("Get not existing question", async () => {
    const topic = await questionManager.getById(0);
    assertEquals(topic, null);
});

Deno.test("Get question list of non-existing topic", async() => {
    const questionList = await questionManager.getAllByTopicId(1);
    assertEquals(questionList, []);
});

Deno.test("Add question", async() => {
    const name = generateString(10);
    const userId = 1;
    const topicId = Math.random() % 100;
    const [done, errors] = await questionManager.add(userId, topicId, name);
    assertEquals(done, true);
    assertEquals(errors.length, 0);
    const result = await questionManager.getAllByTopicId(topicId);
    let questionCount = 0;
    for (let i = 0; i < result.length; i++) {
        if (result[i].name === name && result[i].userId === userId) {
            questionCount++;
        }
    }
    assertEquals(questionCount, 1);
});

Deno.test("Delete existing question", async () => {
    const name = generateString(10);
    const userId = 1;
    const topicId = Math.random() % 100;
    let [done, errors] = await questionManager.add(userId, topicId, name);
    assertEquals(done, true);
    assertEquals(errors.length, 0);
    const result = await questionManager.getAllByTopicId(topicId);
    let questionId = 0;
    for (let i = 0; i < result.length; i++) {
        if (result[i].name === name && result[i].userId === userId) {
            questionId = result[i].id;
        }
    }
    [done, errors] = await questionManager.deleteById(questionId);
    assertEquals(done, true);
    assertEquals(errors.length, 0);
});

Deno.test("Delete non-existing question", async () => {
    const [done, errors] = await questionManager.deleteById(0);
    assertEquals(done, false);
    assertNotEquals(errors.length, 0);
});