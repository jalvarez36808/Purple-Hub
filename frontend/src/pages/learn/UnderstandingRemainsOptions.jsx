import React from 'react';
import { Link } from 'react-router-dom';

export default function UnderstandingRemainsOptions() {
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
        <h1 className="text-4xl font-bold text-[#212529] mb-8">Understanding Your Options for a Loved One's Remains</h1>
        
        <p className="text-[#6c757d] mb-8">
          Choosing between cremation, burial, or body donation is a deeply personal decision. If no prior arrangements were made, 
          family members will need to decide what best honors their loved one's wishes while considering practical, emotional and financial factors.
        </p>

        <h2 className="text-2xl font-semibold text-[#212529] mt-12 mb-6">Factors to Consider</h2>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">The Wishes of the Deceased</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>If your loved one expressed a preference for burial, cremation, or donation, honoring that wish can provide peace of mind.</li>
              <li>Check legal documents or have discussions with family members to determine their choice.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Local Customs</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Cultural and religious traditions often play a role in how a body is handled.</li>
              <li>Some families choose to follow local burial or cremation customs out of respect for tradition or community practices.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">The Feelings of Others</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>It may help to consider how other family members feel about burial, cremation, or donation.</li>
              <li>The local community's views may also influence the decision.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Legal Requirements</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Some areas have laws regarding burial, cremation, and body donation.</li>
              <li>There may be restrictions on where cremated ashes can be scattered or specific permits required for certain types of burials.</li>
            </ul>
          </section>
        </div>

        <h2 className="text-2xl font-semibold text-[#212529] mt-12 mb-6">Understand Your Options</h2>

        <div className="space-y-10">
          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Burial</h3>
            
            <h4 className="font-medium text-[#212529] mb-2">What It Involves:</h4>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d] mb-4">
              <li>The body is placed in a casket and interred in a cemetery.</li>
              <li>Options include traditional burial, green (eco-friendly) burial, or mausoleum entombment.</li>
            </ul>
            
            <h4 className="font-medium text-[#212529] mb-2">Considerations:</h4>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d] mb-4">
              <li>Requires embalming (in most cases), a burial plot, casket, and headstone.</li>
              <li>Can be one of the more expensive options due to cemetery space and maintenance fees.</li>
            </ul>
            
            <h4 className="font-medium text-[#212529] mb-2">Financial Assistance:</h4>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Eligible veterans may receive <strong>free or subsidized burial</strong> through the <a href="https://www.cem.va.gov/" className="text-[#6266ea] hover:text-[#4232c2]">Veterans Affairs National Cemetery Administration</a>.</li>
              <li>Some states or counties offer <strong>low-income burial assistance</strong>.</li>
              <li>Direct burial (without a formal service) is often a more affordable option.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Cremation</h3>
            
            <h4 className="font-medium text-[#212529] mb-2">What It Involves:</h4>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d] mb-4">
              <li>The body is gently cremated, and the ashes can be kept, scattered, or buried.</li>
            </ul>
            
            <h4 className="font-medium text-[#212529] mb-2">Considerations:</h4>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d] mb-4">
              <li>Often more affordable and flexible than burial.</li>
              <li>Some areas have legal restrictions on where ashes can be scattered.</li>
              <li>Cultural views on cremation vary.</li>
            </ul>
            
            <h4 className="font-medium text-[#212529] mb-2">Financial Assistance:</h4>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Some states and counties provide <strong>cremation assistance programs</strong> for low-income families.</li>
              <li>Eligible veterans may receive <strong>cremation benefits</strong> through the <a href="https://www.cem.va.gov/" className="text-[#6266ea] hover:text-[#4232c2]">VA National Cemetery Administration</a>.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Body Donation</h3>
            
            <h4 className="font-medium text-[#212529] mb-2">What It Involves:</h4>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d] mb-4">
              <li>The entire body is donated for <strong>medical research, training, or education</strong>.</li>
              <li>Many programs provide free cremation and return the ashes to the family, but policies vary.</li>
            </ul>
            
            <h4 className="font-medium text-[#212529] mb-2">Considerations:</h4>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d] mb-4">
              <li>Not all bodies are eligible (certain medical conditions may disqualify a donor).</li>
              <li>Some programs charge transportation or processing fees — check details before proceeding.</li>
            </ul>
            
            <h4 className="font-medium text-[#212529] mb-2">How to Donate:</h4>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Programs vary by state. Check <a href="https://www.sciencecare.com/locations" className="text-[#6266ea] hover:text-[#4232c2]">this list</a> for available options.</li>
              <li>Some universities and nonprofit organizations offer direct donation programs.</li>
            </ul>
          </section>
        </div>

        <section className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Comparing the Costs of Each Option</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Option</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Average Cost</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Additional Fees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Burial</td>
                  <td className="border border-gray-300 px-4 py-2">$7,000–$15,000+</td>
                  <td className="border border-gray-300 px-4 py-2">Cemetery plot, embalming, casket, headstone, maintenance fees</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">Cremation</td>
                  <td className="border border-gray-300 px-4 py-2">$1,000–$5,000</td>
                  <td className="border border-gray-300 px-4 py-2">Urn, memorial service, scattering fees (if applicable)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Body Donation</td>
                  <td className="border border-gray-300 px-4 py-2">Usually Free</td>
                  <td className="border border-gray-300 px-4 py-2">Some programs may charge transport or admin fees</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Questions to Ask Yourself</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li>Did my loved one express a preference?</li>
            <li>Does my religious or cultural background influence this decision?</li>
            <li>What financial resources are available?</li>
            <li>Do I want to keep a physical resting place?</li>
            <li>Would I like a memorial service? If so, when and where?</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Next Steps in Making Arrangements</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li><strong>If choosing burial or cremation:</strong> Contact a funeral home or cremation provider as soon as possible.</li>
            <li><strong>If considering body donation:</strong> Contact a donation program to check eligibility and requirements.</li>
            <li><strong>For financial assistance:</strong> Ask the funeral home or local government about aid programs that may help cover costs.</li>
          </ul>
        </section>

        <p className="text-[#6c757d] mt-8">
          Deciding how to honor a loved one's memory is deeply personal. While this choice can be difficult, focusing on what best reflects 
          their wishes and supports your family can help. Thoughtfully considering your options can bring peace of mind and ensure you make 
          the choice that feels right.
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