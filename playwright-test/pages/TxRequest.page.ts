import { expect, type Locator, type Page} from "@playwright/test";
import { CommonSteps } from '@steps/CommonSteps';

export class TxRequestPage {
    readonly page: Page;
    readonly reqProvFld: Locator;
    readonly reqProvLst: Locator;
    readonly provReqCal: Locator;
    readonly clientRecCal: Locator;
    readonly ourRecCal: Locator;
    readonly specialtyFld: Locator;
    readonly faxFld: Locator;
    readonly doc1DescFld: Locator;
    readonly doc1TypeDdl: Locator;
    readonly doc1SelectBtn: Locator;
    readonly doc2UploadBtn: Locator;
    readonly doc2DescFld: Locator;
    readonly doc2TypeDdl: Locator;
    readonly doc2SelectBtn: Locator;
    readonly nextBtnStep1: Locator;
    readonly diagnosisLbl: Locator;
    readonly addNewBodyPartBtn: Locator;
    readonly bodyPartDdl: Locator;
    readonly bodyPartStatusDdl: Locator;
    readonly addBodyPartBtn: Locator;
    readonly diagnosisFld: Locator;
    readonly physMedRb: Locator;
    readonly allConsRb: Locator;
    readonly dmeRb: Locator;
    readonly pharmRb: Locator;
    readonly nextBtnStep2: Locator;
    readonly finishBtn: Locator;
    readonly medCodeFld: Locator;
    readonly medCodeLst: Locator;
    readonly quantFld: Locator;
    readonly addAnotherReqBtn: Locator;
    readonly diagnosisLst: Locator;
    readonly bodyPartFld: Locator;
    readonly bodyPartLst: Locator;
    readonly physMedDdl: Locator;
    readonly physMedLst: Locator;
    readonly pharmQuantFld: Locator;
    readonly supplyFld: Locator;
    readonly txrequestWizard: Locator;
    readonly rejectChk: Locator;
    readonly docErrorMsg: Locator;
    readonly docFileUploadSuccess: Locator;
    readonly doc1TypeLst: Locator;


    constructor(page: Page) {
        this.page = page;
        this.reqProvFld = page.locator("input[value='Select Requesting Provider']");
        this.reqProvLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_RequestingProviderId_DropDown ul li");
        this.provReqCal = page.locator("(//a[@class='rcCalPopup'])[1]");
        this.clientRecCal = page.locator("(//a[@class='rcCalPopup'])[2]");
        this.ourRecCal = page.locator("(//a[@class='rcCalPopup'])[3]");
        this.specialtyFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlRequestingProviderSpecialty_Input");
        this.faxFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_txtReqProvFax");
        this.doc1DescFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_txtDocument1Description");
        this.doc1TypeDdl = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlDocument1Type");
        this.doc1TypeLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlDocument1Type_DropDown ul li")
        this.doc1SelectBtn = page.locator('#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_Document1file0');
        this.doc2UploadBtn = page.locator("//div[@class='doc2trigger']//a[1]");
        this.doc2DescFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_txtDoc2Description");
        this.doc2TypeDdl = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlDocType2_Input");
        this.doc2SelectBtn = page.locator("id=ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_Document2file0");
        this.nextBtnStep1 = page.locator("input[type='submit']");
        this.diagnosisLbl = page.locator("//td[text()='Diagnosis Code']");
        this.addNewBodyPartBtn = page.locator("a[title='Add new Body Part']");
        this.bodyPartDdl = page.locator("input[value='Select Body Part']");
        this.bodyPartStatusDdl = page.locator("input[value='Accepted']");
        this.addBodyPartBtn = page.locator("input[value='Add body part']");
        this.diagnosisFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlICD9Code_Input");
        this.physMedRb = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_rblRequestType_0");
        this.allConsRb = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_rblRequestType_1");
        this.dmeRb = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_rblRequestType_2");
        this.pharmRb = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_rblRequestType_3");
        this.nextBtnStep2 = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_StepNavigationTemplateContainerID_StepNextButton");
        this.finishBtn = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_FinishNavigationTemplateContainerID_Button1");
        this.medCodeFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlMedicalCode_Input");
        this.medCodeLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlMedicalCode_DropDown ul li");
        this.quantFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_txtQty");
        this.addAnotherReqBtn = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_FinishNavigationTemplateContainerID_btnAddAnother");
        this.diagnosisLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlICD9Code_DropDown ul li");
        this.bodyPartFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlBodyPart_Input");
        this.bodyPartLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlBodyPart_DropDown ul li");
        this.physMedDdl = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlPhysicalMedicineCategory_Input");
        this.physMedLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_ddlPhysicalMedicineCategory_DropDown ul li");
        this.pharmQuantFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_txtPharmQty");
        this.supplyFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_txtPharmDaysSupply");
        this.txrequestWizard = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_RadMultipage1");
        this.rejectChk = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_wzTxRequest_cbRejectReferral");
        this.docErrorMsg = page.locator("#PageContent_PageContent_PageContent_TxRequestWizardUC1_lblErrorMsg");
        this.docFileUploadSuccess = page.locator("//span[@class='ruUploadProgress ruUploadSuccess']");
    }

// Default same calendar dates
    async selectReqProvDetails(name:string) {
        await this.reqProvFld.fill(name);
        await this.page.getByText(name).click();
    }

