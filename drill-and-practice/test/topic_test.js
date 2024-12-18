import * as topicManager from "../managers/topicManager.js";
import {assertEquals, assertNotEquals} from "../deps.js";
import {generateString} from "./utils/testingUtils.js";

Deno.test("Get not existing topic", async () => {
    const topic = await topicManager.getTopicById(0);
    assertEquals(topic, null);
});

Deno.test("Get empty topics list", async() => {
    const topicList = await topicManager.getAllTopics();
    assertEquals(topicList, []);
});

Deno.test("Add topic", async() => {
    const name = generateString(10);
    const userId = 1;
    const [done, errors] = await topicManager.addTopic(userId, name);
    assertEquals(done, true);
    assertEquals(errors.length, 0);
    const result = await topicManager.getAllTopics();
    let topicsCount = 0;
    for (let i = 0; i < result.length; i++) {
        if (result[i].name === name && result[i].userId === userId) {
            topicsCount++;
        }
    }
    assertEquals(topicsCount, 1);
});

Deno.test("Delete existing topic", async () => {
    const name = generateString(10);
    const userId = 1;
    let [done, errors] = await topicManager.addTopic(userId, name);
    assertEquals(done, true);
    assertEquals(errors.length, 0);
    const result = await topicManager.getAllTopics();
    let topicId = 0;
    for (let i = 0; i < result.length; i++) {
        if (result[i].name === name && result[i].userId === userId) {
            topicId = result[i].id;
        }
    }
    [done, errors] = await topicManager.deleteTopicById(topicId);
    assertEquals(done, true);
    assertEquals(errors.length, 0);
});

Deno.test("Delete non-existing topic", async () => {
    const [done, errors] = await topicManager.deleteTopicById(0);
    assertEquals(done, false);
    assertNotEquals(errors.length, 0);
});