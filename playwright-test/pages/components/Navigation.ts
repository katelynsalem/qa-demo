import { expect, type Locator, type Page} from "@playwright/test";

export class Navigation {
    readonly page: Page;
    readonly medAuth: Locator;
    readonly claimManageOpt: Locator;
    readonly createNewClaimOpt: Locator;
    readonly searchFld: Locator;
    readonly searchBtn: Locator;
    readonly addViewBtn: Locator;
    readonly refManager: Locator;
    readonly orderBtn: Locator;
    readonly expReferral: Locator;

    constructor(page: Page) {
        this.page = page;
        this.medAuth = page.locator("a[title='MedAuth']");
        this.claimManageOpt = page.locator("span[title='Claim Management']");
        this.createNewClaimOpt = page.locator("span[title='Create New Claim']");
        this.searchFld = page.locator('#txtSearch');
        this.searchBtn = page.locator('.nav-search-submit-text');
        this.addViewBtn = page.frameLocator('iframe[title="Search"]').getByRole('button', { name: 'Add/View Requests' });
        this.refManager = page.locator("a[title='Referral Manager']");
        this.orderBtn = page.frameLocator('iframe[title="Search"]').getByRole('button', { name: 'Orders' });
        this.expReferral = page.locator("a[title='Express Referral']");

    }
// Navigate to create new claim page
    async selectCreateNewClaim() {
        await this.medAuth.hover();
        await this.claimManageOpt.hover();
        await this.createNewClaimOpt.click();
    }

    async searchClaim(claimNumber: string) {
        await this.searchFld.fill(claimNumber);
        await this.searchBtn.click();
        await this.addViewBtn.click();
    }

    async clickReferralManager() {
        await this.refManager.click();
    }

    async searchReferralManager(claimNumber: string) {
        await this.clickReferralManager();
        await this.searchFld.fill(claimNumber);
        await this.searchBtn.click();
        await this.orderBtn.click();
    }

    async clickExpReferral() {
        await this.expReferral.click();
    }

    async searchExpReferral(claimNumber: string){
        await this.clickExpReferral();
        await this.searchFld.fill(claimNumber);
        await this.searchBtn.click();
        await this.orderBtn.click();
    }
}