    async selectProvReqCal(date:string) {
        await this.provReqCal.click();
        await this.page.locator("(//td[@title='"+date+"'])[1]").click();
    }

    async selectClientRecCal(date:string) {
        await this.clientRecCal.click();
        await this.page.locator("(//td[@title='"+date+"'])[1]").click();
    }

    async selectOurRecCal(date:string) {
        await this.ourRecCal.click();
        await this.page.locator("(//td[@title='"+date+"'])[1]").click();
    }

    async enterRfaStep1(reqProvName: string, calDate: string) {
        await this.selectReqProvDetails(reqProvName);
        await this.selectProvReqCal(calDate);
        await this.selectClientRecCal(calDate);
        await this.selectOurRecCal(calDate);
        
        // Check that specialty is not "Specialty"
        expect.soft(this.specialtyFld).not.toContainText('Specialty');
        if (await this.specialtyFld.textContent() === 'Specialty') {
            await this.specialtyFld.click();
            await this.page.locator("(//li[text()='Physical Therapy'])[1]").click();
        }
        // Check that fax was filled
        expect.soft(this.faxFld).not.toBeEmpty();
        if (await this.faxFld.textContent() === '') {
            await this.faxFld.fill('555-555-5555');
        }

    }
    
    async uploadDoc1(doc1Description: string, doc1Type: string, filename:string) {
        await this.doc1DescFld.fill(doc1Description);
        await this.doc1TypeDdl.click();
        await this.doc1TypeLst.getByText(doc1Type).click();
        await this.doc1SelectBtn.setInputFiles('./tests/fixtures/'+filename);
        await expect(this.docFileUploadSuccess).toBeVisible();
    }

// Default testimage.jpg
    async uploadDoc2(doc2Description: string, doc2Type: string) {
        await this.doc2UploadBtn.click();
        await this.doc2DescFld.fill(doc2Description);
        await this.doc2TypeDdl.click();
        await this.page.locator("(//li[text()='"+doc2Type+"'])[1]").click();
        await this.doc2SelectBtn.setInputFiles('./tests/fixtures/testimage.jpg');        
    }

    async completeStep1() {
        await this.nextBtnStep1.click();
        expect(this.diagnosisLbl).toBeVisible();
    }

    async useDefaultRfaStep1 () {
        
        const steps = new CommonSteps(this.page);
        let reqProvName = 'Test Doctor'
        let calDate = steps.getTodayLongDate();

        await this.selectReqProvDetails(reqProvName);
        await this.selectProvReqCal(calDate);
        await this.selectClientRecCal(calDate);
        await this.selectOurRecCal(calDate);

    }

    async addDefaultBodyPart() {
        await this.addNewBodyPartBtn.click();
        await this.bodyPartDdl.click();
        await this.page.locator("//li[text()='Ankle']").click();
        await this.addBodyPartBtn.click();
    }

