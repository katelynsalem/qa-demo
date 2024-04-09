import { test, expect, type Locator, type Page } from '@playwright/test';

export class CommonSteps {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Search MedAuth search bar for a claim number
    async  searchClaim(claimNumber:string) {
        await test.step('Search for claim: ${claimNumber}', async () => {
            await this.page.locator('#txtSearch').fill(claimNumber);
            await this.page.locator('.nav-search-submit-text').click();
            await this.page.frameLocator('iframe[title="Search"]').getByRole('button', { name: 'Add/View Requests' }).click();
        });
    }
    
    // Documents/Letters tab - Search table for the document name(tableValue) and today's date/upload date(docDate)
    async searchTable(tableValue:string, docDate:string) {
        await test.step('Search table for document: ${tableValue} uploaded on: ${docDate}', async () => {
            const rowCount = await this.page.locator("//table[@id='ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClaimDocumentsUC1_DocumentsUC1_rgDocument_ctl00']/tbody[1]/tr").count();
            for ( let i = 1; i < (rowCount + 1); i++ ) {
                // Locator for each column
                let docNameList = this.page.locator("//table[@id='ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClaimDocumentsUC1_DocumentsUC1_rgDocument_ctl00']/tbody[1]/tr["+i+"]/td[2]");
                let docDateList = this.page.locator("//table[@id='ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClaimDocumentsUC1_DocumentsUC1_rgDocument_ctl00']/tbody[1]/tr["+i+"]/td[6]")
                //let cellContent = this.page.locator("//table[@id='ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClaimDocumentsUC1_DocumentsUC1_rgDocument_ctl00']/tbody[1]/tr["+i+"]/td[2]").innerText();
                //if ( cellContent === tableValue) {
                if (docNameList.filter({ hasText: tableValue})) {
                    // Expect the date in that row to be docDate
                    await expect(docDateList).toContainText(docDate);
                    // Document name found
                    return 1;
                } else {
                    // Document name not found
                    return 0;
                }
            }
        });
    }

    // Download file and verify name and no errors
    async verifyDownload(downloadName:string, locator:Locator) {

        await test.step('Verify download name is similar and there are no errors', async () => {
            let errors = ['fail', 'cancel'];

            // Wait for download action
            let downloadPromise = this.page.waitForEvent('download');
            // Click download button
            await locator.click();
            let download = await downloadPromise;
            await download.saveAs(download.suggestedFilename());
            // Expect no download errors
            expect(download.createReadStream()).not.toContain(errors);
            // Expect name to be file name
            expect(download.suggestedFilename()).toContain(downloadName);

        });
    }

    // Receive SPRINT number from command call if there is one
    // Create a claim number based on the sprint number or random claim number
    createClaimNumber(sprintNumber:string) {

        let claimNumber:string;

        if (sprintNumber === 'undefined') {
            claimNumber = ("test"+(Math.floor(Math.random() * 9999)));
            return claimNumber;
        } else {
            claimNumber = ("QATEST" + process.env.SPRINT + "runID" + (Math.floor(Math.random() * 9999)));
            return claimNumber;
        }
        
    }

    // Create claim ending in 1 for vendor assignment clarity
    createEmployersClaimNumber() {

        let claimNumber:string;

        claimNumber = ("QATESTNone" + (Math.floor(Math.random() * 9999)) + "1");
            return claimNumber;
        
    }

    // Get today's date to check against documents and letters
    getTodayDate() {
        
        // Get date of upload
        let todayDate = new Date(Date.now());
        const todayMonth = (todayDate.getMonth() + 1);
        const todayDay = todayDate.getDate();
        const todayYear = todayDate.getFullYear();
        const mdyDate = (todayMonth + "/" + todayDay + "/" + todayYear);

        return mdyDate;
      
    }

    getTodayLongDate() {
        let currentDate = new Date();
        const longDate = new Date().toLocaleDateString('en-us', {weekday:'long', year:'numeric', month:'long', day:'2-digit'});

        return longDate;
    }
}
