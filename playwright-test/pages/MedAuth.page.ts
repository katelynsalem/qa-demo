import { expect, type Locator, type Page} from "@playwright/test";

export class MedAuthPage {
    readonly page: Page;
    readonly claimNumberFld: Locator;
    readonly patientFld: Locator;
    readonly patientLst: Locator;
    readonly employerReq: Locator;
    readonly employerFld: Locator;
    readonly employerLst: Locator;
    readonly injuryFld: Locator;
    readonly injuryLst: Locator;
    readonly subclientReq: Locator;
    readonly subclientFld: Locator;
    readonly subclientLst: Locator;
    readonly examinerFld: Locator;
    readonly examinerLst: Locator;
    readonly injuryCal: Locator;
    readonly injuryDate: Locator;
    readonly compStatusDdl: Locator;
    readonly compStatusLst: Locator;
    readonly statusDdl: Locator;
    readonly statusLst: Locator;
    readonly insertBtn: Locator;
    readonly statusMsg: Locator;
    readonly networkDdl: Locator;
    readonly networkLst: Locator;
    readonly injuryCalTtl: Locator;
    readonly injuryCalTtlCnt: Locator;
    readonly injuryCalTtlOk: Locator;
    readonly adjOfficeFld: Locator;
    readonly adjOfficeLst: Locator;


    constructor(page: Page) {
        this.page = page;
        this.claimNumberFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_txtClaim");
        this.patientFld = page.locator("//input[@value='Enter first few characters of the Patient name']");
        this.patientLst = page.locator('#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radPatient_DropDown ul li');
        this.employerReq = page.locator('#PageContent_PageContent_PageContent_ClamManagementUC_employerSpan');
        this.employerFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radEmployer_Input");
        this.employerLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radEmployer_DropDown ul li");
        this.injuryFld = page.locator("input[value='Select a State']");
        this.injuryLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radInjuryLocation_DropDown ul li");
        this.subclientReq = page.locator("#PageContent_PageContent_PageContent_ClamManagementUC_subclientSpan");
        this.subclientFld = page.locator("input[value='Enter first few characters of the Client/Pool']");
        this.subclientLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radSubClient_DropDown ul li");
        this.examinerFld = page.locator("input[value='Select an Examiner from the supplied list']");
        this.examinerLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radExaminer_DropDown ul li");
        this.injuryCal = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radDateOfInjury_popupButton");
        this.injuryDate = page.locator("//table[@id='ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radDateOfInjury_calendar_Top']/tbody[1]/tr[1]/td[1]");
        this.compStatusDdl = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radClaimCompensibilityStatus_Input");
        this.compStatusLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radClaimCompensibilityStatus_DropDown ul li");
        this.statusDdl = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radClaimStatus_Input");
        this.statusLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radClaimStatus_DropDown ul li");
        this.insertBtn = page.locator("input[value='Insert']");
        this.statusMsg = page.locator("#PageContent_PageContent_PageContent_ClamManagementUC_StatusMessageArea");
        this.networkDdl = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radNetwork");
        this.networkLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radNetwork_DropDown ul li");
        this.injuryCalTtl = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radDateOfInjury_calendar_Title");
        this.injuryCalTtlCnt = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radDateOfInjury_calendar_FastNavPopup td");
        this.injuryCalTtlOk = page.locator("#rcMView_OK");
        this.adjOfficeFld = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radAdjustingOffice");
        this.adjOfficeLst = page.locator("#ctl00_ctl00_ctl00_PageContent_PageContent_PageContent_ClamManagementUC_radAdjustingOffice_DropDown ul li");
    }

    async useDefaultClaimDetails(claimNumber: string){
        let patientName = "QA Testuser";
        let employerName = "con";
        let injuryLocation = "CO - Colorado";
        let subclientName = "con";
        let examinerName = 'Katelyn Examiner';

        await this.claimNumberFld.fill(claimNumber);
        await this.patientFld.fill(patientName);
        await this.patientLst.nth(0).click();
        await this.injuryFld.click();
        await this.injuryLst.getByText(injuryLocation).click();
        await this.examinerFld.fill(examinerName);
        await this.examinerLst.getByText(examinerName).click();
        await this.injuryCal.click();
        await this.injuryDate.click(); // 1st visible date on calendar default
        await this.compStatusDdl.click();
        await this.compStatusLst.getByText('Accepted', {exact: true}).click();
        await this.statusDdl.click();
        await this.statusLst.getByText('Open',{ exact: true }).click();

        if (await this.employerReq.isVisible()) {
            await this.employerFld.fill(employerName);
            await this.employerLst.nth(0).click();
        }

        if (await this.subclientReq.isVisible()) {
            await this.subclientFld.fill(subclientName);
            await this.subclientLst.nth(0).click();
        }

    }

    async enterNewClaimDetails(claimNumber: string, patientName: string, employerName: string, injuryLocation: string, subclientName: string, examinerName: string,
        claimStatus:string, compStatus:string, network:string, injuryDate:string, adjustingOffice:string) {
        
        await this.claimNumberFld.fill(claimNumber);
        await this.patientFld.fill(patientName);
        await this.patientLst.nth(0).click();
        await this.injuryFld.click();
        await this.injuryLst.getByText(injuryLocation).click();
        await this.examinerFld.fill(examinerName);
        await this.examinerLst.getByText(examinerName).click();
        await this.compStatusDdl.click();
        await this.compStatusLst.getByText(compStatus, {exact: true}).click();
        await this.statusDdl.click();
        await this.statusLst.getByText(claimStatus,{ exact: true }).click();

        if (injuryDate === 'Default') {
            await this.injuryCal.click();
            await this.injuryDate.click(); // 1st visible date on calendar default
        } else {
            await this.injuryCal.click();
            await this.injuryCalTtl.click();
            await this.injuryCalTtlCnt.getByText('Apr').click();
            await this.injuryCalTtlCnt.getByText('<<').click();
            await this.injuryCalTtlCnt.getByText('2019').click();
            await this.injuryCalTtlOk.click();
            await this.injuryDate.click();
        }

        if (adjustingOffice === undefined || adjustingOffice === '') {
        } else {
            await this.adjOfficeFld.click();
            await this.adjOfficeLst.getByText(adjustingOffice).click();
        }

        if (network === undefined || network === '') {
        } else {
            await this.networkDdl.click();
            await this.networkLst.getByText(network).click();
        }

        if (employerName === undefined || employerName === '') {
        } else {
            await this.employerFld.fill(employerName);
            await this.employerLst.nth(0).click();
        }

        if (subclientName === undefined || subclientName === '') {
        } else {
            await this.subclientFld.fill(subclientName);
            await this.subclientLst.nth(0).click();
        }
    }

    async verifyNewClaim(claimNumber: string){
        await this.insertBtn.click();
        expect(this.statusMsg).toContainText('Claim# '+claimNumber+' has been created.');
        console.log('Claim# '+claimNumber+' has been created.');
    }

}
