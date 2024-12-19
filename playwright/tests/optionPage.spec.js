import {expect, test} from "@playwright/test";
import {addOption, addQuestion, addTopic, getRandomString} from "./utils/pageUtils.js";

test('Add checked option to question', async ({ page }) => {
    await page.goto('http://localhost:7777/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@mail.com');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    const topicName = getRandomString(5);
    await addTopic(page, topicName);
    await page.goto('http://localhost:7777/topics');
    await page.locator('.w3-sand').filter({hasText: topicName}).locator('button').first().click();
    const questionText = getRandomString(10);
    await addQuestion(page, questionText);
    await expect(page.locator('p').filter({ hasText: questionText })).toContainText(questionText);
    await page.getByRole('link', { name: 'Open' }).click();
    await expect(page.getByRole('button', {name: 'Delete question'})).toBeVisible();
    const optionText = getRandomString(7);
    await addOption(page, optionText, true);
    await expect(page.getByRole('row', { name: `${optionText} Delete` })).toBe;
    await expect(page.getByRole('row', { name: `${optionText} Delete` }).getByRole('checkbox')).toBeChecked();
    await expect(page.getByRole('button', {name: 'Delete question'})).not.toBe;
});

test('Add unchecked option to question', async ({ page }) => {
    await page.goto('http://localhost:7777/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@mail.com');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    const topicName = getRandomString(5);
    await addTopic(page, topicName);
    await page.goto('http://localhost:7777/topics');
    await page.locator('.w3-sand').filter({hasText: topicName}).locator('button').first().click();
    const questionText = getRandomString(10);
    await addQuestion(page, questionText);
    await expect(page.locator('p').filter({ hasText: questionText })).toContainText(questionText);
    await page.getByRole('link', { name: 'Open' }).click();
    await expect(page.getByRole('button', {name: 'Delete question'})).toBeVisible();

    const optionText = getRandomString(7);
    await addOption(page, optionText, false);
    await expect(page.getByRole('row', { name: `${optionText} Delete` })).toBe;
    await expect(page.getByRole('row', { name: `${optionText} Delete` }).getByRole('checkbox')).not.toBeChecked();
    await expect(page.getByRole('button', {name: 'Delete question'})).not.toBe;
});

test('Delete one of two options', async ({ page }) => {
    await page.goto('http://localhost:7777/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@mail.com');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    const topicName = getRandomString(6);
    await addTopic(page, topicName);
    await page.goto('http://localhost:7777/topics');
    await page.locator('.w3-sand').filter({hasText: topicName}).locator('button').first().click();
    const questionText = getRandomString(10);
    await addQuestion(page, questionText);
    await expect(page.locator('p').filter({ hasText: questionText })).toContainText(questionText);
    await page.getByRole('link', { name: 'Open' }).click();
    await expect(page.getByRole('button', {name: 'Delete question'})).toBeVisible();

    const optionText = getRandomString(7);
    await addOption(page, optionText, false);
    const optionText2 = getRandomString(9);
    await addOption(page, optionText2, false);

    await expect(page.getByRole('row', { name: `${optionText} Delete` })).toBe;
    await expect(page.getByRole('row', { name: `${optionText2} Delete` })).toBe;
    await expect(page.getByRole('row', { name: `${optionText} Delete` }).getByRole('checkbox')).not.toBeChecked();
    await page.getByRole('row', { name: `${optionText} Delete` }).getByRole('button').click();
    await expect(page.getByRole('row', { name: `${optionText} Delete` })).not.toBe;

});