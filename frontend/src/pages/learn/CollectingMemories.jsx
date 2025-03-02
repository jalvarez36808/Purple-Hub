import React from 'react';
import { Link } from 'react-router-dom';

export default function CollectingMemories() {
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
        <h1 className="text-4xl font-bold text-[#212529] mb-8">Collecting and Preserving Memories</h1>
        
        <p className="text-[#6c757d] mb-8">
          Preserving memories of your loved one is an important part of the grieving process and helps keep their 
          legacy alive. This guide will help you gather and protect precious memories in various forms, creating 
          lasting tributes that can be shared with family and friends for generations to come.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#212529] mb-6">Types of Memories to Collect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#6266ea]/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Physical Items</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Photographs and photo albums</li>
                  <li>Letters and cards</li>
                  <li>Personal journals or diaries</li>
                  <li>Artwork or crafts</li>
                  <li>Important documents</li>
                  <li>Meaningful clothing or jewelry</li>
                  <li>Awards and certificates</li>
                </ul>
              </div>

              <div className="bg-[#6266ea]/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Digital Content</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Digital photos and videos</li>
                  <li>Social media posts and messages</li>
                  <li>Emails and text conversations</li>
                  <li>Voice recordings</li>
                  <li>Blog posts or online writings</li>
                  <li>Digital artwork or projects</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#212529] mb-6">Steps to Preserve Memories</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">1. Gather Physical Items</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Create an inventory of important items</li>
                  <li>Sort items by type or time period</li>
                  <li>Handle delicate items with care</li>
                  <li>Consider using archival-quality storage materials</li>
                  <li>Label items with dates and context</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">2. Digitize Important Items</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Scan photographs and documents</li>
                  <li>Convert old video formats to digital</li>
                  <li>Record audio descriptions of items</li>
                  <li>Create digital backups</li>
                  <li>Store copies in multiple locations</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">3. Collect Stories and Memories</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Interview family members and friends</li>
                  <li>Record or write down shared memories</li>
                  <li>Gather written tributes</li>
                  <li>Document family traditions</li>
                  <li>Create a memory book or journal</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-[#6266ea] mb-4">4. Organize Digital Content</h3>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Create organized digital folders</li>
                  <li>Use consistent naming conventions</li>
                  <li>Add metadata and tags</li>
                  <li>Back up to cloud storage</li>
                  <li>Share access with family members</li>
                </ul>
              </section>
            </div>
          </section>

          <section className="bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#212529] mb-6">Creative Ways to Honor Memories</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Create a memorial website or blog</li>
              <li>Compile a video tribute</li>
              <li>Design a photo book or album</li>
              <li>Write a biography or life story</li>
              <li>Create a memory quilt or shadowbox</li>
              <li>Plant a memorial garden</li>
              <li>Establish a scholarship or foundation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#212529] mb-6">Tips for Preserving Memories</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Start collecting memories as soon as possible</li>
              <li>Include dates and context with items when possible</li>
              <li>Use acid-free materials for physical storage</li>
              <li>Make multiple copies of digital content</li>
              <li>Share preservation tasks with family members</li>
              <li>Consider professional help for valuable or delicate items</li>
              <li>Create a system for organizing and accessing memories</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Important Considerations</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li>Take your time - collecting memories can be emotionally challenging</li>
            <li>Involve other family members in the process</li>
            <li>Be respectful of privacy and sensitive information</li>
            <li>Consider creating copies for multiple family members</li>
            <li>Plan for long-term preservation and access</li>
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