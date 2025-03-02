import React from 'react';
import { Link } from 'react-router-dom';

export default function DeterminingWishes() {
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
        <h1 className="text-4xl font-bold text-[#212529] mb-8">Determining Your Loved One's Wishes</h1>
        
        <p className="text-[#6c757d] mb-8">
          Understanding your loved one's final wishes can help guide important decisions regarding their remains, 
          memorial services, and estate matters. If no prior arrangements were made, taking the time to review 
          available documents and discuss options with family members can ensure their wishes are honored respectfully.
        </p>

        <h2 className="text-2xl font-semibold text-[#212529] mt-12 mb-6">How to Determine Their Wishes</h2>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">1. Check for Legal Documents</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Look for a will, advance directive, or estate planning documents that may outline final wishes.</li>
              <li>Review any prepaid funeral or burial plans or insurance policies that include funeral expenses.</li>
              <li>Search for a written statement or letter of instruction regarding burial, cremation, or donation.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">2. Review Personal Records & Communications</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Check safe deposit boxes, personal files, or digital records for any notes on end-of-life preferences.</li>
              <li>Speak with attorneys, financial advisors, or close family members who may have insight into the deceased's wishes.</li>
              <li>Consider reviewing past conversations where they may have shared their preferences verbally.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">3. Consult Family Members & Close Friends</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>If no written instructions exist, discuss with immediate family and close friends to see if the deceased ever expressed their preferences informally.</li>
              <li>If there are conflicting opinions, work together to make a decision that best reflects the deceased's values and beliefs.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">4. Consider Religious and Cultural Beliefs</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Many traditions have specific customs regarding burial, cremation, or body donation.</li>
              <li>If no instructions were left, consider what would best align with both the deceased's values and family preferences.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">5. Explore Practical Considerations</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>If no explicit wishes were left, consider financial, logistical, and emotional factors when making a decision.</li>
              <li>Ensure decisions align with legal requirements in your state regarding burial, cremation, or donation.</li>
              <li>If the estate has limited funds, financial assistance may be available for funeral costs.</li>
            </ul>
          </section>
        </div>

        <section className="mt-12 bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Handling Situations Where No Wishes Were Stated</h2>
          <p className="text-[#6c757d] mb-4">
            If no formal plans were made, the legal next of kin typically has the authority to decide on final arrangements. 
            In such cases:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li>Family discussions should aim for consensus, keeping in mind what would best honor the individual.</li>
            <li>Consulting a funeral home, cremation provider, or estate attorney can provide guidance on legal requirements and available options.</li>
            <li>If there are disputes, mediation services may help reach an agreement.</li>
          </ul>
        </section>

        <p className="text-[#6c757d] mt-8">
          Taking the time to determine a loved one's wishes can provide peace of mind and ensure their memory 
          is honored in a way that reflects their values and preferences.
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