import { test, expect, type Page } from '@playwright/test';
import { CommonSteps } from '@steps/CommonSteps';
import { LoginPage } from '@pages/Login.page';
import { Navigation } from '@components/Navigation';
import { MedAuthPage } from '@pages/MedAuth.page';
import { TxRequestPage } from '@pages/TxRequest.page'
import { ReferralPage } from '@pages/Referral.page';
import { DeterminationsPage } from '@pages/Determinations.page';
import { DocLetterPage } from '@pages/DocumentsLetters.page';
import { ReferralManagerPage } from '@pages/ReferralManager.page';
import { ExpReferralPage } from '@pages/ExpressReferral.page';
import { NotesDocuments } from '@pages/components/NotesDocuments';

/*
--
-- Command: npx playwright test tests/txrequests/employers/non-ca-autoesc-cert.spec.ts
--
-- Test List:
-- 
-- Non-CA Claim workflows:
-- 
--
*/

//let username = process.env.USERNAME;
//let password = process.env.PASSWORD;
let username = 'username'
let password = 'password'
let claimNumber:string;

test.beforeEach(async ({ page }) => {
    test.setTimeout(300000);
    //Login
    const loginPage = new LoginPage(page);
    await page.goto('https://test.website.com');
    await loginPage.enterLoginDetails(username, password);
    await loginPage.verifyLogin();

    //Create a claim number ending in 1
    const steps = new CommonSteps(page);
    claimNumber = steps.createEmployersClaimNumber();
    
    //Create a claim
    const navigation = new Navigation(page);
    await navigation.selectCreateNewClaim();
    const medAuth = new MedAuthPage(page);
    await medAuth.useDefaultClaimDetails(claimNumber);
    await medAuth.verifyNewClaim(claimNumber);

    // Search for claim
    await navigation.searchClaim(claimNumber);

})

test.describe('Non-CA Claim autoescalated to certified workflow', () => {

    test('Create a new RFA that will auto-escalate and be certified by an adjuster', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const txrequest = new TxRequestPage(page);
        const referral = new ReferralPage(page);
        const determination = new DeterminationsPage(page);
        const doclettertab = new DocLetterPage(page);
        const navigation = new Navigation(page);
        const refmanager = new ReferralManagerPage(page);
        const expreferral = new ExpReferralPage(page);
        const notesdocs = new NotesDocuments(page);

        await test.step('Correct Accepted Compensibility error', async () => {
            let compStatus = 'Accepted';
            await referral.workaroundSelectCompStatusAgain(compStatus);
        })
    
        await test.step('Enter deatils for New RFA Step 1', async () => {
            await txrequest.useDefaultRfaStep1();
            await txrequest.completeStep1();
        })
    
        await test.step('Enter details for New RFA Step 2', async () => {
            let diagnosisCode = "327.52"; // Sleep related leg cramps
            let requestType = "All Consults";
            let bodyPart = "Ankle - Accepted";

            await txrequest.addDefaultBodyPart();
            await txrequest.enterRfaStep2(diagnosisCode, requestType, bodyPart);
            await txrequest.completeStep2();
        })
    
        await test.step('Enter details for All Consults - Step 3', async () => {
            let medicalCode = '95800'; //Slp Stdy Unatnd W/Hrt Rate/O2 Sat/Resp/Slp Time (Never auto-certify per Colorado business rules)
            let quantity = 1;
            await txrequest.enterAllConsDetails(medicalCode, quantity);
            await txrequest.finishRequests();
        })

        await test.step('Run Protocols', async () => {
            await referral.clickRunProtocols();
        })

        await test.step('Verify the RFA auto-escalated', async () => {
            await referral.verifyEscalated();
        })

        await test.step('Verify new Escalation Note', async () => {
            await referral.verifyNewNoteAlert();
            await referral.clickNotesDocs();
            await notesdocs.verifyAutoEscNote();
            await notesdocs.closePopup();
        })
        
        await test.step('Manually certify request', async () => {
            let determination = "Certify";
            await referral.selectDetermination(determination);
            await referral.clickComplete();
        })

        await test.step('Enter the Certified Determination information', async () => {
            await determination.certifiedDeterminationPage();
            await determination.clickNext();
        })

        await test.step('Verify vendor defaults to correct vendor', async () => {
            const defaultVendor = "Easy Diagnostics";
            await determination.verifyVendorDefault(defaultVendor);
        })
        
        await test.step('Verify letter generation has no CCs', async () => {
            await determination.verifyCCNotVisible();
        })

        await test.step('Complete determination and letter generation', async () => {
            await determination.completeDetWithLetters();
        })
        
        await test.step('Verify letter was generated', async () => {
            const fileName = "Certified";
            await doclettertab.downloadDoc(fileName);
        })
        
        await test.step('Verify vendor information displays in MedAuth', async () => {
            const defaultVendor = "Easy Diagnostics";
            await doclettertab.clickTxRequestTab();
            await referral.verifyVendorAssign(defaultVendor);
        })
        
        await test.step('Verify Referral Approved in Referral Manager', async () => {
            await navigation.searchReferralManager(claimNumber);
            await refmanager.verifyApproved();
        })
        
        await test.step('Verify Referral Approved in Express Referral', async () => {
            await navigation.searchExpReferral(claimNumber);
            await expreferral.verifyApproved();
        })

        await test.step('Logout', async () => {
            await loginPage.logout();
        })
    })
})

