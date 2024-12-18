import {test, expect} from '@playwright/test';
import {getRandomString} from "./utils/pageUtils.js";

test('Register new user', async ({page}) => {
    await page.goto('http://localhost:7777/');
    await page.getByRole('link', {name: 'HOME'}).click();
    await page.getByRole('link', {name: 'Register'}).click();
    await page.getByLabel('Email').click();
    const userEmail = getRandomString(10).concat("@mail.com");
    const password = getRandomString(12);
    await page.getByLabel('Email').fill(userEmail);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', {name: 'Register'}).click();
    await expect(page.getByRole('heading', { name: 'Login form' })).toBe;
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(userEmail);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Topics' })).toBe;
});

test('Logout', async ({page}) => {
    await page.goto('http://localhost:7777/');
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@mail.com');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Topics' })).toBe;
    await expect(page.getByText('admin@mail.com')).toBe;
    await expect(page.getByRole('link', { name: 'Log out' })).toBe;
    await page.getByRole('button', { name: /USER.*/i }).click();
    await page.locator('.w3-dropdown-hover > .w3-dropdown-content > a').click();
    await expect(page.getByRole('link', { name: 'Register' })).toBe;
    await expect(page.getByRole('link', { name: 'Log In' })).toBe;
});