import { expect, type Locator, type Page} from "@playwright/test";

export class NotesDocuments {
    readonly page: Page;
    readonly internalNoteRow1: Locator;
    readonly popupCloseBtn: Locator;
    readonly notesNoteTypeCol: Locator;
    readonly notesNoteCol: Locator;
    readonly addDocBtn: Locator;
    readonly docReferralDdl: Locator;
    readonly docReferralLst: Locator;
    readonly docDescFld: Locator;
    readonly docDocTypeFld: Locator;
    readonly docFileSel: Locator;
    readonly docInsertBtn: Locator;
    readonly docRow1: Locator;
    readonly docFileCol: Locator;
    readonly docFileLnk: Locator;
    readonly docFileUploadSuccess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.internalNoteRow1 = page.frameLocator('iframe[name="RadWindow1"]').locator("#ctl00_ctl00_PageContent_PageContent_InternalNoteUC1_InternalNoteUC_RadGrid1_ctl00__0 td");
        this.notesNoteTypeCol = this.internalNoteRow1.nth(0);
        this.notesNoteCol = this.internalNoteRow1.nth(2);
        this.popupCloseBtn = page.locator('#RadWindowWrapper_RadWindow1').getByRole('link', { name: 'Close' });
        this.addDocBtn = page.frameLocator('iframe[name="RadWindow1"]').locator('#ctl00_ctl00_PageContent_PageContent_ReferralDocumentsUC1_DocumentsUC1_rgDocument_ctl00_ctl02_ctl00_AddNewRecordButton');
        this.docReferralDdl = page.frameLocator('iframe[name="RadWindow1"]').getByLabel('Referral#:');
        this.docReferralLst = page.frameLocator('iframe[name="RadWindow1"]').locator("select[name='ctl00$ctl00$PageContent$PageContent$ReferralDocumentsUC1$DocumentsUC1$rgDocument$ctl00$ctl02$ctl03$ddlReferral']");
        this.docDescFld = page.frameLocator('iframe[name="RadWindow1"]').getByLabel('Description:');
        this.docDocTypeFld = page.frameLocator('iframe[name="RadWindow1"]').getByText('select', { exact: true });
        this.docFileSel = page.frameLocator('iframe[name="RadWindow1"]').locator('#ctl00_ctl00_PageContent_PageContent_ReferralDocumentsUC1_DocumentsUC1_rgDocument_ctl00_ctl02_ctl03_fuDocumentfile0');
        this.docInsertBtn = page.frameLocator('iframe[name="RadWindow1"]').getByRole('button', { name: 'Insert' });
        this.docRow1 = page.frameLocator('iframe[name="RadWindow1"]').locator('#ctl00_ctl00_PageContent_PageContent_ReferralDocumentsUC1_DocumentsUC1_rgDocument_ctl00__0 td');
        this.docFileCol = this.docRow1.nth(3);
        this.docFileLnk = this.docFileCol.getByRole('link');
        this.docFileUploadSuccess = page.frameLocator('iframe[name="RadWindow1"]').locator("//span[@class='ruUploadProgress ruUploadSuccess']");
    }

    async verifyAutoEscNote() {
        await expect(this.notesNoteTypeCol).toContainText('Escalation');
        await expect(this.notesNoteCol).not.toBeEmpty();
    }

    async closePopup() {
        await this.popupCloseBtn.click();
    }

    async verifyAddNewDoc(filename:string) {
        await expect(this.docFileCol).toContainText(filename);
    }

    async addNewDocument(referralNumber:string, docNote:string, docType:string, filename:string) {
        await this.addDocBtn.click();
        await this.docReferralDdl.click();
        await this.docReferralLst.selectOption(referralNumber);
        await this.docDescFld.fill(docNote);
        await this.docDocTypeFld.click();
        await this.page.frameLocator('iframe[name="RadWindow1"]').getByText(docType).click();
        await this.docFileSel.click({force: true});
        await this.docFileSel.setInputFiles('./tests/fixtures/'+filename);
        await expect(this.docFileUploadSuccess).toBeVisible();
        await this.docInsertBtn.click();
    }

    async downloadDoc(fileName:string) {
        let errors = ['fail', 'cancel'];

        let downloadPromise = this.page.waitForEvent('download');
        // Click download button
        await this.docFileLnk.click();
        let download = await downloadPromise;
        await download.saveAs('downloads/' + download.suggestedFilename());
        // Expect no download errors
        expect(download.createReadStream()).not.toContain(errors);
        // Expect name to be file name
        expect(download.suggestedFilename()).toContain(fileName);
    }
}
