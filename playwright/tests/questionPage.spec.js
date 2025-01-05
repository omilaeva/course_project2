import {expect, test} from "@playwright/test";
import {addQuestion, addTopic, getRandomString, waitForServer} from "./utils/pageUtils.js";

test.beforeAll(async () => {
    await waitForServer();
});

test('Add question to the topic', async ({ page }) => {
    await page.goto('http://localhost:7777/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@mail.com');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    const topicName = getRandomString(5);
    await addTopic(page, topicName);
    await page.goto('http://localhost:7777/topics');
    await page.locator('.topic-card').filter({ hasText: topicName }).getByRole('link', {name: "Open"}).click();

    const questionText = getRandomString(10);
    await addQuestion(page, questionText);
    await expect(page.locator('.question-card').filter({ hasText: questionText })).toContainText(questionText);
    await expect(page.getByRole('link', { name: 'Open' })).toBeVisible();
});

test('View question without options', async ({ page }) => {
    await page.goto('http://localhost:7777/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@mail.com');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    const topicName = getRandomString(5);
    await addTopic(page, topicName);
    await page.goto('http://localhost:7777/topics');
    await page.locator('.topic-card').filter({ hasText: topicName }).getByRole('link', {name: "Open"}).click();

    const questionText = getRandomString(10);
    await addQuestion(page, questionText);
    await expect(page.locator('.question-card').filter({ hasText: questionText })).toContainText(questionText);

    await page.getByRole('link', { name: 'Open' }).click();
    await expect(page.locator('.card-title')).toContainText(questionText);
    await expect(page.getByRole('button', {name: 'Delete question'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Add option'})).toBeVisible();
});
