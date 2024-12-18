import {validateTextLength} from "../utils/topicValidation.js";
import {assertEquals} from "../deps.js"

Deno.test("Empty topic name", async () => {
    const [passes, errors] = validateTextLength(["name", ""]);
    assertEquals(false, passes);
});

Deno.test("Name is null", async () => {
    const [passes, errors] = validateTextLength(["null", null], 5);
    assertEquals(false, passes);
});

Deno.test("Text is contains whitespaces only", async () => {
    const [passes, errors] = validateTextLength(["null", "              "], 5);
    assertEquals(false, passes);
});