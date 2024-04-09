import { expect, type Locator, type Page} from "@playwright/test";

export class ReferralManagerPage {
    readonly page: Page;
    readonly referralRow1: Locator;


    constructor(page: Page) {
        this.page = page;
        this.referralRow1 = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_rgReferralManager_ctl00__0 td");

    }

    async verifyApproved() {
        let status = "Approved"
        await expect(this.referralRow1.nth(9)).toContainText(status);
    }
}