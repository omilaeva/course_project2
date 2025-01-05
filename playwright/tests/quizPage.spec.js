import { test, expect } from '@playwright/test';
import {addOption, addQuestion, addTopic, getRandomString, waitForServer} from "./utils/pageUtils.js";

test.beforeAll(async () => {
    await waitForServer();
});

test('Start quiz', async ({ page }) => {
    await page.goto('http://localhost:7777/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@mail.com');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    const topicName = getRandomString(5);
    await addTopic(page, topicName);
    await page.goto('http://localhost:7777/topics');
    await page.locator('.topic-card').filter({ hasText: topicName }).getByRole('link', {name: "Open"}).click();
    const questionText1 = getRandomString(10);
    await addQuestion(page, questionText1);
    await expect(page.locator('.question-card').filter({ hasText: questionText1 })).toContainText(questionText1);
    await page.getByRole('link', { name: 'Open' }).click();
    await expect(page.getByRole('button', {name: 'Delete question'})).toBeVisible();

    const optionText1 = getRandomString(7);
    await addOption(page, optionText1, false);
    const optionText2 = getRandomString(9);
    await addOption(page, optionText2, false);
    const optionText3 = getRandomString(4);
    await addOption(page, optionText3, true);

    await page.goto('http://localhost:7777/quiz');
    await expect(page.locator('.col-sm-4').filter({hasText: topicName})).toBe;
    await page.locator('.col-sm-4').filter({hasText: topicName}).getByRole('link').click();
    await expect(page.locator('.card-title')).toHaveText(questionText1);
    await expect(page.locator('td').filter({hasText: optionText1})).toBe;
    await expect(page.locator('td').filter({hasText: optionText2})).toBe;
    await expect(page.locator('td').filter({hasText: optionText3})).toBe;
});


test('Choose the wrong answer', async ({ page }) => {
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
    const questionText1 = getRandomString(10);
    await addQuestion(page, questionText1);
    await expect(page.locator('.question-card').filter({ hasText: questionText1 })).toContainText(questionText1);
    await page.getByRole('link', { name: 'Open' }).click();
    await expect(page.getByRole('button', {name: 'Delete question'})).toBeVisible();

    const wrongOption1 = getRandomString(7);
    await addOption(page, wrongOption1, false);
    const wrongOption2 = getRandomString(9);
    await addOption(page, wrongOption2, false);
    const correctOption = getRandomString(4);
    await addOption(page, correctOption, true);

    await page.goto('http://localhost:7777/quiz');
    await expect(page.locator('.col-sm-4').filter({hasText: topicName})).toBe;
    await page.locator('.col-sm-4').filter({hasText: topicName}).getByRole('link').click();
    await expect(page.locator('.card-title')).toHaveText(questionText1);
    await expect(page.locator('td').filter({hasText: wrongOption1})).toBe;
    await expect(page.locator('td').filter({hasText: wrongOption2})).toBe;
    await expect(page.locator('td').filter({hasText: correctOption})).toBe;
    await page.getByRole('row', { name: `${wrongOption1} Choose` }).getByRole('button').click();
    await expect(page.getByText('Incorrect!')).toBe;
    await expect(page.getByText(`The correct option was: ${correctOption}`)).toBe;
    await expect(page.getByRole('link', { name: 'Next question' })).toBe;
});

test('Choose the correct answer', async ({ page }) => {
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
    const questionText1 = getRandomString(10);
    await addQuestion(page, questionText1);
    await expect(page.locator('.question-card').filter({ hasText: questionText1 })).toContainText(questionText1);
    await page.getByRole('link', { name: 'Open' }).click();
    await expect(page.getByRole('button', {name: 'Delete question'})).toBeVisible();

    const wrongOption1 = getRandomString(7);
    await addOption(page, wrongOption1, false);
    const wrongOption2 = getRandomString(9);
    await addOption(page, wrongOption2, false);
    const correctOption = getRandomString(4);
    await addOption(page, correctOption, true);

    await page.goto('http://localhost:7777/quiz');
    await expect(page.locator('.col-sm-4').filter({hasText: topicName})).toBe;
    await page.locator('.col-sm-4').filter({hasText: topicName}).getByRole('link').click();
    await expect(page.locator('.card-title')).toHaveText(questionText1);
    await expect(page.locator('td').filter({hasText: wrongOption1})).toBe;
    await expect(page.locator('td').filter({hasText: wrongOption2})).toBe;
    await expect(page.locator('td').filter({hasText: correctOption})).toBe;
    await page.getByRole('row', { name: `${correctOption} Choose` }).getByRole('button').click();
    await expect(page.getByText('Correct!')).toBe;
    await expect(page.getByRole('link', { name: 'Next question' })).toBe;
});

test('Empty quiz, if no question with options', async ({ page }) => {
    await page.goto('http://localhost:7777/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@mail.com');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    const topicName = getRandomString(5);
    await addTopic(page, topicName);
    await page.goto('http://localhost:7777/topics');
    await page.locator('.topic-card').filter({ hasText: topicName }).getByRole('link', {name: "Open"}).click();
    const questionText1 = getRandomString(10);
    await addQuestion(page, questionText1);
    await expect(page.locator('.question-card').filter({ hasText: questionText1 })).toContainText(questionText1);
    await page.getByRole('link', { name: 'Open' }).click();
    await expect(page.getByRole('button', {name: 'Delete question'})).toBeVisible();

    await page.goto('http://localhost:7777/quiz');
    await expect(page.locator('.col-sm-4').filter({hasText: topicName})).not.toBe;
});