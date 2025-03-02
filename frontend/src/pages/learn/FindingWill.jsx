import React from 'react';
import { Link } from 'react-router-dom';

export default function FindingWill() {
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
        <h1 className="text-4xl font-bold text-[#212529] mb-8">How to Find a Will</h1>
        
        <p className="text-[#6c757d] mb-8">
          Locating a loved one's will is an important step in handling their estate. The will provides crucial 
          information about their wishes and helps guide the distribution of assets. Here's a comprehensive guide 
          to help you find the will and understand what to do next.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#212529] mb-6">Common Places to Look</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Home office or personal filing cabinet</li>
              <li>Safe deposit box at their bank</li>
              <li>With their attorney or estate planner</li>
              <li>Local probate court (if previously filed)</li>
              <li>Online will storage services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#212529] mb-6">Steps to Find a Will</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">1. Search Personal Papers</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Look through filing cabinets, desk drawers, and other storage areas</li>
                  <li>Check folders labeled "Important Documents" or "Legal Papers"</li>
                  <li>Search for estate planning documents, which may be stored with the will</li>
                  <li>Look for digital copies on their computer or cloud storage</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">2. Contact Their Attorney</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Reach out to any known lawyers or estate planners</li>
                  <li>Check their records for attorney correspondence</li>
                  <li>Look for business cards or legal documents that might identify their attorney</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">3. Check Safe Deposit Box</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Contact their bank to inquire about safe deposit boxes</li>
                  <li>Understand the bank's procedures for accessing the box</li>
                  <li>Be prepared to show proper documentation (death certificate, proof of relationship)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">4. Consult Family Members</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Ask if they know about any estate planning</li>
                  <li>Inquire about conversations regarding their will</li>
                  <li>Check if anyone was named as executor</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">5. Check County Records</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Contact the probate court in their county of residence</li>
                  <li>Search for any pre-filed wills</li>
                  <li>Inquire about the process for filing the will if found</li>
                </ul>
              </section>
            </div>
          </section>

          <section className="bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#212529] mb-6">What to Do When You Find the Will</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Keep the original document safe</li>
              <li>Make copies for your records</li>
              <li>Contact the named executor (if it's not you)</li>
              <li>File the will with the local probate court</li>
              <li>Notify beneficiaries named in the will</li>
              <li>Consult with a probate attorney if needed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#212529] mb-6">If No Will is Found</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>The estate will be considered "intestate"</li>
              <li>State laws will determine how assets are distributed</li>
              <li>A court-appointed administrator will handle the estate</li>
              <li>Family members may need to petition the court for administration rights</li>
              <li>Consider consulting with a probate attorney for guidance</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Important Tips</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li>Start searching for the will as soon as possible after the death</li>
            <li>Document where and when you search for the will</li>
            <li>Keep track of all conversations with attorneys, banks, and family members</li>
            <li>Be prepared to show proper identification and documentation when requesting information</li>
            <li>Consider hiring a probate attorney if the situation becomes complex</li>
          </ul>
        </div>
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