import { expect, type Locator, type Page} from "@playwright/test";
import { TxRequestPage } from "./TxRequest.page";

export class DeterminationsPage {
    readonly page: Page;
    readonly certMadeByDdl: Locator;
    readonly certMadeByLst: Locator;
    readonly nextBtn: Locator;
    readonly vendorOpt: Locator;
    readonly mailFaxCCDiv: Locator;
    readonly emailCCDiv: Locator;
    readonly addEmailCCDiv: Locator;
    readonly certifiedHdr: Locator;
    readonly finishBtn: Locator;
    readonly letterQueueLbl: Locator;
    readonly noncertHdr: Locator;
    readonly noncertReasons: Locator;
    readonly noncertMadeByDdl: Locator;
    readonly noncertMadeByLst: Locator;
    readonly vendorRefMsg: Locator;
    readonly escalatedHdr: Locator;
    readonly escMadeByDdl: Locator;
    readonly escMadeByLst: Locator;
    readonly escNoteFld: Locator;
    readonly vendorServiceDdl: Locator;
    readonly genLetterNoChk: Locator;
    readonly procNoVendorChk: Locator;
    readonly vendorNoVendor: Locator;
    readonly rejReasonSel: Locator;
    readonly rejReasonTbl: Locator;
    readonly serviceNoteFld: Locator;
    readonly rejNoteFld: Locator;
    readonly rejNextStepTbl: Locator;
    readonly genLettersTbl: Locator;
    readonly faxLettersTbl: Locator;
    readonly rejNextBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.certMadeByDdl = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_ddlDeterminationMadeBy1_Input");
        this.certMadeByLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_ddlDeterminationMadeBy1_DropDown ul li");
        this.nextBtn = page.locator("input[name='ctl00$ctl00$ctl00$PageContent$PageContent$PageContent$DeterminationsUC1$wzDetermination$StepNavigationTemplateContainerID$StepNextButton']");
        this.vendorOpt = page.locator("//select[@id='PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_dlTxRequestVendor_ddlVendor_0']//option[@selected='selected']");
        this.vendorNoVendor = page.locator("//select[@id='PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_dlTxRequestVendor_ddlVendor_0']//option");
        this.mailFaxCCDiv = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_pnlAdditionalLetterCCs");
        this.emailCCDiv = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_pnlEmailLetterCCs");
        this.addEmailCCDiv = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_pnlEMailLetterCCsAdditional");
        this.certifiedHdr = page.locator("//table[@id='PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_rpt1']//thead[1]");
        this.finishBtn = page.locator("input[name='ctl00$ctl00$ctl00$PageContent$PageContent$PageContent$DeterminationsUC1$wzDetermination$FinishNavigationTemplateContainerID$Button1']");
        this.letterQueueLbl = page.locator("(//h2[@class='DDSubHeader'])[2]");
        this.noncertHdr = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_rpt3");
        this.noncertReasons = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_rpt3_pnlNonCertReason_0");
        this.noncertMadeByDdl = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_ddlDeterminationMadeBy3_Input");
        this.noncertMadeByLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_ddlDeterminationMadeBy3_DropDown ul li");
        this.vendorRefMsg = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_lblVendorReferralMessage");
        this.escalatedHdr = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_rpt2");
        this.escMadeByDdl = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_ddlAssignTo");
        this.escMadeByLst = page.locator("select[name='ctl00$ctl00$ctl00$PageContent$PageContent$PageContent$DeterminationsUC1$wzDetermination$ddlAssignTo']");
        this.escNoteFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_txtDeterminationNote_Escalate");
        this.vendorServiceDdl = page.locator("//select[@id='PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_dlTxRequestVendor_ddlVST_0']//option[@selected='selected']");
        this.genLetterNoChk = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_rblGenerateLetters_1");
        this.procNoVendorChk = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_dlTxRequestVendor_chkConfirmNoVendor_0");
        this.rejReasonSel = page.locator("//select[@id='PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlRejectReason']");
        this.rejReasonTbl = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_cblRejectSubReasons td");
        this.serviceNoteFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_txtServiceNote");
        this.rejNoteFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_txtRejectionNote");
        this.rejNextStepTbl = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_rblNextSteps td");
        this.genLettersTbl = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_rblGenerateLetters td");
        this.faxLettersTbl = page.locator("#PageContent_PageContent_PageContent_DeterminationsUC1_wzDetermination_rblGenerateFaxDeterminationLetter td");
        this.rejNextBtn = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_StepNavigationTemplateContainerID_StepNextButton");
    }

    async selectCertMadeBy() {
        let madeByName = 'Katelyn Examiner';
        await this.certMadeByDdl.click();
        await this.certMadeByLst.getByText(madeByName).click({force: true}); //Doesn't always click the right one
    }

    async certifiedDeterminationPage() {
        await expect(this.certifiedHdr).toContainText('certified');
        await this.selectCertMadeBy();
    }

    async clickNext() {
        await this.nextBtn.click();
    }

    async clickNextRej() {
        await this.rejNextBtn.click();
    }

    async getSelectedVendor(){
        let selectedVendor:string;
        selectedVendor = await this.vendorOpt.textContent();
        return selectedVendor;
    }

    async verifyVendorNotEmpty(){
        await expect(this.vendorOpt).not.toBeEmpty();
    }

    async verifyVendorDefault(defaultVendor:string) {
        await expect(this.vendorOpt).toHaveText(defaultVendor);
    }

    async verifyCCNotVisible() {
        await expect(this.mailFaxCCDiv).not.toBeVisible();
        await expect(this.emailCCDiv).not.toBeVisible();
        await expect(this.addEmailCCDiv).not.toBeVisible();
    }

    async clickFinish(){
        await this.finishBtn.click();
    }

    // Default page when clicking finish after completing determinations
    async verifyFinishRedirectLetters() {
        await expect(this.letterQueueLbl).toContainText("Letter Queue for Claim:");
    }

    async completeDetWithLetters() {
        await this.clickFinish();
        await this.verifyFinishRedirectLetters();
    }

    async completeDetWOLetters() {
        const txrequest = new TxRequestPage(this.page);
        await this.clickFinish();
        await txrequest.verifyReferralPage();
    }

    async selectNoncertReason(reason:string) {
        await this.noncertReasons.getByLabel(reason).click();
    }

    async selectNoncertMadeBy() {
        let madeByName = 'Katelyn Examiner';
        await this.noncertMadeByDdl.click();
        await this.noncertMadeByLst.getByText(madeByName).click({force: true}); //Doesn't always click the right one
    }

    async noncertDeterminationPage(reason:string) {
        await expect(this.noncertHdr).toContainText('Requests being non-certified');
        await this.selectNoncertReason(reason);
        await this.selectNoncertMadeBy();
    }

    async verifyNoVendorRef() {
        await expect(this.vendorRefMsg).toBeVisible();
        await expect(this.vendorOpt).not.toBeVisible();
    }

    async selectEscMadeBy(name:string) {
        await this.escMadeByDdl.click();
        await this.escMadeByLst.selectOption(name);
    }

    async enterEscNote() {
        let note = 'Escalation test note';
        await this.escNoteFld.fill(note);
    }

    async escDeterminationPage(name:string) {
        await expect(this.escalatedHdr).toContainText('Requests being escalated');
        await this.enterEscNote();
        await this.selectEscMadeBy(name);
    }

    async clickProceedNoVendor() {
        await this.procNoVendorChk.click();
    }

    async verifyOtherNoVendor() {
        await expect(this.vendorServiceDdl).toHaveText('Other');
        await expect(this.vendorNoVendor).toHaveText('No Vendor');
    }

    async verifyGenLettersNo() {
        await expect(this.genLetterNoChk).toBeChecked();
        await expect(this.genLetterNoChk).toBeDisabled();
    }

    async verifyRejectReason(reason:string) {
        await expect(this.rejReasonSel.locator("//option[@selected='selected']")).toHaveText(reason);
        await expect(this.rejReasonSel).toBeDisabled();
    }

    async verifyRejectReasonDetail(reason:string) {
        await expect(this.rejReasonTbl.locator("//label[text()='"+reason+"']/preceding-sibling::input")).toBeChecked();
        await expect(this.rejReasonTbl.locator("//label[text()='"+reason+"']/preceding-sibling::input")).toBeDisabled();
    }

    async enterServiceNote(note:string) {
        await this.serviceNoteFld.fill(note);
    }

    async enterRejectionNote(note:string) {
        await this.rejNoteFld.fill(note);
    }

    async verifyRejectNextStep(selection:string) {
        await expect(this.rejNextStepTbl.locator("//label[text()='"+selection+"']/preceding-sibling::input")).toBeChecked();
    }

    async verifyGenLettersSelection(selection:string) {
        await expect(this.genLettersTbl.locator("//label[text()='"+selection+"']/preceding-sibling::input")).toBeChecked();
    }

    async verifyFaxLettersSelection(selection:string) {
        await expect(this.faxLettersTbl.locator("//label[text()='"+selection+"']/preceding-sibling::input")).toBeChecked();
    }

}