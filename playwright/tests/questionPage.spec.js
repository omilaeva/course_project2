// import {expect, test} from "@playwright/test";
// import {addQuestion, addTopic, getRandomString, waitForServer} from "./utils/pageUtils.js";
//
// test.beforeAll(async () => {
//     await waitForServer();
// });
//
// test('Add question to the topic', async ({ page }) => {
//     await page.goto('http://localhost:7777/', { waitUntil: 'load' });
//     await page.getByRole('link', { name: 'Log In' }).click();
//     await page.getByLabel('Email').click();
//     await page.getByLabel('Email').fill('admin@mail.com');
//     await page.getByLabel('Email').press('Tab');
//     await page.getByLabel('Password').fill('1234');
//     await page.getByRole('button', { name: 'Login' }).click();
//     const topicName = getRandomString(5);
//     await addTopic(page, topicName);
//     await page.goto('http://localhost:7777/topics');
//     await page.locator('.w3-sand').filter({hasText: topicName}).locator('button').first().click();
//     const questionText = getRandomString(10);
//     await addQuestion(page, questionText);
//     await expect(page.locator('p').filter({ hasText: questionText })).toBe;
// });
//
// test('View question without options', async ({ page }) => {
//     await page.goto('http://localhost:7777/', { waitUntil: 'load' });
//     await page.getByRole('link', { name: 'Log In' }).click();
//     await page.getByLabel('Email').click();
//     await page.getByLabel('Email').fill('admin@mail.com');
//     await page.getByLabel('Email').press('Tab');
//     await page.getByLabel('Password').fill('1234');
//     await page.getByRole('button', { name: 'Login' }).click();
//     const topicName = getRandomString(5);
//     await addTopic(page, topicName);
//     await page.goto('http://localhost:7777/topics');
//     await page.locator('.w3-sand').filter({hasText: topicName}).locator('button').first().click();
//     const questionText = getRandomString(10);
//     await addQuestion(page, questionText);
//     await expect(page.locator('p').filter({ hasText: questionText })).toBe;
//
//     await page.getByRole('link', { name: 'Open' }).click();
//     await expect(page.getByRole('heading', { name: questionText })).toBe;
//     await expect(page.getByRole('button', {name: 'Delete question'})).toBeVisible();
//
//     await expect(page.locator('.w3-table')).not.toBe;
// });
