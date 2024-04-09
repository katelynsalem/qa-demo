import { expect, type Locator, type Page} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameFld: Locator;
    readonly passwordFld: Locator;
    readonly loginBtn: Locator;
    readonly logoutBtn: Locator;
    readonly logoutHdr: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameFld = page.locator('#Username');
        this.passwordFld = page.locator('#Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.logoutBtn = page.locator("a[title='Logout']");
        this.logoutHdr = page.locator("//div[@class='page-header logged-out']");
    }

 // Fills   
    async enterLoginDetails(username: string, password: string) {
        await this.usernameFld.fill(username);
        await this.passwordFld.fill(password);
    }

 // Clicks   
    async logout() {
        await this.logoutBtn.click();
        await expect(this.logoutHdr).toContainText("You are now logged out");
    }


// Asserts
    async verifyLogin() {
        await this.loginBtn.click();
        await expect(this.logoutBtn).toBeVisible();
    }
}