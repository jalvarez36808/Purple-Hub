import React from 'react';
import { Link } from 'react-router-dom';

export default function ImportantDocuments() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          to="/checklist" 
          className="text-[#6266ea] hover:text-[#4232c2] flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Checklist
        </Link>
      </div>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-[#212529] mb-8">Gathering Important Documents and Papers</h1>
        
        <p className="text-[#6c757d] mb-8">
          Certain documents are needed to settle financial, legal, and estate matters after a loved one's passing. 
          Collecting these papers early in the process can help ease the administrative burden during this difficult time.
        </p>

        <h2 className="text-2xl font-semibold text-[#212529] mt-12 mb-6">Key Documents to Gather</h2>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Legal & Financial Documents</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Will or trust documents</li>
              <li>Death certificate (multiple certified copies)</li>
              <li>Birth certificate</li>
              <li>Marriage certificate or divorce papers</li>
              <li>Tax returns (past 3-5 years)</li>
              <li>Bank statements and account information</li>
              <li>Investment account statements</li>
              <li>Mortgage documents or property deeds</li>
              <li>Loan agreements and credit card statements</li>
              <li>Safe deposit box information and keys</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Identification & Personal Records</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Social Security card or number</li>
              <li>Driver's license or state ID</li>
              <li>Passport</li>
              <li>Military discharge papers (DD-214)</li>
              <li>Marriage license</li>
              <li>Divorce decree</li>
              <li>Citizenship papers (if applicable)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Insurance & Benefits</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Life insurance policies</li>
              <li>Health insurance cards and policies</li>
              <li>Homeowner's or renter's insurance</li>
              <li>Auto insurance</li>
              <li>Long-term care insurance</li>
              <li>Employer benefits information</li>
              <li>Pension or retirement account statements</li>
              <li>401(k) or IRA documents</li>
              <li>Annuity contracts</li>
              <li>Veterans benefits information</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Property & Accounts</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Property deeds and titles</li>
              <li>Vehicle titles and registration</li>
              <li>Boat or recreational vehicle documentation</li>
              <li>Business ownership documents</li>
              <li>Digital account information (email, social media, etc.)</li>
              <li>Subscription services</li>
              <li>Utility account information</li>
              <li>Lists of online accounts or passwords (if available)</li>
            </ul>
          </section>
        </div>

        <section className="mt-12 bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Helpful Tips</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li><strong>Create a filing system</strong> to organize documents by category.</li>
            <li><strong>Make copies</strong> of important documents, especially if originals must be submitted to various institutions.</li>
            <li><strong>Check the mail</strong> for at least a month to identify unpaid bills, subscriptions, or accounts you might not be aware of.</li>
            <li><strong>Look in multiple locations</strong> - important papers may be kept in filing cabinets, safes, desk drawers, or digital storage.</li>
            <li><strong>Contact professionals</strong> who worked with your loved one (attorney, financial advisor, accountant) as they may have copies of important documents.</li>
            <li><strong>Store documents securely</strong> in a waterproof, fireproof container or safe.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Where to Look for Documents</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li>Filing cabinets or file boxes</li>
            <li>Desk drawers or home office</li>
            <li>Safe deposit boxes at banks</li>
            <li>Home safes or lockboxes</li>
            <li>With the deceased's attorney or financial advisor</li>
            <li>Digital storage (computer files, email attachments, cloud storage)</li>
            <li>With trusted family members</li>
          </ul>
        </section>

        <p className="text-[#6c757d] mt-8">
          Gathering these documents early in the process will help streamline the estate settlement process and ensure 
          you have the necessary paperwork when dealing with financial institutions, government agencies, and other organizations.
        </p>
      </article>

      <div className="mt-12 flex justify-between items-center">
        <Link 
          to="/checklist" 
          className="text-[#6266ea] hover:text-[#4232c2] flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Checklist
        </Link>
      </div>
    </div>
  );
} 