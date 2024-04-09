import { expect, type Locator, type Page} from "@playwright/test";

export class ReferralPage {
    readonly page: Page;
    readonly runProtoBtn: Locator;
    readonly txrequestRow1: Locator;
    readonly claimLnk: Locator;
    readonly iframeCompStatusDdl: Locator;
    readonly completeBtn: Locator;
    readonly hamburger1: Locator;
    readonly notesOption: Locator;
    readonly internalNoteRow1: Locator;
    readonly popupCloseBtn: Locator;
    readonly detDdl1: Locator;
    readonly determinationCol: Locator;
    readonly vendorCol: Locator;
    readonly assignedToCol: Locator;
    readonly prevTxrequestRow1: Locator;
    readonly prevTxRefCol: Locator;
    readonly referralLnk: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.runProtoBtn = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_btnRunProtocols");
        this.txrequestRow1 = page.locator("//tr[@id='ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_TxRequestListUC_Current_rgProcedureTxRequest_ctl00__0']/td");
        this.determinationCol = this.txrequestRow1.nth(4);
        this.vendorCol = this.txrequestRow1.nth(7);
        this.assignedToCol = this.txrequestRow1.nth(5);
        this.claimLnk = page.locator("#PageContent_PageContent_PageContent_ClaimHeaderUC_hlClaim");
        this.iframeCompStatusDdl = page.frameLocator('iframe[name="RadWindow1"]').locator('#ctl00_ctl00_PageContent_PageContent_ClamManagementUC_radClaimCompensibilityStatus_Input');
        this.completeBtn = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_btnDetermination");
        this.hamburger1 = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_TxRequestListUC_Current_rgProcedureTxRequest_ctl00_ctl04_rmContextMenu");
        this.notesOption = page.locator("//a[contains(text(),'Notes & Documents')]");
        this.internalNoteRow1 = page.frameLocator('iframe[name="RadWindow1"]').locator("#ctl00_ctl00_PageContent_PageContent_InternalNoteUC1_InternalNoteUC_RadGrid1_ctl00__0 td");
        this.popupCloseBtn = page.locator('#RadWindowWrapper_RadWindow1').getByRole('link', { name: 'Close' });
        this.detDdl1 = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_TxRequestListUC_Current_rgProcedureTxRequest_ctl00_ctl04_rblDetermination");
        this.prevTxrequestRow1 = page.locator("//tr[@id='ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_TxRequestListUC_Previous_rgProcedureTxRequest_ctl00__0']/td");
        this.prevTxRefCol = this.prevTxrequestRow1.nth(0);
        this.referralLnk = page.locator("#PageContent_PageContent_PageContent_ClaimHeaderUC_hlReferral");
    }



    async workaroundSelectCompStatusAgain(status:string) {
        await this.claimLnk.click();
        await this.iframeCompStatusDdl.click();
        await this.page.frameLocator('iframe[name="RadWindow1"]').getByText(status, {exact: true}).click();
        await this.page.frameLocator('iframe[name="RadWindow1"]').getByRole('button', { name: 'Update' }).click();
        await this.page.getByRole('link', { name: 'Close' }).click();
    } 

    

    async clickRunProtocols() {
        await this.runProtoBtn.click();
    }

    async verifyCertified() {
        //currently looks at the first TxRequest only
        await expect(this.determinationCol).toContainText('Certified');
    }
    
    async clickComplete() {
        await this.completeBtn.click();
    }

    async verifyVendorAssign(vendorName:string) {
        await expect(this.vendorCol).toContainText(vendorName);
    }

    async verifyVendorEmpty() {
        await expect(this.vendorCol).toBeEmpty();
    }

    async verifyEscalated() {
        await expect(this.determinationCol).toContainText('Escalated');
    }

    async verifyNoncertifed() {
        await expect(this.determinationCol).toContainText('Not Certified');
    }

    async clickHamburger() {
        await this.hamburger1.click();
    }

    async verifyNewNoteAlert() {
        await this.clickHamburger();
        await expect(this.notesOption).toHaveAttribute('style', 'background-color:yellow;');
    }

    async clickNotesDocs() {
        await this.notesOption.click();
    }

    async verifyAutoEscNote() {
        await expect(this.internalNoteRow1.nth(1)).toContainText('Escalation');
        await expect(this.internalNoteRow1.nth(3)).not.toBeEmpty();
    }

    async closePopup() {
        await this.popupCloseBtn.click();
    }

    async selectDetermination(determination: string) {
        await this.detDdl1.click();
        await this.page.locator("(//li[text()='"+ determination +"'])[1]").click();
    }

    async verifyAssignedTo(name:string) {
        console.log(name);
        await expect(this.assignedToCol).toContainText(name);
    }

    async clickPrevReferral() {
        await this.prevTxRefCol.getByRole('link').click();
    }

    async getReferralNumber() {
        let referralNumber:string;
        referralNumber = (await this.referralLnk.textContent()).trim();
        console.log("Referral# "+referralNumber+" has been created.");
        return referralNumber;

    }

}