import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '@pages/Login.page';

let username = process.env.USERNAME;
let password = process.env.PASSWORD;

test('Login with valid credentials', async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);
    await page.goto(baseURL);
    await loginPage.enterLoginDetails(username, password);
    await loginPage.verifyLogin();
});