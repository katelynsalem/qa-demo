import { test, expect, type Page } from '@playwright/test';
import { CommonSteps } from '@steps/CommonSteps';
import { LoginPage } from '@pages/Login.page';
import { Navigation } from '@components/Navigation';
import { MedAuthPage } from '@pages/MedAuth.page';
import { TxRequestPage } from '@pages/TxRequest.page'
import { ReferralPage } from '@pages/Referral.page';
import { DeterminationsPage } from '@pages/Determinations.page';
import { ReferralManagerPage } from '@pages/ReferralManager.page';
import { ExpReferralPage } from '@pages/ExpressReferral.page';
import { NotesDocuments } from '@pages/components/NotesDocuments';

/*
--
-- Command: npx playwright test tests/txrequests/non-ca-autoesc-uro-cert.spec.ts
-- 
-- Non-CA Claim > Auto-escalated TxRequest to Adjuster > Adjuster escalates to URO > URO Certifies 
-- 
-- Non-CA Claim workflows:
-- - Create non-CA claim
-- - Verify auto-escalated
-- - Complete and assign to URO (TestPriumURO)
-- - Assign a vendor
-- - Verify URO assigned on referral page
-- - Verify Vendor is still blank on referral page
-- - Login as URO (TestPriumURO)
-- - URO determination of certify
-- - URO upload URO Letter type document
-- - Login as Employers
-- - Verify determination is Certified
-- - Verify URO Letter is visible
-- - Verify URO is assigned
-- - Verify Vendor is assigned in MedAuth
-- - Verify vendor order is in Express referral with Referral Approved
-- - Verify vendor order is in Referral Manager with Referral Approved
--
*/

//let username = process.env.USERNAME;
//let password = process.env.PASSWORD;
let username = 'username'
let password = 'password'
let uroUsername = 'UROusername';
let uroPassword = 'uropassword';
let claimNumber:string;
let referralNumber:string;
let uroName:string;
let defaultVendor:string;
let uroFilename:string;


test.describe('Non-CA Claim autoescalated to URO certified workflow', () => {
    
    test('Create a new RFA that will auto-escalate and be escalated to a URO', async ({ page }) => {
        
        const loginPage = new LoginPage(page);
        const txrequest = new TxRequestPage(page);
        const referral = new ReferralPage(page);
        const determination = new DeterminationsPage(page);

        await test.step('Setup Exaiminer', async () => {
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
        
        
        await test.step('Correct Accepted Compensibility error', async () => {
            let compStatus = 'Accepted';
            await referral.workaroundSelectCompStatusAgain(compStatus);
        })
    
        await test.step('Enter details for New RFA Step 1', async () => {
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

        await test.step('Get referral number', async () => {
            referralNumber = await referral.getReferralNumber();
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
            await referral.verifyAutoEscNote();
            await referral.closePopup();
        })

        await test.step('Manually escalate request', async () => {
            let determination = "Escalate";
            await referral.selectDetermination(determination);
            await referral.clickComplete();
        })

        await test.step('Enter Escalated determination information and assign URO', async () => {
            uroName = 'TestPrium';
            await determination.escDeterminationPage(uroName);
            await determination.clickNext();
        })

        await test.step('Verify vendor defaults to any vendor', async () => {
            defaultVendor = await determination.getSelectedVendor();
            await determination.verifyVendorNotEmpty();
        })

        await test.step('Complete determination and letter generation', async () => {
            await determination.completeDetWOLetters();
        })

        await test.step('Verify vendor information is blank in MedAuth', async () => {
            await referral.verifyVendorEmpty();
        })

        await test.step('Verify Assigned To', async () => {
            await referral.verifyAssignedTo(uroName);
        })

        await test.step('Logout', async () => {
            await loginPage.logout();
        })
        
    })
        
    test('Certify the request as a URO user', async ({ page }) => {
        
        const loginPage = new LoginPage(page);
        const referral = new ReferralPage(page);
        const determination = new DeterminationsPage(page);
        const navigation = new Navigation(page);
        const notesdocs = new NotesDocuments(page);

        await test.step('Setup URO user', async () => {
            test.setTimeout(300000);
            //Login
            await page.goto('https://test.website.com');
            await loginPage.enterLoginDetails(uroUsername,uroPassword);
            await loginPage.verifyLogin();
        })

        await test.step('Open referral', async () => {
            await navigation.searchClaim(claimNumber);
            await referral.clickPrevReferral();
        })
        
        await test.step('Certify the request', async () => {
            let selectedDet = "Certify";
            await referral.selectDetermination(selectedDet);
            await referral.clickComplete();
            await determination.clickFinish();
        })

        await test.step('Upload document URO Letter', async () => {
            let docNote = 'URO letter note';
            let docType = 'URO Letter';
            uroFilename = 'newDocTestFile.docx';
            await referral.clickHamburger();
            await referral.clickNotesDocs();
            await notesdocs.addNewDocument(referralNumber, docNote, docType, uroFilename);
            await notesdocs.verifyAddNewDoc(uroFilename);
            await notesdocs.closePopup();
        })

        await test.step('Logout', async () => {
            await loginPage.logout();
        })
    })
    
    test('Verify URO updates as Examiner', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const referral = new ReferralPage(page);
        const navigation = new Navigation(page);
        const refmanager = new ReferralManagerPage(page);
        const expreferral = new ExpReferralPage(page);
        const notesdocs = new NotesDocuments(page);

        await test.step('Setup Exaiminer', async () => {
            test.setTimeout(300000);
            //Login
            await page.goto('https://test.website.com');
            await loginPage.enterLoginDetails(username, password);
            await loginPage.verifyLogin();
        })

        await test.step('Open referral', async () => {
            await navigation.searchClaim(claimNumber);
            await referral.clickPrevReferral();
        })

        await test.step('Verify Certify determination', async () => {
            await referral.verifyCertified();
        })

        await test.step('Verify URO is still assigned', async () => {
            await referral.verifyAssignedTo(uroName);
        })
        
        await test.step('Verify vendor information displays in MedAuth', async () => {
            await referral.verifyVendorAssign(defaultVendor);
        })
        
        await test.step('Verify URO Letter document download', async () => {
            await referral.clickHamburger();
            await referral.clickNotesDocs();
            await notesdocs.verifyAddNewDoc(uroFilename);
            await notesdocs.downloadDoc(uroFilename);
            await notesdocs.closePopup();
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


