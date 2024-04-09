import { expect, type Locator, type Page} from "@playwright/test";

export class DocLetterPage {
    readonly page: Page;
    readonly letterRow1: Locator;
    readonly viewLink1: Locator;
    readonly txrequestLnk: Locator;

    constructor(page: Page) {
        this.page = page;
        this.letterRow1 = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClaimDocumentsUC1_DeterminationLettersUC1_rgDetLetters_ctl00__0 td");
        this.viewLink1 = page.locator("//a[contains(text(),'View Letter')][1]");
        this.txrequestLnk = page.locator("//li[@class='rtsLI rtsFirst']");
    }

    async verifyFileName(fileName:string) {
        await expect(this.letterRow1.nth(1)).toHaveText(fileName);
    }

    async downloadDoc(fileName:string) {
        let errors = ['fail', 'cancel'];
        await this.verifyFileName(fileName);
        
        let downloadPromise = this.page.waitForEvent('download');
        // Click download button
        await this.viewLink1.click();
        let download = await downloadPromise;
        await download.saveAs('downloads/'+download.suggestedFilename());
        // Expect no download errors
        expect(download.createReadStream()).not.toContain(errors);
        // Expect name to be file name
        expect(download.suggestedFilename()).toContain(fileName);
    }

    async clickTxRequestTab() {
        await this.txrequestLnk.click();
    }

}