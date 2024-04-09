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

/*
--
-- Command: npx playwright test tests/txrequests/non-ca-autocert.spec.ts
--
-- Test List:
-- 
-- Non-CA Claim workflows:
-- - Create a new RFA that will auto-certify
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

test.describe('Non-CA Claim autocertified workflow', () => {
    
    test('Create a new RFA that will auto-certify', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const txrequest = new TxRequestPage(page);
        const referral = new ReferralPage(page);
        const determination = new DeterminationsPage(page);
        const doclettertab = new DocLetterPage(page);
        const navigation = new Navigation(page);
        const refmanager = new ReferralManagerPage(page);
        const expreferral = new ExpReferralPage(page);

        await test.step('Correct Accepted Compensibility error', async () => {
            let compStatus = 'Accepted';
            await referral.workaroundSelectCompStatusAgain(compStatus);
        })
        
        await test.step('New RFA Step 1', async () => {
            await txrequest.useDefaultRfaStep1();
            await txrequest.completeStep1();
        })
        
        await test.step('New RFA Step 2', async () => {
            await txrequest.addDefaultBodyPart();
            await txrequest.useDefaultRfaStep2();
            await txrequest.completeStep2();
        })
        
        await test.step('Physical Medicine details - Step 3 ', async () => {
            const physMedCategory = "Physical Therapy"; 
            const quantityPhysMed = 1;
            await txrequest.enterPhysMedDetails(physMedCategory, quantityPhysMed);
            await txrequest.finishRequests();
        })
        
        await test.step('Run Protocols', async () => {
            await referral.clickRunProtocols();
        })
        
        await test.step('Determination information', async () => {
            await determination.certifiedDeterminationPage();
            await determination.clickNext();
        })

        await test.step('Verify vendor defaults to correct vendor', async () => {
            const defaultVendor = "Easy Diagnostics"; // for claim ending in 1
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


