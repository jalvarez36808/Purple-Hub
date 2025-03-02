import React from 'react';
import { Link } from 'react-router-dom';

export default function BodyTransportation() {
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
        <h1 className="text-4xl font-bold text-[#212529] mb-8">Arranging Transportation of the Body</h1>
        
        <p className="text-[#6c757d] mb-8">
          Making arrangements to transport a loved one's body can feel overwhelming, but knowing the right steps 
          can ease the process. Whether your loved one will be buried, cremated, or donated, ensuring their body 
          reaches the appropriate facility is a crucial first step.
        </p>

        <h2 className="text-2xl font-semibold text-[#212529] mt-12 mb-6">Who Handles Body Transportation?</h2>
        <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
          <li>Funeral homes and cremation providers typically arrange transport from a hospital, hospice, nursing home, or private residence.</li>
          <li>Hospitals and care facilities may provide short-term morgue storage while arrangements are made.</li>
          <li>Specialized transport services exist for cases involving long-distance transport or out-of-state relocation.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#212529] mt-12 mb-6">How to Arrange Transportation</h2>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">1. Contact the Disposition Provider</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>If your loved one prearranged services, notify the funeral home, cremation provider, or body donation program.</li>
              <li>If no plans were made, research local providers and select one that meets your needs.</li>
              <li>Many funeral homes offer 24/7 transportation services and can assist immediately after a death.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">2. Provide Important Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Confirm pickup location (hospital, hospice, nursing home, private residence).</li>
              <li>Inform the provider if your loved one had:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>A pacemaker or medical implants that must be removed before cremation.</li>
                  <li>Gold teeth or other valuables that you may wish to recover before disposition.</li>
                  <li>Jewelry or personal items to be kept by the family.</li>
                </ul>
              </li>
              <li>If a viewing is planned, timely transportation is essential for preparation.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">3. Transportation for Out-of-State or International Travel</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>If your loved one needs to be transported to another state, check the legal requirements, as permits may be required.</li>
              <li>Embalming or refrigeration may be necessary for long-distance transport.</li>
              <li>If international transport is needed, contact the U.S. embassy or consulate in the destination country to understand specific regulations.</li>
              <li>Many funeral homes coordinate with mortuary shipping services to handle documentation and transport logistics.</li>
            </ul>
          </section>
        </div>

        <section className="mt-12 bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Understanding Costs and Financial Assistance</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li>Local transport (within the same city): Usually included in funeral home or cremation service fees.</li>
            <li>Long-distance transport (state-to-state or international): Additional fees apply, and costs vary based on distance and required permits.</li>
            <li>Veteran benefits: Eligible veterans may receive assistance with transportation and burial through the VA National Cemetery Administration.</li>
            <li>Low-income assistance: Some states and counties provide financial aid for transportation and disposition—ask the funeral provider about available options.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Legal Considerations for Body Transportation</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li>Most states require a burial transit permit for moving a body across county or state lines.</li>
            <li>If transporting remains by air, airlines have specific policies regarding embalming, packaging, and required documentation.</li>
            <li>Body donation programs often handle all necessary paperwork and transportation arrangements if your loved one has chosen donation.</li>
          </ul>
        </section>

        <p className="text-[#6c757d] mt-8">
          Considering this information will help ensure that your loved one is cared for with dignity and that 
          all necessary logistics are handled with professionalism and care.
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