import { test, expect } from '@playwright/test';
import {addTopic, getRandomString, waitForServer} from "./utils/pageUtils.js";

test.beforeAll(async () => {
    await waitForServer();
});

test('Add topic', async ({ page }) => {
    await page.goto('http://localhost:7777/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@mail.com');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    const topicName = getRandomString(5);
    await addTopic(page, topicName);
    await expect(page.locator('.w3-sand').filter({hasText: topicName})).toBe;
});

test('Go to the empty topic page', async ({ page }) => {
    await page.goto('http://localhost:7777/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@mail.com');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    const topicName = getRandomString(5);
    await addTopic(page, topicName);
    await expect(page.locator('div').filter({ hasText: topicName })).toBe;
    await page.locator('div').filter({ hasText: topicName }).locator('button').first().click();
    await expect(page.locator('.question')).toHaveCount(0);
});
