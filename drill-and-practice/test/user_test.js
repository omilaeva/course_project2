import {generateString} from "./utils/testingUtils.js";
import {assertEquals, assertNotEquals} from "../deps.js";
import * as userManager from "../managers/userManager.js";

Deno.test("Register user with valid email and password", async() => {
    const userEmail = "test_user@mail.com";
    const password = generateString(10);
    const [done, errors] = await userManager.addUser(userEmail, password);
    assertEquals(done, true);
    assertEquals(errors.length, 0);
    const user = await userManager.findUserByEmail(userEmail);
    assertEquals(user.email, userEmail);
});

Deno.test("Register user with invalid email and valid password", async() => {
    const userEmail = generateString(10);
    const password = generateString(10);
    const [done, errors] = await userManager.addUser(userEmail, password);
    assertEquals(done, false);
    assertNotEquals(errors.length, 0);
    const user = await userManager.findUserByEmail(userEmail);
    assertEquals(user, null);
});

Deno.test("Register user with invalid email and password", async() => {
    const userEmail = generateString(10);
    const password = generateString(3);
    const [done, errors] = await userManager.addUser(userEmail, password);
    assertEquals(done, false);
    assertNotEquals(errors.length, 0);
    const user = await userManager.findUserByEmail(userEmail);
    assertEquals(user, null);
});

Deno.test("Register user with valid email and invalid password", async() => {
    const userEmail = "user@mail.com";
    const password = generateString(3);
    const [done, errors] = await userManager.addUser(userEmail, password);
    assertEquals(done, false);
    assertNotEquals(errors.length, 0);
    const user = await userManager.findUserByEmail(userEmail);
    assertEquals(user, null);
});

Deno.test("Register user existing email", async() => {
    const userEmail = "existing_user@mail.com";
    const password = generateString(10);
    let [done, errors] = await userManager.addUser(userEmail, password);
    assertEquals(done, true);
    assertEquals(errors.length, 0);
    const user = await userManager.findUserByEmail(userEmail);
    assertEquals(user.email, userEmail);

    [done, errors] = await userManager.addUser(userEmail, password);
    assertEquals(done, false);
    assertNotEquals(errors.length, 0);
});

