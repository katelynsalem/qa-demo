import { test, expect, type Page } from '@playwright/test';
import { CommonSteps } from '@steps/CommonSteps';
import { LoginPage } from '@pages/Login.page';
import { Navigation } from '@components/Navigation';
import { MedAuthPage } from '@pages/MedAuth.page';
import { TxRequestPage } from '@pages/TxRequest.page'
import { ReferralPage } from '@pages/Referral.page';
import { DeterminationsPage } from '@pages/Determinations.page';
import { NotesDocuments } from '@pages/components/NotesDocuments';

/*
--
-- Command: npx playwright test tests/txrequests/ca-autoesc-uro-noncert.spec.ts
-- 
-- CA Claim > Auto-escalated TxRequest to Nurse Queue > Nurse Queue escalates to URO > URO Certifies 
-- 
-- CA Claim workflows:
-- - Create CA claim
-- - - Diagnosis: 215.5 - Abdomen
-- - - Body Part: Abdomen Accepted
-- - - Request: 00842
-- - Run protocols
-- - Verify auto-escalated to Nurse Queue
-- - Sign in as Nurse Queue
-- - Escalate request
-- - Complete and assign to URO (TestPriumURO)
-- - Verify Vendor is Other and No vendor
-- - Verify auto no letter generation
-- - Verify URO assigned on referral page
-- - Verify Vendor is still blank on referral page
-- - Login as URO (TestPriumURO)
-- - URO determination of non-certify
-- - URO upload URO Letter type document
-- - Login as Employer
-- - Verify determination is Not Certified
-- - Verify URO Letter is visible in Notes and Docs tab
-- - Verify URO is assigned
-- - Verify Vendor is blank
--
*/

//let username = process.env.USERNAME;
//let password = process.env.PASSWORD;
let username = 'username'
let password = 'password'
let nurseUsername = 'nurseusername';
let nursePassword = 'nurse!@#!';
let uroUsername = 'urousername';
let uroPassword = 'uroabc3';
let claimNumber:string;
let referralNumber:string;
let uroName:string;
let uroFilename:string;

test.describe('CA Claim autoescalated to Nurse Queue, to URO non-certified workflow', () => {
    test('Create a new RFA that will auto-escalate to Nurse Queue', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const txrequest = new TxRequestPage(page);
        const referral = new ReferralPage(page);
        const steps = new CommonSteps(page);
        const navigation = new Navigation(page);
        const medAuth = new MedAuthPage(page);

        await test.step('Setup Exaiminer', async () => {
            test.setTimeout(300000);
            //Login
            await page.goto('https://test.effectivehealthsystems.com');
            await loginPage.enterLoginDetails(username, password);
            await loginPage.verifyLogin();
        })

        await test.step('Create CA claim that will escalate to Nurse Queue', async () => {
            //Create a claim number ending in 1
            claimNumber = steps.createEmployersClaimNumber();
            
            //Create a claim
            let patientName = "QA Testuser";
            let employerName = "con";
            let injuryLocation = "CA - California";
            let subclientName = "con";
            let examinerName = 'Katelyn Examiner';
            let claimStatus = 'Open';
            let compStatus = 'Accepted';
            let injuryDate = '2019'; //Anything other than 'Default'
            let network = 'Ins MPN';
            let adjustingOffice = '';

            await navigation.selectCreateNewClaim();
            await medAuth.enterNewClaimDetails(claimNumber,patientName,employerName,injuryLocation,subclientName,examinerName,claimStatus,compStatus,network, injuryDate, adjustingOffice);
            await medAuth.verifyNewClaim(claimNumber);
        
        })

        await test.step('Search for claim', async () => {
            await navigation.searchClaim(claimNumber);
        })
    
        await test.step('Enter details for new RFA Step 1', async () => {
            let reqProvName = 'Matthew Leach';
            let calDate = steps.getTodayLongDate();

            await txrequest.enterRfaStep1(reqProvName,calDate);
            await txrequest.completeStep1();
        })

        await test.step('Enter details for New RFA Step 2', async () => {
            let diagnosisCode = "215.5";
            let requestType = "All Consults";
            let bodyPartSearch = 'Abdomen';
            let bodyPart = "Abdomen - Accepted";

            await txrequest.addAcceptedBodyPart(bodyPartSearch);
            await txrequest.enterRfaStep2(diagnosisCode, requestType, bodyPart);
            await txrequest.completeStep2();
        })

        await test.step('Enter details for All Consults - Step 3', async () => {
            let medicalCode = '00842';
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

        await test.step('Verify auto-escalated assigned to Nurse Queue', async () => {
            let assignedTo = 'Employers - Nurse Queue';
            await referral.verifyAssignedTo(assignedTo);
        })

        await test.step('Verify new Escalation Note', async () => {
            await referral.verifyNewNoteAlert();
            await referral.clickNotesDocs();
            await referral.verifyAutoEscNote();
            await referral.closePopup();
        })
        
    })

    test('Escalate the referral to a URO as Employers - Nurse Queue', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const referral = new ReferralPage(page);
        const determination = new DeterminationsPage(page);
        const navigation = new Navigation(page);

        await test.step('Setup nurse user', async () => {
            test.setTimeout(300000);
            //Login
            await page.goto('https://test.website.com');
            await loginPage.enterLoginDetails(nurseUsername,nursePassword);
            await loginPage.verifyLogin();
        })

        await test.step('Open referral', async () => {
            await navigation.searchClaim(claimNumber);
            await referral.clickPrevReferral();
        })
        
        await test.step('Escalate the request', async () => {
            let selectedDet = "Escalate";
            await referral.selectDetermination(selectedDet);
            await referral.clickComplete();
        })

        await test.step('Enter Escalated determination information and assign to URO', async () => {
            uroName = 'TestURO';
            await determination.escDeterminationPage(uroName);
            await determination.clickNext();
        })

        await test.step('Verify vendor defaults to other and no vendor', async () => {
            await determination.verifyOtherNoVendor();
            await determination.clickProceedNoVendor();
        })

        await test.step('Verify generate letters defaults to no', async () => {
            await determination.verifyGenLettersNo();
        })
        
        await test.step('Click Finish', async () => {
            await determination.clickFinish();
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
    
    test('Non-certify the request as a URO user', async ({ page }) => {
        
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
        
        await test.step('Non-certify the request', async () => {
            let selectedDet = "Non-Certify";
            await referral.selectDetermination(selectedDet);
            await referral.clickComplete();
            await determination.clickFinish();
        })

        await test.step('Upload URO Letter document', async () => {
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

        await test.step('Verify Non-certify determination', async () => {
            await referral.verifyNoncertifed();
        })

        await test.step('Verify URO is still assigned', async () => {
            await referral.verifyAssignedTo(uroName);
        })
        
        await test.step('Verify vendor information is blank in MedAuth', async () => {
            await referral.verifyVendorEmpty();
        })
        
        await test.step('Verify URO Letter document download', async () => {
            await referral.clickHamburger();
            await referral.clickNotesDocs();
            await notesdocs.verifyAddNewDoc(uroFilename);
            await notesdocs.downloadDoc(uroFilename);
            await notesdocs.closePopup();
        })

        await test.step('Logout', async () => {
            await loginPage.logout();
        })
    })
})