    async addAcceptedBodyPart(bodyPart:string) {
        await this.addNewBodyPartBtn.click();
        await this.bodyPartDdl.click();
        await this.page.locator("//li[text()='"+bodyPart+"']").click();
        await this.addBodyPartBtn.click();
    }
// Default options
    async addDeniedBodyPart() {
        await this.addNewBodyPartBtn.click();
        await this.bodyPartDdl.click();
        await this.page.locator("(//li[@class='rcbItem'])[3]").click(); // random 2nd bodypart
        await this.bodyPartStatusDdl.click();
        await this.page.locator("//li[text()='Denied']").click();
        await this.addBodyPartBtn.click();
    }
// Default options
    async addPhysicianEnteredBodyPart() {
        await this.addNewBodyPartBtn.click();
        await this.bodyPartDdl.click();
        await this.page.locator("(//li[@class='rcbItem'])[5]").click(); // random 4th bodypart
        await this.bodyPartStatusDdl.click();
        await this.page.locator("//li[text()='Physician Entered']").click();
        await this.addBodyPartBtn.click();
    }

// Default options
    async useDefaultRfaStep2() {
        let diagnosisCode = "327.52"; // Sleep related leg cramps
        let requestType = "Physical Medicine"; // Physical Medicine, All Consults, DME, Pharmacy

        await this.diagnosisFld.fill(diagnosisCode);
        await this.page.getByText(diagnosisCode).click();
        await this.bodyPartFld.click();
        await this.page.locator("//li[text()='Ankle - Accepted']").click();
        
        switch (requestType) {
            case 'Physical Medicine':
                await this.physMedRb.click();
                break;
            case 'All Consults':
                await this.allConsRb.click();
                break;
            case 'DME':
                await this.dmeRb.click();
                break;
            case 'Pharmacy':
                await this.pharmRb.click();
                break;
        }
    }

    async enterRfaStep2(diagnosisCode: string, requestType: string, bodyPart: string) {
        await this.diagnosisFld.fill(diagnosisCode);
        await this.page.getByText(diagnosisCode).click();
        await this.bodyPartFld.click();
        await this.page.locator("//li[text()='" + bodyPart + "']").click();
        
        switch (requestType) {
            case 'Physical Medicine':
                await this.physMedRb.click();
                break;
            case 'All Consults':
                await this.allConsRb.click();
                break;
            case 'DME':
                await this.dmeRb.click();
                break;
            case 'Pharmacy':
                await this.pharmRb.click();
                break;
        }
    }

    async completeStep2() {
        await this.nextBtnStep2.click();
        expect(this.finishBtn).toBeVisible();
    }

    async addAnotherRequest() {
        await this.addAnotherReqBtn.click();
        expect(this.diagnosisLbl).toBeVisible();
    }

    async verifyReferralPage() {
        await expect(this.txrequestWizard).toBeVisible({timeout:200000});
    }

    async finishRequests() {
        await this.finishBtn.click();
        await this.verifyReferralPage();
    }

    async enterAllConsDetails(medicalCode: string, quantity: number) {
        await this.medCodeFld.fill(medicalCode);
        await this.medCodeLst.filter({ hasText: medicalCode }).click();
        await this.quantFld.fill(quantity.toString());
    }

    async enterPhysMedDetails(category: string, quantity: number) {
        await this.physMedDdl.click();
        await this.physMedLst.filter({ hasText: category }).click();
        await this.quantFld.fill(quantity.toString());
    }

    async enterDMEDetails(medicalCode: string, quantity: number) {
        await this.medCodeFld.fill(medicalCode);
        await this.medCodeLst.nth(0).click();
        await this.quantFld.fill(quantity.toString());
    }

    async enterPharmDetails(medicalCode: string, qunatity: number, supply: number) {
        await this.medCodeFld.fill(medicalCode);
        await this.medCodeLst.nth(0).click();
        await this.pharmQuantFld.fill(qunatity.toString());
        await this.supplyFld.fill(supply.toString());
    }

    async verifyAutoRejectCheckbox() {
        await expect(this.rejectChk).toBeDisabled();
        await expect(this.rejectChk).toBeChecked();
    }

    async clickStep1Next() {
        await this.nextBtnStep1.click();
    }

    async verifyDocErrorMessage() {
        await expect(this.docErrorMsg).toBeVisible();
    }
}