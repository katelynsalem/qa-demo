import { test, expect, type Page } from '@playwright/test';
import { CommonSteps } from '@steps/CommonSteps';
import { LoginPage } from '@pages/Login.page';
import { Navigation } from '@components/Navigation';
import { MedAuthPage } from '@pages/MedAuth.page';
import { TxRequestPage } from '@pages/TxRequest.page'
import { ReferralPage } from '@pages/Referral.page';
import { DeterminationsPage } from '@pages/Determinations.page';

/*
--
-- Command: npx playwright test tests/txrequests/ca-autorej.spec.ts
-- 
-- CA Claim > Auto-rejection
-- 
-- CA Claim workflows:
-- - Create CA claim that will auto reject
-- - - Comp Status: No Coverage
-- - - Claim Status: Denied
-- - Verify Reject Referral is checked and disabled
-- - Click Next
-- - Verify document message is displayed
-- - Upload a document
-- - Rejection Determination page:
-- - Verify Select Rejection Reason = "Claim Compensability" selected and disabled
-- - Verify Rejection Reason Details = "No Coverage" selected and disabled
-- - Enter a Service Note
-- - Enter a Rejection Note
-- - Select Next Step Generate Letter
-- - Verify No Vendor options
-- - Verify Generate letters yes
-- - Verify Generate Fax yes
-- - Letter Verification:
-- - - Verify Service note and rejection note are visible on the letter
-- - - Verify No Coverage section is visible on the letter
--
*/

//let username = process.env.USERNAME;
//let password = process.env.PASSWORD;
let username = 'username'
let password = 'password'
let claimNumber:string;
let compStatus:string;
let docDescription:string;
let docFilename:string;
let serviceNote:string;
let rejectionNote:string;

test.describe('CA Claim auto-rejected workflow', () => {
    test('Create a new RFA to auto-reject', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const txrequest = new TxRequestPage(page);
        const referral = new ReferralPage(page);
        const steps = new CommonSteps(page);
        const navigation = new Navigation(page);
        const medAuth = new MedAuthPage(page);
        const determination = new DeterminationsPage(page);

        await test.step('Setup Exaiminer', async () => {
            test.setTimeout(300000);
            //Login
            await page.goto('https://test.website.com');
            await loginPage.enterLoginDetails(username, password);
            await loginPage.verifyLogin();
        })
        
        await test.step('Create CA claim that will auto-reject', async () => {
            //Create a claim number ending in 1
            claimNumber = steps.createEmployersClaimNumber();
            
            //Create a claim
            let patientName = "QA Testuser";
            let employerName = "con";
            let injuryLocation = "CA - California";
            let subclientName = "moen";
            let examinerName = 'Katelyn Examiner';
            let claimStatus = 'No Coverage';
            compStatus = 'Denied';
            let injuryDate = 'Default'
            let network = '';
            let adjOffice = 'San Francisco';

            await navigation.selectCreateNewClaim();
            await medAuth.enterNewClaimDetails(claimNumber,patientName,employerName,injuryLocation,subclientName,examinerName,claimStatus,compStatus,network, injuryDate,adjOffice);
            await medAuth.verifyNewClaim(claimNumber);
        
        })

        await test.step('Search for claim', async () => {
            await navigation.searchClaim(claimNumber);
        })

        await test.step('Correct Compensibility error', async () => {
            await referral.workaroundSelectCompStatusAgain(compStatus);
            await page.reload();
        })

        await test.step('Enter details for new RFA Step 1 that auto rejects', async () => {
            let reqProvName = 'Test Doctor';
            let calDate = steps.getTodayLongDate();
            await txrequest.enterRfaStep1(reqProvName,calDate);
            await txrequest.verifyAutoRejectCheckbox();
            await txrequest.clickStep1Next();
        })

        await test.step('Verify upload document message appears', async () => {
            await txrequest.verifyDocErrorMessage();
        })

        await test.step('Upload a document', async () => {
            docDescription = 'Test RFA document';
            let docType = 'Referral Document';
            docFilename = 'newDocTestFile.docx';
            await txrequest.uploadDoc1(docDescription,docType,docFilename);
            await txrequest.clickStep1Next();
        })
        
        await test.step('Verify Select Rejection Reason = "Claim Compensability" selected and disabled', async () => {
            let rejectReason = 'Claim Compensability';
            await determination.verifyRejectReason(rejectReason);
        })

        await test.step('Verify Rejection Reason Details = "No Coverage" selected and disabled', async () => {
            let rejectReasonDetail = 'No Coverage';
            await determination.verifyRejectReasonDetail(rejectReasonDetail);
        })

        await test.step('Enter Service Note', async () => {
            serviceNote = 'Test Service Note';
            await determination.enterServiceNote(serviceNote);
        })
        
        await test.step('Enter Rejection Note', async () => {
            rejectionNote = 'Test Rejection Note';
            await determination.enterRejectionNote(rejectionNote);
        })

        await test.step('Verify Generate Letter is selected', async () => {
            let selection = 'Generate Letter'
            await determination.verifyRejectNextStep(selection);
        })

        await test.step('Click Next', async () => {
            await determination.clickNextRej();
        })

        await test.step('Verify there are no vendor referrals for the request', async () => {
            await determination.verifyNoVendorRef();
        })

        await test.step('Verify Generate Letters is selected', async () => {
            await determination.verifyGenLettersSelection('Yes');
        })

        await test.step('Verify Generate Fax is selected', async () => {
            await determination.verifyFaxLettersSelection('Yes');
        })
        
        await test.step('Click Finish', async () => {
            await determination.clickFinish();
        })
        
    })

})
