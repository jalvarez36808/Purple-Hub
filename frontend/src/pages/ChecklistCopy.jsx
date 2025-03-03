import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';

// Add animation keyframe for fadeIn
const fadeInAnimation = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;

// Popup content for each task
const popupContent = {
  // Immediate section
  'contact-family': {
    title: "Contacting Immediate Family",
    content: `In the difficult moments following a loved one's passing, connecting with immediate family is crucial for support and necessary decision-making.

**Steps to Contact Immediate Family:**

1. **Reach Out Promptly:**  
   * Notify key family members via personal phone calls or in-person meetings to maintain privacy and sensitivity.  
2. **Share Known Wishes:**  
   * Discuss any preferences the deceased expressed about organ donation, cremation, or burial if known.  
3. **Identify Legal Next of Kin:**  
   * Ensure the legal next of kin is informed quickly, as they may need to make urgent decisions or sign necessary documents.  
4. **Find Essential Documents:**  
   * Look for any wills or end-of-life plans the deceased may have left, which could guide the upcoming decisions.  
5. **Make Decisions Collectively:**  
   * Decide on immediate actions such as funeral arrangements in a manner that honors the deceased's wishes and considers the family's emotional and financial state.

**Support Each Other:**
As you navigate these steps, remember to provide emotional support to one another, recognizing that everyone processes grief differently.`
  },
  'notify-friends': {
    title: "Notifying Close Friends and Extended Family",
    content: `Informing friends and extended family about a loved one's passing requires careful consideration and sensitivity.

**Steps to Notify Friends and Extended Family:**

1. **Create a Contact List:**  
   * Compile a list of close friends and extended family who need to be informed.  
2. **Assign Responsibilities:**  
   * **Family Members**: If possible, have each sibling notify their own branch of the family. If you are an only child or feel overwhelmed, ask close friends or extended family to assist.  
   * **Trusted Friends**: A close friend can help by reaching out to those in the deceased's personal address book or other important contacts.  
3. **Choose Communication Methods:**  
   * Use phone calls for close relationships to maintain privacy and sensitivity.  
   * Opt for emails or messages for wider circles or when personal calls are challenging.  
4. **Share Essential Information:**  
   * **Service Details:** Share funeral or memorial service plans if available. If details are still being arranged, let them know updates will follow.  
   * **Family's Preferences:** If the family prefers to grieve privately, you can mention that they appreciate support but kindly ask for space at this time.  
   * **Condolences:** If the family welcomes condolences, provide information on where to send messages, flowers, or donations.`
  },
  'notify-doctor': {
    title: "Informing Your Loved One's Doctor",
    content: `Notifying your loved one's doctor of their passing is an important step, especially if they were under medical care. It ensures proper record updates and may be necessary for final paperwork.

**Steps to Notify the Doctor:**

1. **Determine the Right Contact Person:**  
   * Identify which doctor needs to be informed—this may be a primary care physician, specialist, or hospice provider.  
2. **Make the Call:**  
   * Contact the doctor's office and ask to speak with a staff member or nurse if the doctor is unavailable.  
3. **Provide Essential Information:**  
   * Share the deceased's full name and date of passing.  
   * If the death occurred under medical care, ask whether the doctor will be signing the death certificate or if it needs to go through a coroner or medical examiner.  
4. **Ask About Next Steps:**  
   * Some offices may require additional paperwork or provide guidance on accessing medical records.  
   * If the death was unexpected, the doctor may need to report it to the medical examiner.  
   * If an autopsy is required, ask how it may affect the death certificate timeline.  
5. **Close Any Remaining Medical Matters:**  
   * If the doctor was involved in long-term care or treatment, ask if any additional steps are needed to finalize medical records or notifications.`
  },
  'notify-employer': {
    title: "Notifying Your Loved One's Employer",
    content: `If your loved one was employed, notifying their employer promptly ensures that final wages and benefits are properly handled, helping to ease financial stress.

**Steps to Notify the Employer:**

1. **Prepare Required Documents**  
   * Employers typically require a death certificate to process final payments and benefits.  
2. **Contact the Employer Promptly**  
   * Call the human resources department or, for small businesses, speak directly with a supervisor or owner.  
   * If you are not the next of kin or an emergency contact, HR may only provide limited information.  
3. **Ask About Final Pay and Benefits**  
   * Unpaid wages, vacation, or sick time that may be owed.  
   * Death benefits, pensions, or 401(k) funds.  
   * Employer-provided life insurance and how to file a claim.  
   * Whether dependents (spouse, children) remain eligible for health coverage, including COBRA continuation.

   *Note:* The employer may provide forms to request unpaid wages, pensions, life insurance, or other benefits. Ask about these when you contact them.

**Understand Benefit Payouts**

* Some benefits, such as life insurance and pensions, are paid directly to named beneficiaries.  
* Other payments, like a final paycheck, may be issued to the estate and require probate.`
  },
  'care-children': {
    title: "Arranging Care for Children",
    content: `If a loved one who has passed away had minor children, ensuring their immediate care is a priority. In the hours and days following the loss, children need a stable and supportive environment while long-term plans are determined.

**Steps to Arrange Care for Children**

1. **Ensure Immediate Safety and Stability**  
   * Make sure the children are in a safe environment with a responsible adult.  
   * Prioritize their emotional needs along with food, shelter, and routine care.  
2. **Communicate with the Immediate Family**  
   * If a surviving parent or guardian is present, ask how you can best support them.  
   * Some parents may find comfort in keeping their children close, while others may need temporary help—respect their wishes.  
3. **Arrange Temporary Care (If Needed)**  
   * Identify a trusted relative or friend who can provide short-term care.  
   * Choose someone who can offer stability without adding stress to grieving family members.  
4. **Determine Legal Guardianship and Long-Term Care**  
   * **If a guardian is named in a will:** Contact an attorney or local probate court to begin the legal process of transferring custody.  
   * **If no guardian is named:** A family member may need to petition the court for guardianship. Consulting a family law attorney or checking with your state's probate court can help clarify the next steps.  
5. **Provide Ongoing Emotional Support**  
   * Keep routines as normal as possible to provide a sense of stability.  
   * Offer reassurance and encourage open conversations about grief.`
  },
  'care-pets': {
    title: "Arranging Care for Pets",
    content: `If a loved one who has passed away had pets, ensuring their immediate care is essential. Pets may feel confused or anxious, so providing stability and attention can help ease their stress.

**Steps to Arrange Care for Pets**

1. **Meet Immediate Needs**  
   * Provide food, water, and a safe, familiar space.  
   * Maintain their routine as much as possible to reduce anxiety.  
2. **Find a Temporary Caregiver**  
   * Ask a trusted family member, friend, or neighbor to care for the pet.  
   * If no one is available, contact a pet boarding facility or local rescue organization for temporary housing.  
3. **Locate Important Pet Records**  
   * Gather documents such as vaccination records, medical history, and microchip information.  
   * Check if the deceased had a will or written plan specifying pet care arrangements.  
4. **Arrange Long-Term Care**  
   * **If a guardian was named in a will:** Contact them to transfer ownership.  
   * **If no guardian was designated:** Work with family to find a new home.  
   * **If no one can adopt the pet:** Reach out to a reputable shelter, rescue group, or breed-specific organization to ensure proper placement.  
5. **Help the Pet Adjust**  
   * Provide familiar items like bedding or toys to ease the transition.  
   * Ensure they receive love, attention, and stability in their new home.`
  },
  'determine-wishes': {
    title: "Determining Your Loved One's Wishes",
    content: `Understanding a loved one's final wishes can help guide important decisions regarding their remains, memorial services, and estate matters. If no prior arrangements were made, these steps can help ensure their wishes are honored:

**Steps to Determine Their Wishes**

1. **Check for Legal Documents**
   * Look for a will, advance directive, or estate planning documents.
   * Review prepaid funeral or burial plans and insurance policies.
2. **Search Personal Records & Communications**
   * Check safe deposit boxes, digital records, or personal notes.
   * Speak with attorneys, financial advisors, or family members.
3. **Consult Family & Religious Beliefs**
   * If no formal plans exist, discuss with family and consider cultural or religious customs.
   * If there is uncertainty, consulting a spiritual leader may help.
4. **Consider Practical & Financial Factors**
   * If no instructions were left, decisions should consider financial and legal requirements.
   * Funeral homes and cremation providers can guide legal next steps.

For a detailed guide on handling this process, including legal considerations and financial assistance, visit the full-page resource through the "Learn More" link.`
  },
  'cremation-burial': {
    title: "Understanding Your Options for a Loved One's Remains",
    content: `Deciding how to handle a loved one's remains is a deeply personal choice. If no prior arrangements were made, consider the following factors:

**Important Considerations**

* **The Wishes of the Deceased** – Check legal documents or discuss with family to determine their preference.  
* **Local Customs** – Religious beliefs or cultural traditions may influence the decision.  
* **Family & Community Feelings** – Consider how others feel about burial, cremation, or donation.  
* **Legal Requirements** – Some areas have laws regarding burial, cremation, or body donation.

**Understand Your Options**

1. **Burial**   
   * Involves a casket and cemetery interment.   
   * Costs vary based on embalming, plot, and maintenance.   
   * Some financial aid is available for veterans or low-income families.  
2. **Cremation**  
   * The body is respectfully processed into ashes, which can be kept, scattered, or buried.   
   * Typically more affordable than burial.   
   * Some locations may have legal restrictions.  
3. **Body Donation**  
   * The body is donated for medical research.   
   * Many programs provide free cremation and return ashes to the family, but eligibility varies.

**Next Steps**

* **If choosing burial or cremation** – Contact a funeral home or cremation provider.  
* **If considering body donation** – Reach out to a donation program for eligibility details.  
* **For financial assistance** – Ask the funeral home or local authorities about aid programs.

For a detailed guide on understanding options for a loved one's remains, including burial, cremation, and body donation, visit the full-page resource through the "Learn More" link.`
  },
  'transport-body': {
    title: "Arranging Transportation of the Body",
    content: `Transporting a loved one's body to the chosen funeral home, cremation provider, or donation facility is one of the first steps after a passing. Acting quickly ensures the process is handled smoothly and respectfully.

**Steps to Arrange Transportation:**

1. **Contact a Funeral Home or Cremation Provider**  
   * If prearrangements were made, notify the chosen provider.  
   * If no provider has been selected, research local options and confirm services.  
   * Many providers offer 24/7 transport assistance.  
2. **Provide Essential Information**  
   * Confirm the pickup location (hospital, hospice, nursing home, private residence).  
   * Inform the provider if the deceased had a pacemaker or medical implants, as these may require removal before cremation.  
   * Decide whether jewelry or other personal items should be removed before transport.  
3. **Out-of-State Transport**  
   * If the body needs to be transported across state lines, check legal requirements and permits.  
   * Funeral homes can assist with necessary documentation and travel arrangements.

For a detailed guide on additional considerations, including cost factors and specific laws, click **Learn More** to view the full-page resource.`
  },
  'home-care': {
    title: "Arrange for care of the Deceased's Home",
    content: `If your loved one lived alone, securing their home can help prevent issues while you focus on next steps.

### **Steps to Take:**

1. **Secure the Property**  
   * Lock all doors, windows, and gates.  
   * Collect spare keys from trusted individuals.  
   * Notify a trusted neighbor or local authorities if the home will be vacant.  
   * Remove valuables if the home will remain empty.  
2. **Notify Key Contacts**  
   * Inform the homeowner's insurance provider to keep coverage active.  
   * Let family members, neighbors, or a property manager know who will check on the home.  
   * If renting, contact the landlord to discuss lease termination or next steps.  
3. **Manage Mail & Deliveries**  
   * Forward mail through **USPS Mail Forwarding** to prevent buildup.  
   * Cancel subscriptions (newspapers, magazines, meal kits, etc.).  
   * Check for important bills or documents.  
4. **Maintain the Property**  
   * Keep essential utilities (electricity, water, heat) on if needed.  
   * Arrange for yard care, trash pickup, or basic upkeep to maintain the home's appearance.  
   * Address urgent **repairs** (plumbing, leaks, pest control) to prevent damage.  
5. **Consider Security Measures**  
   * Use timers for lights to make the home appear occupied.  
   * Install or activate a security system if available.

Taking these steps ensures the home is safe and maintained while you handle other important matters. For a more detailed guide, visit **Arranging for Care of the Deceased's Home**.`
  },
  'gather-documents': {
    title: "Gathering Important Documents and Papers",
    content: `Certain documents are needed to settle financial, legal, and estate matters. Collecting them early can help ease the process.

**Key Documents to Gather:**

* **Legal & Financial** – Will or trust, tax returns, bank statements, and investment accounts.  
* **Identification & Personal Records** – Birth and marriage certificates, Social Security number, and military discharge papers.  
* **Insurance & Benefits** – Life insurance policies, employer benefits, and 401(k) or pension records.  
* **Property & Accounts** – Deeds, vehicle titles, loan records, and lists of online accounts or passwords.

**Helpful Tips:**

* **Check the Mail** – Monitor mail for a month to identify unpaid bills or financial accounts.  
* **Store Securely** – Keep documents in a safe place and avoid mailing originals unless necessary.  
* **Make Copies** – If originals must be sent, make copies and use tracking for important items.

Organizing these records ensures financial and legal matters can be handled smoothly, reducing stress during this difficult time.`
  },
  
  // Within Days section
  'flowers-donations': {
    title: "Flowers or Donations",
    content: `Flowers and donations are thoughtful ways to honor a loved one's memory. Choose what feels most meaningful for your family.

**Flowers for the Service**

* Funeral homes often work with florists and may offer assistance or discounts.  
* Decide who will take flowers home after the service to avoid them becoming overwhelming.  
* If there are many flower arrangements, consider donating them to hospitals or nursing homes.

**Donations**

* If your loved one supported a cause, requesting charitable donations can be a meaningful alternative.  
* Include this request in the obituary or service announcement (e.g., "*In lieu of flowers, donations may be made to [charity name].").*  
* Some charities provide acknowledgment cards or online tribute pages to notify the family of donations received.

Both flowers and donations serve as heartfelt tributes—choose what best reflects your loved one's values and your family's needs.`
  },
  'eulogies': {
    title: "Planning Eulogies",
    content: `Eulogies are a meaningful way to honor a loved one's life. Thoughtful planning can help speakers feel prepared and ensure a respectful tribute.

**How to Arrange Eulogies**

* **Reach Out Early** – Ask close family or friends if they'd like to speak, giving them time to prepare.  
* **Set Expectations –** Let them know how long they'll have and whether others are covering specific topics.  
* **Offer Gentle Guidance** – Suggest meaning themes and kindly mention any sensitive topics to avoid.  
* **Provide Written Details** – A short email with key points helps speakers organize their thoughts.  
* **Have a Backup Plan** – Grief can make speaking difficult. Consider having a written copy or alternate speaker available.

**Other Ways to Share Memories**

* Read a meaningful scripture, poem, or letter.  
* Create a slideshow or video tribute.

A well-prepared eulogy can provide comfort, honor your loved one's memory, and offer a chance for reflection.`
  },
  'guest-book': {
    title: "Guest Book",
    content: `A guest book provides a lasting record of those who attended the funeral or memorial service, offering comfort and connection in the years ahead.

**Arranging a Guest Book**

* **Choose a Format** – Traditional books, personalized memorial books, or digital memorial pages are all options.  
* **Set Up a Signing Station** – Place it near the entrance with pens and clear signage inviting guests to sign.  
* **Encourage Guests to Share Memories** – Provide a note near the book suggesting guests write a message of support, favorite memory, or how they knew your loved one. A designated person can gently invite guests to participate.

**What a Guest Book Provides**

* **A Lasting Keepsake** – Families can revisit messages for comfort and reflection.  
* **Help with Thank-You Notes** – Provides a record of attendees to acknowledge their support.  
* **Preserves Connections** – Allows future generations to see who came to honor their loved one.

**Other Memorial Keepsakes**

* **Memorial Folders or Service Programs** – Printed materials with photos, poems, and/or a life summary for guests to take home.  
* **Digital Memorial Pages** – Online guest books allow loved ones to leave messages and share memories remotely.

A guest book is a simple yet meaningful way to honor your loved one while preserving the love and support shared during the service.`
  },
  'share-arrangements': {
    title: "Sharing Funeral Service Arrangements with Friends and Family",
    content: `Sharing service details ensures loved ones understand your wishes and have the opportunity to offer support.

**Ways to Share Service Details**

* **Personal Communication** – Call, text, or email close family and friends.  
* **Group Messaging or Social Media** – Use group chats, social media, or an online memorial page to reach a wider circle.  
* **Obituary Announcement**  – If publishing an obituary, include service details if applicable.

**Helpful Tips**

* **Clarify Expectations** – Let people know if the service is private or open to all.  
* **Ask for Help –** A family member or friend can assist in sharing details.  
* **Encourage Support** – Let others know how they can offer comfort, whether through attendance, donations, or other gestures.

Sharing arrangements early helps prevent confusion and ensures everyone has the chance to honor and remember your loved one.`
  },
  'local-burial': {
    title: "Arrangements for Local Burial",
    content: `Planning a local burial involves coordinating key details.

- **Confirm Cemetery Arrangements:** Select and purchase a plot if needed. Complete paperwork and schedule the burial.
- **Select Pallbearers:** Choose and notify them in advance.
- **Share Burial Details:** Provide directions and arrival details. Arrange transportation if necessary.
- **Plan the Graveside Service:** Decide who will lead and include a reading or tribute.
- **Prepare Flowers & Tributes:** Order flowers or keepsakes for the gravesite.`
  },
  'share-burial': {
    title: "Sharing Burial Service Arrangements with Friends and Family",
    content: `​​Sharing burial details helps loved ones understand your wishes and prevents confusion during an already difficult time.

**Ways to Share Information:**

* **Personal Communication** – Call, text, or email close family and friends.  
* **Group Message or Private Post** – Use group chats, email lists, or an online memorial page.  
* **Obituary or Funeral Home Notice** – If an obituary is published, include burial details if appropriate.

**Alternative Gatherings**

If the burial is private, consider:

* Hosting a separate gathering, such as a meal at a home or banquet hall.  
* Planning a future memorial or celebration of life.

**Helpful Tips**

* **Clarify Attendance** – Let people know if the burial is private or open to all.  
* **Ask for Assistance** – A family member or friend can help share details.  
* **Encourage Support** – Even if not attending, loved ones may want to offer condolences in other ways.

Providing burial details in a simple, clear way allows family and friends to honor your loved one while easing the burden on you`
  },
  
  // After Two Weeks section
  'life-insurance-payouts': {
    title: "Life Insurance Payouts",
    content: `If your loved one had life insurance, filing a claim can provide financial support.

- **Check for Policy Documents:** Look for policy papers or contact the insurance company.
- **Search for Lost Policies:** Use services like Policy Inspector or check unclaimed property databases.
- **File a Claim:** Submit the death certificate and required documents.

**Tips:**
- Check with past employers for workplace policies.
- Search multiple states for unclaimed policies.
- Review estate documents for payout instructions.`
  },
  'funeral-payment-plans': {
    title: "Funeral Home Payment Plans",
    content: `Many funeral homes offer payment options to ease the financial burden.

- **Payment Plans:** Ask about paying over time.
- **Life Insurance Assignments:** Some accept a deposit and wait for insurance payouts.
- **Credit & Debit Cards:** Most accept standard payment methods.

**Protect Yourself:**
- Know your rights under the FTC Funeral Rule.
- Avoid pressure sales tactics.
- Understand debt responsibilities.`
  },
  'fundly': {
    title: "Fundly",
    content: `Fundly is an easy-to-use crowdfunding platform for raising money for funeral expenses.

- **Create an Account:** Visit [www.fundly.com](https://www.fundly.com/).
- **Set Up Your Campaign:** Choose a title, set a goal, write a description, and add photos or videos.
- **Link Payment Information:** Connect your bank account.
- **Publish & Share:** Share via email, social media, and text.`
  },
  'snap-raise': {
    title: "Snap! Raise",
    content: `Snap! Raise makes it easy for groups to raise funds for memorial needs.

- **Create an Account:** Visit [www.snapraise.com](https://www.snapraise.com/).
- **Set Up Your Campaign:** Choose a title, set a goal, write a description, and add photos or videos.
- **Link Payment Information:** Connect your bank account.
- **Invite Others to Help:** Invite family or group members to participate.
- **Publish & Share:** Share via email, social media, and text.`
  },
  'fundrazr': {
    title: "FundRazr",
    content: `FundRazr is an easy-to-use platform for raising money for funeral expenses.

- **Create an Account:** Visit [www.fundrazr.com](https://www.fundrazr.com/).
- **Set Up Your Campaign:** Choose a title, set a goal, write a description, and add photos or videos.
- **Link Payment Information:** Connect your bank account.
- **Publish & Share:** Share via email, social media, and text.`
  },
  'facebook-fundraisers': {
    title: "Facebook/Instagram Fundraisers",
    content: `Facebook and Instagram make it easy to raise money with no platform fees.

- **Set Up Your Fundraiser:** Visit [www.facebook.com/fundraisers](https://www.facebook.com/fundraisers/) or use Instagram's "Create Fundraiser."
- **Choose a Title and Goal:** Write a description and add photos or videos.
- **Link Payment Information:** Funds go to a bank account or nonprofit.
- **Publish & Share:** Share via social media, messages, and email.`
  },
  'social-media-campaigns': {
    title: "Social Media Campaigns",
    content: `Social media can help raise awareness and support for funeral costs.

- **Choose a Platform:** Use Facebook, Instagram, X (Twitter), TikTok, or LinkedIn.
- **Create a Post:** Write a message, include a fundraiser link, and add photos or videos.
- **Use Hashtags & Tags:** Use hashtags like #MemorialFund and tag friends or groups.
- **Engage & Update:** Post updates and reply to comments.
- **Encourage Sharing:** Ask others to reshare your post.`
  },
  'funeral-consumers-alliance': {
    title: "The Funeral Consumers Alliance",
    content: `The Funeral Consumers Alliance helps families make cost-conscious funeral decisions.

- **Cost-Saving Guidance:** Learn to compare prices and avoid unnecessary expenses.
- **Know Your Rights:** Understand the FTC Funeral Rule.
- **Local Resources:** Find price surveys and advocacy through affiliates.

**Get Assistance:** Visit [www.funerals.org](https://www.funerals.org/).`
  },
  'modest-needs': {
    title: "Modest Needs",
    content: `Modest Needs provides short-term financial assistance for unexpected expenses like funerals.

- **One-Time Grants:** Covers urgent expenses.
- **No Repayment Required:** Funds go directly to service providers.
- **Help for Low-Income Families:** Supports those who may not qualify for traditional aid.

**Apply:** Visit [www.modestneeds.org](https://www.modestneeds.org/).`
  },
  'childrens-burial': {
    title: "Children's Burial Assistance",
    content: `Children's Burial Assistance helps families cover the cost of burying a child.

- **Financial Assistance:** Helps with burial or cremation costs.
- **Donated Burial Plots & Services:** Connects families with resources.
- **Support & Guidance:** Offers compassionate assistance.

**Apply:** Visit [www.childrensburial.org](https://www.childrensburial.org/).`
  },
  'community-groups': {
    title: "Local Community Groups",
    content: `Community organizations can provide practical and emotional support during a difficult time.

##### How They Can Help:

* **Local Nonprofits** – Some charities assist with funeral costs, groceries, or daily necessities.  
* **Neighborhood Support** – Community centers and social groups can help coordinate meal trains or other resources.

##### How to Find Help:

1. **Check Local Resources** – Visit nearby community centers or nonprofits.  
2. **Search Online** – Look for groups on **Facebook, Nextdoor, or [211.org](https://www.211.org/)** for assistance.  
3. **Ask for Recommendations** – Friends, family, or social workers may know of available resources.

Local groups can offer comfort and relief, helping ease burdens during this challenging time.`
  },
  'social-security-benefit': {
    title: "Social Security Lump-Sum Death Benefit",
    content: `The **Social Security Administration (SSA)** offers a one-time payment of $255 to help eligible family members with funeral costs.

##### Who Can Receive the Benefit?

* Surviving spouse who lived with the deceased.  
* If no spouse, a dependent child may qualify.

##### How to Apply:

1. **Call SSA at 1-800-772-1213** or visit your local SSA office.  
2. Have These Documents Ready:  
   * The deceased's Social Security number.  
   * Your ID and proof of relationship (marriage or birth certificate).

*Note*: Apply Within Two Years to remain eligible. For more details, visit [**www.ssa.gov**](https://www.ssa.gov/).

This benefit provides small but helpful financial support during a difficult time.`
  },
  'state-local-aid': {
    title: "State or Local Aid Programs",
    content: `Many state and local programs offer financial help for funeral and burial costs, especially for low-income families.

##### What Help May Be Available?

* **State Burial Assistance** – Some states offer funds for qualifying families.  
* **County or City Aid** – Local agencies may provide grants or reimbursements.  
* **Indigent Burial Programs** – Covers basic funeral costs for those in need.

##### How to Apply:

1. **Check Your State's Program** – Visit your state's **Department of Human Services** website.  
2. **Gather Required Documents:**  
   * Death certificate.  
   * Proof of income or financial need.  
   * Funeral expense details.  
3. **Submit an Application** – Deadlines and eligibility vary by location.

To find assistance near you, visit [**www.benefits.gov**](https://www.benefits.gov/) or contact your county's social services office.

These programs can help ease financial strain and ensure a dignified farewell.`
  },
  'bereavement-grants': {
    title: "Bereavement Grants or Stipends",
    content: `Some government programs offer financial assistance to help with funeral and burial costs.

##### What Help May Be Available?

* **State or Local Grants** – Assistance for low-income families in some areas.  
* **Veterans Benefits** – The **VA** provides burial stipends for eligible veterans.  
* **Workers' Compensation** – If the death was work-related, benefits may be available.

##### How to Apply:

1. **Check Eligibility** – Visit your state's **Department of Human Services** or local benefits office.  
2. **Gather Required Documents:**  
   * Death certificate.  
   * Proof of income or military service (if applicable).  
   * Funeral expense details.  
3. **Submit an Application** – Deadlines and requirements vary by program.

For more information, visit [**www.benefits.gov**](https://www.benefits.gov/) or contact your local assistance office.

These programs can provide financial relief during this difficult time.`
  },
  'federal-employee-benefits': {
    title: "Federal Employee Benefits",
    content: `If your loved one was a federal employee or retiree, their survivors may be eligible for financial benefits.

##### Available Benefits:

* Survivor Annuities – Ongoing payments for a spouse or dependent children.  
* FEGLI Life Insurance – Lump-sum payout if covered under Federal Employees' Group Life Insurance (FEGLI).  
* Thrift Savings Plan (TSP) – Funds may be available to named beneficiaries.  
* Unused Leave Payout – Payment for accrued but unused annual leave.

##### How to Apply:

1. **Contact the Office of Personnel Management (OPM):**  
   * Call **1-888-767-6738** or visit [**www.opm.gov**](https://www.opm.gov/).  
2. **Gather Required Documents:**  
   * Death certificate.  
   * Proof of relationship (marriage or birth certificate).  
   * Employee service records or benefits statements.  
3. **Submit Claims:**  
   * Follow OPM's process for survivor benefits and insurance payouts.  
   * For TSP benefits, visit [**www.tsp.gov**](https://www.tsp.gov/).

These benefits can provide important financial support for surviving family members.`
  },
  'veterans-benefits': {
    title: "Veterans Benefits",
    content: `If your loved one was a veteran who has passed away, you may be eligible for benefits. Here's how to apply:

##### How to Apply for Veterans Benefits

1. **Apply Online**  
   Visit the U.S. Department of Veterans Affairs [official site](https://www.benefits.va.gov/compensation/claims-special-burial.asp) to check your eligibility and apply online.  
2. **Submit a Paper Application**  
   Download and complete the [**Application for Burial Allowance**](https://www.vba.va.gov/pubs/forms/VBA-21P-530EZ-ARE.pdf), then mail it to:  
   Department of Veterans Affairs  
   Pension Intake Center  
   PO Box 5365  
   Janesville, WI 53547-5365  
3. **Work with an Accredited Representative**  
   You may also choose to work with an [accredited representative](https://www.va.gov/get-help-from-accredited-represent) for assistance in filing.  
4. **Submit in Person**  
   Visit your local regional benefits office and submit your application for processing. Click [here](https://www.benefits.va.gov/benefits/offices.asp) for locations.`
  },
  'employer-benefits': {
    title: "Employer or Union Benefits",
    content: `If your loved one was employed or a union member, financial benefits may be available to help with expenses.

##### Possible Benefits:

* Life Insurance Payout – Many employers provide group life insurance.  
* Final Pay & Accrued Benefits – Includes unpaid wages, vacation time, or bonuses.  
* Retirement or Pension Plans – Surviving spouses or dependents may qualify.  
* Union Death Benefits – Some unions offer burial assistance or survivor payments.

##### How to Apply:

1. **Contact the Employer or Union** – Ask about available benefits and how to apply.  
2. **Gather Required Documents:**  
   * Death certificate.  
   * Proof of relationship (marriage or birth certificate).  
   * Employee ID or union membership details.  
3. **Submit Claims** – Follow their process to receive eligible benefits.

Employer and union benefits can provide important financial support during this difficult time.`
  },
  'union-assistance': {
    title: "Assistance through Employee Unions",
    content: `If your loved one was a union member, their union may offer financial support and other benefits to help during this difficult time.

##### Possible Benefits:

* Funeral & Burial Assistance – Some unions help cover funeral costs.  
* Survivor Benefits – Dependents may qualify for financial support.  
* Pension & Retirement Funds – Spouses or beneficiaries may receive payouts.  
* Legal & Counseling Support – Some unions provide grief counseling or legal aid for estate matters.

##### How to Apply:

1. **Contact the Union** – Ask about available benefits and the application process.  
2. **Gather Required Documents:**  
   * Death certificate.  
   * Union membership details.  
   * Proof of relationship (marriage or birth certificate).  
3. **Submit Claims** – Follow the union's process to receive eligible benefits.

Union support can provide financial relief and guidance when it's needed most.`
  },
  'meal-train': {
    title: "Meal Train",
    content: `A **Meal Train** helps coordinate meal deliveries, easing the burden on grieving families.

##### How It Helps:

* Ensures the family has home-cooked meals or food deliveries.  
* Reduces stress by organizing a meal schedule.  
* Allows friends, family, and the community to offer meaningful support.

##### How to Set Up a Meal Train:

1. **Choose a Platform** – Use [**www.mealtrain.com**](https://www.mealtrain.com/) or create a shared schedule.  
2. **Gather Details** – Note dietary preferences, delivery instructions, and meal drop-off times.  
3. **Share with Others** – Invite family, friends, or community members to participate.

A meal train provides comfort and nourishment, allowing the family to focus on healing.`
  },
  'grocery-delivery': {
    title: "Grocery Delivery Services",
    content: `Grocery delivery ensures families have essentials without the stress of shopping during a difficult time.

##### How It Helps:

* Provides fresh groceries without leaving home.  
* Saves time and energy when daily tasks feel overwhelming.  
* Allows friends and family to send groceries as a gesture of support.

##### Popular Delivery Options:

* **Instacart** – Same-day delivery from local stores ([**www.instacart.com**](https://www.instacart.com/)).  
* **Amazon Fresh** – Grocery delivery through Amazon ([**www.amazon.com/fresh**](https://www.amazon.com/fresh/)).  
* **Walmart+** – Free grocery delivery with membership ([**www.walmart.com/grocery**](http://www.walmart.com/grocery)).  
* **Local Stores** – Many grocery chains offer online ordering and delivery.

##### How to Get Assistance:

1. **Order Online** – Place an order for home delivery.  
2. **Share a Grocery List** – Let friends or family know what's needed.  
3. **Use Gift Cards** – Many services allow gift cards, making it easy for others to help.

Grocery delivery offers a simple way to provide nourishment and support when it's needed most.`
  },
  'caring-bridge': {
    title: "Caring Bridge",
    content: `**CaringBridge** is an online platform that helps coordinate meal support for families in need.

##### How It Helps:

* Allows loved ones to organize meal deliveries in one place.  
* Reduces stress by scheduling meal drop-offs and tracking contributions.  
* Provides a private space for updates and messages of support.

##### How to Get Started:

1. **Create a CaringBridge Page** – Sign up at [**www.caringbridge.org**](https://www.caringbridge.org/).  
2. **Set Up a Meal Calendar** – Share meal preferences, dietary needs, and delivery instructions.  
3. **Invite Friends & Family** – Loved ones can sign up to bring meals or send gift cards.

Using CaringBridge makes it easier for friends and family to offer meaningful meal support during a difficult time.`
  },
  'choose-funeral-home': {
    title: "Choosing a Funeral Home",
    content: `Selecting a funeral home or cremation provider is an important step in ensuring your loved one is cared for with dignity and respect. Being informed can also help you avoid unnecessary costs or high-pressure sales tactics, allowing you to make the best choices for your family.

**Steps to Choose a Provider**

1. **Decide on Services**  
   * Will there be a burial or cremation?  
   * Do you want a viewing, memorial service, or direct disposition?  
2. **Ask for Recommendations**  
   * Hospice providers, veterans' organizations, or unions may have preferred providers or benefits.  
   * Search online for licensed funeral homes with positive reviews.  
3. **Compare Costs and Services**  
   * Funeral homes must provide **clear, upfront pricing** under the **FTC Funeral Rule**.  
   * Request a **General Price List** and compare service options to ensure transparency.  
4. **Discuss Payment Options**  
   * Some providers allow installment plans or delayed payment while waiting for life insurance.  
   * If cost is a concern, ask the provider about financial assistance programs or state-funded resources.

**Important Considerations**

* **Watch for High-Pressure Sales Tactics**  
  * You are **not required** to buy all services from the same provider.  
  * Reputable providers will respect your decisions without pushing unnecessary services.  
* **Understand Financial Responsibilities**  
  * You are **not personally responsible for a loved one's debts** unless you were a co-signer or joint account holder.  
  * If no co-signer exists, debts are typically **paid from the estate** rather than by family members.  
  * Utility bills may need to be covered by the next of kin if someone continues living in the home.  
  * If lenders pressure you for immediate payment, consult an estate attorney before agreeing to anything.`
  },
  'determine-will': {
    title: "Finding if there is a Will or if Probate is Necessary",
    content: `Understanding whether your loved one left a will and if probate is required are important early steps in managing their affairs.

**Steps to Determine Their Wishes**

1. **Check for a Will**  
   * Look in safe deposit boxes, home files, or contact their attorney.  
   * Search for important documents like bank accounts, property deeds, and life insurance policies.

**Is Probate Required?**

Probate is the legal process of settling an estate. It may be required if:

* No will exists.  
* The will is invalid or contested.  
* Additional legal oversight is necessary.  
* Named beneficiaries have passed away.

**When Probate May Not Be Needed**

* Assets are in joint ownership (e.g., shared bank account or home).  
* A living trust holds the assets.  
* Beneficiaries are named on life insurance or retirement accounts.  
* The estate qualifies for a small estate exemption (varies by state).

**What to Expect in Probate**

* **File with the court** – Submit a petition, death certificate, and estate documents.  
* **Validate the will** – Confirm legality and appoint an executor.  
  * *Note*: Once the will is validated, the court will issue a **Letter of Testamentary**, which authorizes the executor to act on behalf of the estate.  
* **Notify heirs & creditors** – Officially inform all relevant parties.  
* **Inventory assets** – Appraise and report assets to the court.  
* **Pay debts & taxes** – Settle outstanding balances.  
* **Distribute assets** – Follow the will or state law.  
* **Close the estate** – File final paperwork and pay any fees.

**How Long Does Probate Take?**

* Simple cases: A few months.  
* Complex cases: A year or more.`
  },
  'obtain-certificate': {
    title: "Obtaining a Death Certificate",
    content: `Death certificates are essential legal documents needed for many tasks after a loved one's passing.

**Ways to Request a Death Certificate:**

* **Online:** Use services like VitalChek for quick access.  
* **By Mail:** Submit a form, ID, and fee to your local vital records office.  
* **In Person:** Visit the office or county clerk's office where the death occurred.  
* **Through a Funeral Home or Attorney:** They can handle the request on your behalf.

**Important Information:**

* Know the state and county where the death occurred.  
* You'll need to provide ID to confirm your relationship to the deceased (funeral directors and attorneys are exempt).  
* Fees range from $10-$25, with expedited options for mail requests.

*Note:* Order multiple copies as you'll need them for various legal and administrative tasks.`
  },
  'multiple-copies': {
    title: "Obtaining Multiple Copies of Death Certificates",
    content: `Most families need multiple copies of a death certificate to settle various accounts and claims. Having enough copies on hand can save time and stress.

**How Many Copies You'll Need:**

* **5-10 copies** is typically sufficient for most families.
* **10-15 copies** may be needed for complex estates with multiple accounts, properties, or investments.

**Where You'll Need Death Certificates:**

* **Financial Institutions** – Banks, investment firms, and mortgage companies.
* **Government Agencies** – Social Security Administration, Veterans Affairs, DMV.
* **Insurance Companies** – Life insurance, health insurance, auto insurance.
* **Property Transfers** – Real estate, vehicles, and other titled property.
* **Credit Accounts** – Credit cards, loans, and utilities.

**Important Tips:**

* **Request certified copies** with official seals, as many organizations require originals.
* **Keep track of where you send them** – Some institutions may return the certificate, while others will keep it.
* **Order more than you think you need** – It's easier to get them all at once rather than ordering more later.

Having sufficient copies will help you efficiently manage the administrative tasks following your loved one's passing.`
  },
  'write-obituary': {
    title: "How to Write an Obituary",
    content: `An obituary is a written notice to inform others of your loved one's passing. It commemorates their life, achievements, and legacy, while also sharing details about memorial services and funeral arrangements.

**What to Include:**

1. **Basic Information**  
   * Full name (including nicknames or maiden names), age, date, time (optional), and place of death.  
   * Cause of death (optional).  
2. **Family Details**  
   * List surviving family members in order of priority (spouse, children, siblings, etc.).  
   * Mention any predeceased loved ones.  
3. **Life Information**  
   * Birthdate and place of birth.  
   * Education and achievements.  
   * Hobbies, passions, and charitable work.  
   * Personal qualities (e.g., kindness, humor, intelligence).  
4. **Funeral/Memorial Service Details**  
   * Include the date, time, and location of the service.  
   * Any special requests (e.g., donations, family wishes).  
5. **Final Statement**  
   * Express gratitude to those who offered care or support.`
  },
  'facebook-memorial': {
    title: "Facebook Memorial Page",
    content: `Facebook allows you to convert a loved one's profile into a memorial page, creating a space where friends and family can share memories while keeping the account secure.

**How to Request a Memorial Page:**

1. **Decide on Timing**  
   * If you need to use the account for funeral updates, consider waiting before making the request.  
2. **Submit a Request**  
   * Go to [Facebook's Memorialization Request Form](https://www.facebook.com/help/contact/234739086860192).  
   * Provide the deceased's full name, date of passing, and a link to their profile.  
   * Upload proof of death (e.g., death certificate).

**What Happens Next:**

* The page stays visible, but no one can log in or change it.  
* "Remembering" will appear next to their name.  
* Friends and family can continue posting tributes and viewing past content.

A memorialized page offers a lasting space to honor your loved one and provide comfort for those who knew them.`
  },
  'legacy-publish': {
    title: "Legacy.com",
    content: `Legacy.com is one of the most widely used online obituary platforms in the U.S., allowing you to publish an obituary, share memories, and invite friends and family to leave condolences.

**How to Publish an Obituary on Legacy.com:**

* **Check for an Existing Obituary**  
  * Many funeral homes post obituaries directly on Legacy.com. Search for your loved one's name at [Legacy.com](https://www.legacy.com/) before creating a new listing.  
* **Submit an Obituary**  
  * If an obituary has not been posted, you can submit one through [Legacy.com's obituary submission page](https://www.legacy.com/obituaries/submit/).  
  * Choose from hundreds of newspapers to publish in or post directly on the site.  
  * Provide the deceased's name, obituary details, and an optional photo.  
* **Complete the Submission**  
  * Follow Legacy.com's prompts to finalize and submit your obituary. Some newspapers may require direct submissions through their websites.

**What Happens Next:**

* The obituary will be publicly available for friends and family to view.  
* Visitors can leave condolences, share memories, and upload photos.  
* Some listings may offer fundraising options for funeral expenses.

Legacy.com provides a lasting tribute where loved ones can gather, remember, and celebrate a life well lived.`
  },
  'newspaper-submit': {
    title: "Newspaper Obituaries",
    content: `Publishing an obituary in a local newspaper is a meaningful way to honor a loved one and inform the community. Each newspaper has its own guidelines, so check their requirements before submitting.

**How to Submit a Newspaper Obituary:**

1. **Contact the Newspaper**  
   * Visit the newspaper's website or call to ask about submission rules, deadlines, and formatting.  
2. **Confirm Pricing**  
   * Most newspapers charge by word count or per day of publication.  
   * Request a cost estimate in advance to avoid unexpected fees.  
3. **Gather Key Information**  
   * Full name of the deceased  
   * Predeceased and surviving family members  
   * Life details (career, education, military service, organizations)  
   * Funeral or memorial service details  
   * Donation requests, if applicable  
4. **Submit and Review**  
   * Follow the newspaper's instructions for submitting online, by email, or in person.  
   * Request a proof or confirmation to ensure accuracy before publication.

A newspaper obituary provides a lasting tribute and helps bring the community together in remembrance.`
  },
  'gather-info': {
    title: "Gather Important Information About a Loved One",
    content: `After a loved one's passing, certain documents are needed to handle financial, legal, and personal matters. Gathering them early can help ease the process.

**Documents to Collect:**

* **Legal & Financial** – Will or trust, tax returns, deeds, bank statements, loan records, and investment accounts.  
* **Identification & Personal Records** – Birth and marriage certificates, Social Security number, military discharge papers, and divorce records.  
* **Insurance & Benefits** – Life insurance policies, employer benefits, 401(k), and HR documents.  
* **Household & Accounts** – Utility bills, vehicle titles, treasury bonds, and lists of online accounts and passwords.

**Helpful Tips:**

* **Check the Mail** – Monitor mail for at least a month to identify outstanding bills and accounts.  
* **Secure Everything** – Keep documents in a safe place and avoid mailing originals. If necessary, make copies and use tracking for important items.

Having these records organized can help ensure that financial and legal matters are handled smoothly, reducing stress during this difficult time.`
  },
  'collect-memories': {
    title: "Collecting Memories and Information for Funeral or Memorial Service",
    content: `A meaningful service honors your loved one's life and the impact they had on others. Gathering memories, photos, and personal details can help create a heartfelt tribute.

**Ways to Personalize the Service:**

* **Ask Family & Friends** – Invite loved ones to share stories and special memories.  
* **Gather Photos & Mementos** – Create a display of meaningful pictures and keepsakes.  
* **Make a Tribute Video** – Combine photos and videos into a slideshow to share at the service.

**Personal Details to Include:**

* Favorite quotes, scriptures, or music that meant something to them.  
* Education & career, including volunteer or charitable work.  
* Major accomplishments or defining moments.  
* Hobbies & passions, such as travel, pets, or special interests.

These thoughtful touches help create a service that truly reflects and honors your loved one's life.`
  },
  'arrange-officiant': {
    title: "Arrange for an Officiant or Clergy",
    content: `Choosing someone to lead the funeral or memorial service helps set the tone for a meaningful tribute.

**Options for Officiating the Service:**

* **Religious Leader** – A religious leader can lead a faith-based service.  
* **Funeral Home Officiant** – Many funeral homes provide non-religious officiants to guide the ceremony.  
* **Family or Friend** – A loved one can lead the service, offering personal reflections and shared memories.

**Things to Discuss with the Officiant:**

* The structure and tone of the service.  
* Readings or special tributes.  
* Personal stories or messages to honor your loved one.

Selecting the right officiant ensures a service that reflects your loved one's beliefs, values, and the memories they leave behind.`
  },
  'arrange-music': {
    title: "Arranging Music",
    content: `Music can bring comfort and meaning to a funeral or memorial service. Choose selections that reflect your loved one's life and beliefs and create a peaceful atmosphere.

**Options for Including Music:**

* **Play Recorded Music** – Use a Bluetooth speaker or venue sound system.  
* **Group Singing** – Choose meaningful, familiar songs for attendees to sing together.  
* **Live Performances** – Invite family or friends to sing or play an instrument.  
* **Hire a Musician** – Consider a professional singer or instrumentalist.

A thoughtful music selection can provide a touching tribute and bring a sense of connection to those gathered.`
  },
  'life-insurance': {
    title: "Life insurance",
    content: `If your loved one had life insurance, filing a claim can help provide financial support to beneficiaries.

**How to Locate and Claim Life Insurance Benefits:**

1. **Check for Policy Documents**  
   * Look for policy papers, bills, or declaration pages in personal files.  
   * Contact the insurance company or check their website for claim instructions.  
2. **Search for Lost or Unclaimed Policies**  
   * If no policy is found but you believe one exists, services like **Policy Inspector** can help locate missing policies (fees may apply).  
   * Check **unclaimed property databases** through the [National Association of Unclaimed Property Administrators](https://www.unclaimed.org/) for unclaimed benefits.  
3. **File a Claim**  
   * Submit the death certificate and any required beneficiary documents.  
   * Follow the insurance company's process for claim approval and payout.

**Helpful Tips:**

* **Check with past employers** – Some policies are offered through workplace benefits.  
* **Search multiple states** where your loved one lived for unclaimed policies.  
* **Review estate documents** to confirm how payouts should be handled.

Taking these steps ensures any life insurance benefits are claimed smoothly and used according to your loved one's wishes.`
  },
  'gofundme': {
    title: "GoFundMe",
    content: `GoFundMe is an easy and widely-used platform for raising funds quickly. It's great for reaching a broad audience and getting support during difficult times.

**How to Set Up a GoFundMe Campaign**

1. **Create an Account**  
   * Go to the GoFundMe website and click "Start a GoFundMe."  
   * Sign up using your email, Facebook, or Google account.  
2. **Set Your Fundraising Goal**  
   * Decide how much money you need.  
   * GoFundMe doesn't charge to create a fundraiser, but they take a small percentage from donations.  
3. **Choose a Title & Share Your Story**  
   * Pick a clear, concise title that describes your cause.  
   * Share the details of your situation and why you're raising money.  
   * Be specific and personal, and include photos or videos to help others connect with your story.  
4. **Add a Profile Picture**  
   * Upload a photo of yourself, your family, or something meaningful to your cause to personalize your campaign.  
5. **Set Up Bank Information**  
   * Provide your bank details to receive donations.  
   * Follow the prompts to set this up.  
6. **Choose a Category**  
   * Select a category that best fits your fundraiser.  
7. **Review & Publish**  
   * Review your campaign to ensure everything is accurate.  
   * When you're ready, click "Publish" to make it live.  
8. **Share Your Campaign**  
   * Share your campaign link with friends, family, and on social media.Regular updates can encourage more donations.`
  },
  'givebutter': {
    title: "Givebutter",
    content: `GiveButter makes fundraising simple and personal. You can share your story with photos and videos, and offer options for one-time or recurring donations.

**How to Start a GiveButter Fundraiser**

1. **Create an Account:**  
   * [Sign up](https://givebutter.com/signup) with your email, Google account, or other options. If you already have an account, simply [log in](https://givebutter.com/login).  
2. **Select Your Cause:**  
   * Choose "fundraising for a cause" if it's a personal fundraiser.  
3. **Set Up Your Campaign Page:**  
   * Choose a clear title and set your fundraising goal.  
   * Write a brief campaign description explaining why you're raising money and how the funds will be used.  
   * Add images or videos to help tell your story. The cover photo should reflect your cause.  
4. **Donation Tiers (Optional):**  
   * Set donation tiers (e.g., $25, $100) and explain how each amount will help (e.g., "$100 covers a portion of funeral costs" or "$50 helps with memorial service expenses").  
5. **Customize Your URL (Optional):**  
   * Edit your campaign URL to make it more relevant to your cause.  
6. **Set Up Payment Information:**  
   * Link your bank account and set up a Stripe account for payments.  
   * Choose how you want to accept donations (e.g., credit/debit, PayPal, Apple Pay).  
   * Decide if you want to accept one-time or recurring donations.  
7. **Publish & Share:**  
   * Preview your campaign, then click "Publish."  
   * Share your fundraiser on social media and by email to reach potential donors.`
  },
  'donorbox': {
    title: "Donorbox",
    content: `Donorbox is a straightforward option for accepting donations. It's quick to set up and easy to manage, letting you focus on what matters most.

**How to Start a Donorbox Fundraiser**

1. **Create an Account**  
   * Sign up with your email or log in if you already have an account.  
2. **Choose Your Campaign Type**  
   * Click **"Create a Campaign"** or **"Create a Donation Form"**.  
   * Select **"One-time donations"** or **"Recurring donations"** for ongoing support.  
   * Choose **"Custom campaign"** if you want more flexibility for your fundraiser.  
3. **Set Up Your Campaign Page**  
   * **Title & Goal:** Choose a meaningful title and set a clear fundraising goal.  
   * **Description:** Write a brief, heartfelt explanation of your story and why you need support.  
   * **Images/Videos:** Add photos or videos to connect with potential donors.  
4. **Customize Donation Options**  
   * Decide whether you want to offer default donation amounts or allow donors to choose their own.  
5. **Link Your Payment Information**  
   * Set up PayPal or another payment processor to accept donations.  
6. **Personalize Your Page**  
   * Customize the look of your page with color schemes, themes, and a cover photo that reflects your cause.  
7. **Preview & Publish**  
   * Review your campaign to ensure everything looks good.  
   * Click **"Publish"** to make your fundraiser live.  
8. **Share & Promote**  
   * Share your campaign link via email and social media to spread the word.`
  },
  'classy': {
    title: "Classy",
    content: `Classy offers customizable fundraising options, perfect for those who want to personalize their campaign or include different ways for people to help, like events or peer-to-peer fundraising.

**How to Set Up a Fundraiser on Classy**

1. **Sign Up or Log In**  
   * Visit the Classy website, create an account, or log in if you already have one.  
2. **Choose Your Campaign Type**  
   Select the option that fits your needs:  
   * **Donation Page**: A simple, one-page form for direct donations.  
   * **Peer-to-Peer Campaign**: Let friends and family create individual fundraising pages in support of your cause.  
   * **Event Fundraiser**: Tie donations to a memorial or other event.  
   * **Recurring Donations**: For ongoing monthly contributions.  
3. **Set Up Your Campaign**  
   * **Campaign Name & Goal**: Choose a meaningful title and set a fundraising goal.  
   * **Description**: Share your personal story and explain why you're raising funds.  
   * **Campaign Duration**: Set a start and end date if applicable.  
4. **Customize Your Page**  
   * Add photos, videos, and text to tell your story.  
   * Personalize the page's look with color schemes and banners.  
5. **Set Up Payment Information**  
   * Link a payment processor to securely receive donations.  
6. **Set Up Communication**  
   * Personalize automatic thank-you messages and set up updates to keep your donors informed.  
7. **Preview & Launch**  
   * Review your page and test the donation process.  
   * Once ready, click **"Publish"** to make your campaign live.  
8. **Share Your Campaign**  
   * Share the campaign link via email, social media, and other channels to maximize support.`
  },
  // Add popup content for financial and postal accounts
  'bank-accounts': {
    title: "Bank Accounts",
    content: `After the loss of a loved one, promptly addressing their financial accounts helps prevent fraud and ensures their affairs are settled properly.

#### How to Manage Bank Accounts

**1. Locate Accounts**

* **Check Documents:** Search through physical or electronic documents for bank statements.  
* **Contact the IRS:** If you're the executor, request the deceased's tax return to identify bank accounts.  
* **Contact Banks:** Use the deceased's death certificate to inquire at banks if you're unsure where accounts were held.

**2. Gather Required Documents**

* **Essential Requirements:** Obtain the deceased's death certificate, your identification, and (if you're the executor), the official appointment letter.  
* **Bank-Specific Requirements:** Check with each bank for any additional needed documents.

**3. Close Accounts**

* **Direct Closure:** Present the necessary documents at the bank to close the accounts.  
* **Joint Accounts:** Submit the death certificate to remove the deceased from any joint accounts.

**4. Check for Beneficiaries**

* **Verify Beneficiary:** Contact the bank to determine if you or others are listed as a beneficiary.  
* **Claim Funds:** Provide your ID and the deceased's death certificate, and complete any additional forms required to access the funds.`
  },
  'credit-cards': {
    title: "Credit or Debit Cards",
    content: `When a loved one passes away, managing their credit card accounts promptly and correctly can help avoid complications.

#### Steps to Close Card Accounts:

1. **Compile a List of Cards:**  
   * Gather information on all credit and debit cards by consulting with family, reviewing bank statements, and checking mail.  
2. **Obtain the Death Certificate:**  
   * Secure a copy of the death certificate, as it's essential for closing any financial accounts.  
3. **Contact the Credit Card Company:**  
   * **If You Are an Account Manager or Co-Owner**: Inform the issuer of the death, send them the death certificate, and refrain from making new charges.  
   * **If You Are Not a Co-Owner**: You can still notify the issuer by sending the death certificate. Be prepared that you may not get detailed account information.  
   * **If You Are the Executor and Need More Authority**: Obtain a Letter of Testamentary from probate court to legally manage and settle the accounts.  
4. **Handle Outstanding Balances:**  
   * Ensure that any outstanding balances are settled by the co-owners or the executor of the estate.`
  },
  'postal-mail': {
    title: "Postal Mail",
    content: `Managing mail after a loved one's passing prevents missed documents, unwanted mail, and potential fraud.

### Redirecting Mail

* **Forward Mail** – Request a temporary address change through [USPS](https://www.usps.com/manage/forward.htm) if you need to receive their mail.  
* **Required Documents** – A death certificate, proof of executor status, and a completed **USPS Change of Address Form 3575**.

### Stopping Unwanted Mail

* **Deceased Do Not Contact List** – Register to reduce marketing mail.  
* **Return to Sender** – Write *"Deceased – Return to Sender"* on unnecessary mail to help stop future deliveries.

### Discontinuing Mail Service

* **Request a Stop in Service** – Notify the post office if mail is no longer needed at their address.  
* **Bring Documentation** – A death certificate, proof of executor authority, your ID, and the deceased's mailing address.

Taking these steps ensures important documents reach the right person while reducing unnecessary mail and stress.`
  },
  'digital-accounts': {
    title: "Digital Accounts",
    content: `Closing or securing a loved one's digital accounts helps protect their privacy and prevent identity theft.

### Gather Important Information:

* **Death Certificate** – Many companies require a copy.  
* **List of Accounts** – Email, social media, financial services, and subscriptions.  
* **Usernames & Passwords** – If available.  
* **Proof of Relationship** – Some platforms require legal documents.  
* **Court Order** – Needed for Apple iCloud access.

### Closing or Memorializing Accounts:

#### Email Accounts:

* **Google (Gmail)** – Use [Inactive Account Manager](https://myaccount.google.com/inactive) or request closure.  
* **Microsoft (Outlook)** – Allows closure with proof of death.

#### Social Media Accounts:

* **Facebook & Instagram** – Can be memorialized or deleted with proof of death.  
* **Twitter/X** – Allows account deactivation requests.  
* **LinkedIn** – Offers a request form for closure.

#### Apple & Google Accounts:

* **Apple (iCloud)** – Requires a court order for access.  
* **Google** – May allow access based on company policies.

Each platform has its own process, so checking individual policies is important. These steps help ensure accounts are handled respectfully and securely.`
  },
  'credit-bureaus': {
    title: "Credit Bureaus",
    content: `Reporting a loved one's passing to credit bureaus helps prevent identity theft and ensures accounts are properly updated.

### Steps to Notify Credit Bureaus:

1. **Gather Required Documents:**  
   * Certified copy of the death certificate (not the original).  
   * Proof of authority (executor paperwork, probate court documents, or will).  
   * Your government-issued ID and contact information.  
2. **Send a Written Request:**  
   * Provide the deceased's full name, Social Security number, date of birth, date of death, and last known address.  
   * Request a deceased alert be placed on their file and a final credit report.  
3. **Review & Resolve Accounts:**  
   * Confirm all accounts are marked as deceased.  
   * Pay outstanding balances only if you are legally responsible (co-signer or joint account holder).  
4. **Report Any Suspicious Activity:**  
   * If you suspect fraud, notify Equifax, Experian, and TransUnion immediately.

### Where to Send Requests:

* [Equifax Deceased Notification](https://www.equifax.com/)  
* [Experian Deceased Report](https://www.experian.com/)  
* [TransUnion Deceased Notification](https://www.transunion.com/)

Taking these steps protects your loved one's identity and prevents unauthorized activity on their accounts.`
  },
  'home-payment': {
    title: "Rent/Home Payment",
    content: `Handling a loved one's rent or mortgage ensures financial obligations are properly managed and prevents unnecessary payments.

### For Rent Payments:

1. **Notify the Landlord or property manager**: They may require a death certificate to process the lease termination.  
2. **Review the Lease Agreement:** Check for early termination clauses— some leases allow penalty-free termination.  
3. **Coordinate with the Estate Executor**: The executor will handle any final payments and lease responsibilities.  
4. **Remove Belongings and Return Keys**: Arrange to clear out personal items before ending the lease.
5. **Stop Automatic Payments**: Cancel any automated rent payments to prevent further deductions.

### Required Documents: 

* Death Certificate  
* Lease Agreement  
* Executor or Next-of-Kin Authorization   
* Written notice to terminate the lease  
* Final utility bills (to settle or transfer)

### For Mortgage Payments:

1. **Notify the Lender**:   
   * Provide a death certificate to update the account and discuss next steps.  
2. **Check for Mortgage Life Insurance**:   
   * Some loans have insurance that may cover the remaining balance.  
3. **Determine who is responsible**   
   * Co-signers or co-borrowers remain responsible for payments.  
   * If no co-signer exists, the estate or heirs will handle the mortgage.  
4. **Decide on the property's future**

Options include:

* Assuming the loan  
* Refinancing  
* Selling the home to settle the mortgage.  
5. **Stop automatic payments**  
   * Pause autopay to avoid deductions until financial matters are resolved.  
6. **Consult a Probate Attorney**  
   * If the estate is in probate, legal guidance can clarify responsibilities and next steps.

### Required Documents:

* Death Certificate  
* Mortgage Statement  
* Will or Probate Documents  
* Property Deed  
* Homeowners Insurance Policy  
* Financial Power of Attorney (if applicable)  
* Bank Statements  
* Mortgage Life Insurance Policy (if applicable)

Taking these steps ensures rent or home payments are managed properly while easing financial burdens during this difficult time.`
  },
  'electric': {
    title: "Electric Company",
    content: `Notifying the electric company ensures service continues if needed or is properly closed to prevent extra charges.

### Steps to Take:

1. **Gather Required Documents:**  
   * Certified copy of the death certificate.  
   * Proof of authority (executor paperwork or legal documents).  
   * Recent **electric bill** with the account number.  
   * Your government-issued ID.  
2. **Contact the Electric Provider:**  
   * Call the provider and inform them of the passing.  
   * Request one of the following:  
     * **Transfer service** to a surviving household member.  
     * **Close the account** once the balance is paid.  
3. **Notify the Estate Executor:**  
   * Ensure they are aware of any final bills or refunds.

Taking these steps helps prevent service disruptions and unnecessary costs.`
  },
  'gas': {
    title: "Gas Company",
    content: `Notifying the gas company ensures service is properly transferred or shut off to prevent extra charges or safety concerns.

### Steps to Take:

1. **Gather Required Documents:**  
   * Certified copy of the death certificate.  
   * Proof of authority (executor or administrator documents).  
   * Recent gas bill with the account number.  
   * Your government-issued ID.  
2. **Contact the Gas Provider:**  
   * Inform them of the passing and request either:  
     * **Transfer service** to a surviving household member.  
     * **Cancel service** if the property is unoccupied.  
3. **Settle the Final Bill:**  
   * Request a **final bill** and confirm the disconnection date.  
   * Ensure the property is prepared for gas shutoff, if needed.  
4. **Keep Confirmation Records:**  
   * Save any written confirmation of service changes or account closure.

Taking these steps ensures the account is properly handled, preventing disruptions or unnecessary charges.`
  },
  'phone': {
    title: "Phone Service",
    content: `Closing or transferring a loved one's phone service prevents unnecessary charges and ensures the account is properly handled.

### Steps to Take:

1. **Gather Required Documents:**  
   * Certified copy of the death certificate.  
   * Proof of authority (executor or administrator documents).  
   * Your government-issued ID.  
   * Account details (phone number, account number, or recent bill).  
2. **Contact the Phone Provider:**  
   * Notify them of the account holder's passing.  
   * Request to cancel or transfer service as needed.  
3. **Settle Any Outstanding Balances:**  
   * Any remaining balance is typically paid from the estate, not by family members unless they co-signed.  
   * If the phone was leased or financed, the provider may require it to be returned.  
4. **Request Written Confirmation:**  
   * Ensure the provider sends confirmation of account closure to prevent future charges.

Taking these steps provides peace of mind and avoids unexpected fees.`
  },
  'cable': {
    title: "Cable Bill/Streaming Services",
    content: `Closing or transferring a loved one's cable and streaming accounts prevents unnecessary charges and ensures services are handled properly.

### Streaming Services:

1. **Gather Account Details:**  
   * Email or username linked to the account.  
   * Payment method used for billing.  
   * Any available login credentials.  
2. **Cancel the Subscription:**  
   * If you have access, log in and cancel.  
   * If you don't have access, visit the provider's Help Center or call customer service. You may need a death certificate or proof of authority.  
3. **Stop Automatic Payments:**  
   * If cancellation isn't possible, contact the bank or credit card company to stop recurring charges.

### Cable Services:

1. **Gather Required Documents:**  
   * Certified copy of the death certificate.  
   * Proof of authority (executor or administrator documents).  
   * Your government-issued ID.  
   * Account details (billing statement, account number, or service address).  
2. **Contact the Provider:**  
   * Call customer service and request one of the following:  
     * **Cancel service** if no one is taking over the account.  
     * **Transfer service** to another household member.  
3. **Return Equipment:**  
   * Return any required devices (cable boxes, modems, routers) to avoid fees.

These steps help prevent unwanted charges and ensure accounts are properly closed or transferred.`
  },
  'dmv': {
    title: "DMV",
    content: `When a loved one passes away, it's important to cancel their driving license to prevent identity theft and fulfill legal requirements.

#### Steps to Cancel a License:

1. **Check State Regulations:** License cancellation procedures vary by state. Verify the specific requirements for your state's DMV.  
2. **Obtain the Death Certificate:** Ensure you have an official copy of the deceased's death certificate, as this is essential for cancellation.  
3. **Contact the DMV:**  
   * **In Person:** Make an appointment with the DMV, either online or by phone. Bring the death certificate and the deceased's license to your appointment. Confirm any additional documents required before your visit.  
   * **By Mail (if applicable):** Some states allow license cancellation by mail. Send a death certificate, a photocopy of the deceased's license, and a written request to close the license to the appropriate DMV office.`
  },
  'social-security': {
    title: "Social Security Administration",
    content: `Reporting a loved one's passing to the Social Security Administration (SSA) helps prevent identity theft and ensures any benefits are handled properly.

### Steps to Notify SSA:

1. **Check if the Funeral Home Reports the Death**  
   * Many funeral homes notify SSA as part of their process.  
   * Ask them to confirm they will report the death.  
2. **Call SSA if Needed**  
   * If the funeral home does **not** report the death, contact SSA directly at **1-800-772-1213**.  
   * SSA does **not** accept death notifications online or by email.  
3. **Have Required Information Ready**  
   * The deceased's Social Security number and date of birth.  
   * Other identifying details, if requested.

Notifying SSA ensures records are updated and helps prevent any complications with benefits.`
  },
  'execute-will': {
    title: "Executing the Will",
    content: `After a loved one's passing, the estate administrator must ensure the will is followed. Here are the key steps:

1. **Settle Debts and Liabilities**  
   * Identify and notify creditors.  
   * Pay any outstanding debts with estate funds.  
2. **Distribute Assets**  
   * Follow the instructions in the will to distribute the remaining assets.  
   * Make sure the distribution complies with state laws.  
3. **File the Will with the Probate Court**  
   * Take the will to the courthouse to be filed in the probate record.  
   * This step is required unless there is probate litigation.  
4. **Handle Probate Litigation (if applicable)**  
   * If heirs contest the will or if there's no will, seek legal help.  
   * Probate litigation can delay asset distribution.

For a more detailed guide on executing a will, including additional support resources, please visit our [full page](/learn/executing-will). Remember, seeking professional assistance can provide valuable support during this challenging time.`
  }
};

// Checklist data structure based on the markdown file
const checklistSections = {
  immediate: {
    title: 'Immediately After the Death of a Loved One',
    tasks: {
      notifications: {
        title: 'Notifications',
        subtasks: [
          { id: 'contact-family', title: 'Contacting Immediate Family' },
          { id: 'notify-friends', title: 'Notifying Close Friends and Extended Family' },
          { id: 'notify-doctor', title: "Notifying Decedent's Doctor" },
          { id: 'notify-employer', title: "Notifying Decedent's Employer" }
        ]
      },
      care: {
        title: 'Care',
        subtasks: [
          { id: 'care-children', title: "Decedent's Children" },
          { id: 'care-pets', title: 'Pet Care' }
        ]
      },
      wishes: {
        title: "Decedent's Wishes",
        subtasks: [
          { id: 'determine-wishes', title: "Determine Decedent's Wishes", hasLandingPage: true, landingPageUrl: '/learn/determining-wishes' }
        ]
      },
      body: {
        title: "Decedent's Body",
        subtasks: [
          { id: 'cremation-burial', title: 'Deciding on a Cremation or Burial', hasLandingPage: true, landingPageUrl: '/learn/understanding-remains-options' },
          { id: 'transport-body', title: 'Arranging Transportation of the Body', hasLandingPage: true, landingPageUrl: '/learn/body-transportation' }
        ]
      },
      funeral: {
        title: 'Funeral Home',
        subtasks: [
          { id: 'choose-funeral-home', title: 'Choosing a Funeral Home' }
        ]
      },
      will: {
        title: "Decedent's Will or Probate",
        subtasks: [
          { id: 'determine-will', title: 'Finding if there is a will or this will be probate', hasLandingPage: true, landingPageUrl: '/learn/finding-will' }
        ]
      },
      home: {
        title: "Decedent's Home",
        subtasks: [
          { id: 'home-care', title: "Arrange for care of Deceased's Home", hasLandingPage: true, landingPageUrl: '/learn/home-care' }
        ]
      },
      documents: {
        title: 'Documents',
        subtasks: [
          { id: 'gather-documents', title: 'Gathering Important Documents and Papers', hasLandingPage: true, landingPageUrl: '/learn/important-documents' }
        ]
      }
    }
  },
  withinDays: {
    title: 'Within Days of the Death of a Loved One',
    tasks: {
      deathCertificate: {
        title: 'Obtaining a Death Certificate',
        subtasks: [
          { id: 'obtain-certificate', title: 'Obtaining a Death Certificate' },
          { id: 'multiple-copies', title: 'Obtain Copies of Death Certificate' }
        ]
      },
      obituary: {
        title: 'Obituary Options',
        subtasks: [
          { id: 'write-obituary', title: 'Writing an Obituary', hasLandingPage: true, landingPageUrl: '/learn/write-obituary' },
          { id: 'facebook-memorial', title: 'Facebook Memorial Page' },
          { id: 'legacy-publish', title: 'Legacy.com' },
          { id: 'newspaper-submit', title: 'Newspaper obituaries' }
        ]
      },
      funeral: {
        title: 'Making Funeral Arrangements',
        subtasks: [
          { id: 'gather-info', title: 'Gather Info about loved one', hasLandingPage: true, landingPageUrl: '/learn/collecting-memories' },
          { id: 'collect-memories', title: 'Collecting Memories and Information for Funeral or Memorial Service' },
          { id: 'arrange-officiant', title: 'Arrange for official/clergy' },
          { id: 'arrange-music', title: 'Arrange Music' },
          { id: 'flowers-donations', title: 'Flowers or Donations', hasLandingPage: true, landingPageUrl: '/learn/flowers-donations' },
          { id: 'eulogies', title: 'Ask for Individuals to give Eulogies', hasLandingPage: true, landingPageUrl: '/learn/planning-eulogies' },
          { id: 'guest-book', title: 'Guest Book', hasLandingPage: true, landingPageUrl: '/learn/guest-book' },
          { id: 'share-arrangements', title: 'Sharing Funeral Service Arrangements with Friends and Family', hasLandingPage: true, landingPageUrl: '/learn/sharing-funeral-arrangements' }
        ]
      },
      burial: {
        title: 'Making Local Burial Arrangements',
        subtasks: [
          { id: 'local-burial', title: 'Arrangements for Local Burial', hasLandingPage: true, landingPageUrl: '/learn/local-burial' },
          { id: 'share-burial', title: 'Sharing Burial Service Arrangements with Friends and Family', hasLandingPage: true, landingPageUrl: '/learn/sharing-burial-arrangements' }
        ]
      },
      decedentHome: {
        title: "Decedent's Home",
        subtasks: [
          { id: 'home-care', title: "Arrange for care of the Deceased's Home", hasLandingPage: true, landingPageUrl: '/learn/home-care' }
        ]
      },
      documents: {
        title: "Documents",
        subtasks: [
          { id: 'gather-documents', title: "Gathering Important Documents and Papers", hasLandingPage: true, landingPageUrl: '/learn/important-documents' }
        ]
      },
      financialAssistance: {
        title: 'Financial Assistance',
        subtasks: [
          { id: 'life-insurance', title: 'Life Insurance' },
          { id: 'funeral-payment-plans', title: 'Funeral Home Payment Plans' }
        ],
        subCategories: {
          crowdfunding: {
            title: 'Crowdfunding Platforms',
            subtasks: [
              { id: 'gofundme', title: 'GoFundMe', hasLandingPage: true, landingPageUrl: '/learn/gofundme' },
              { id: 'fundly', title: 'Fundly', hasLandingPage: true, landingPageUrl: '/learn/fundly' },
              { id: 'givebutter', title: 'Givebutter', hasLandingPage: true, landingPageUrl: '/learn/givebutter' },
              { id: 'donorbox', title: 'Donorbox', hasLandingPage: true, landingPageUrl: '/learn/donorbox' },
              { id: 'classy', title: 'Classy', hasLandingPage: true, landingPageUrl: '/learn/classy' },
              { id: 'snap-raise', title: 'Snap! Raise', hasLandingPage: true, landingPageUrl: '/learn/snap-raise' },
              { id: 'fundrazr', title: 'FundRazr', hasLandingPage: true, landingPageUrl: '/learn/fundrazr' },
              { id: 'facebook-fundraisers', title: 'Facebook/Instagram Fundraisers', hasLandingPage: true, landingPageUrl: '/learn/facebook-instagram-fundraisers' },
              { id: 'social-media-campaigns', title: 'Social Media Campaigns', hasLandingPage: true, landingPageUrl: '/learn/social-media-campaigns' }
            ]
          },
          nonprofits: {
            title: 'Assistance Through Nonprofits and Charities',
            subtasks: [
              { id: 'funeral-consumers-alliance', title: 'The Funeral Consumers Alliance', hasLandingPage: true, landingPageUrl: '/learn/funeral-consumers-alliance' },
              { id: 'modest-needs', title: 'Modest Needs', hasLandingPage: true, landingPageUrl: '/learn/modest-needs' },
              { id: 'childrens-burial', title: 'Children\'s Burial Assistance', hasLandingPage: true, landingPageUrl: '/learn/childrens-burial-assistance' }
            ]
          },
          communitySupport: {
            title: 'Community Support',
            subtasks: [
              { id: 'community-groups', title: 'Local Community Groups', hasLandingPage: true, landingPageUrl: '/learn/community-groups' }
            ]
          },
          governmentAssistance: {
            title: 'Government Assistance',
            subtasks: [
              { id: 'social-security-benefit', title: 'Social Security Lump-Sum Death Benefit', hasLandingPage: true, landingPageUrl: '/learn/social-security-benefit' },
              { id: 'state-local-aid', title: 'State or Local Aid Programs', hasLandingPage: true, landingPageUrl: '/learn/state-local-aid' },
              { id: 'bereavement-grants', title: 'Bereavement Grants or Stipends', hasLandingPage: true, landingPageUrl: '/learn/bereavement-grants' },
              { id: 'federal-employee-benefits', title: 'Federal Employee Benefits', hasLandingPage: true, landingPageUrl: '/learn/federal-employee-benefits' },
              { id: 'veterans-benefits', title: 'Veterans Benefits', hasLandingPage: true, landingPageUrl: '/learn/veterans-benefits' }
            ]
          },
          employersAssistance: {
            title: 'Employers Assistance',
            subtasks: [
              { id: 'employer-benefits', title: 'Employer or Union Benefits', hasLandingPage: true, landingPageUrl: '/learn/employer-union-benefits' },
              { id: 'union-assistance', title: 'Assistance through employee unions', hasLandingPage: true, landingPageUrl: '/learn/employee-unions' }
            ]
          },
          mealAssistance: {
            title: 'Meal Assistance',
            subtasks: [
              { id: 'meal-train', title: 'Meal Train', hasLandingPage: true, landingPageUrl: '/learn/meal-train' },
              { id: 'grocery-delivery', title: 'Grocery Delivery Services', hasLandingPage: true, landingPageUrl: '/learn/grocery-delivery' },
              { id: 'caring-bridge', title: 'Caring Bridge', hasLandingPage: true, landingPageUrl: '/learn/caring-bridge' }
            ]
          }
        }
      }
    }
  },
  afterTwoWeeks: {
    title: 'What to do After 2 Weeks After the Death of a Loved One',
    tasks: {
      financialAccounts: {
        title: 'Close or Redirect Financial and Postal Accounts',
        subtasks: [
          { id: 'bank-accounts', title: 'Bank Accounts', hasLandingPage: true, landingPageUrl: '/learn/bank-accounts' },
          { id: 'credit-cards', title: 'Credit or Debit Cards', hasLandingPage: true, landingPageUrl: '/learn/credit-cards' },
          { id: 'postal-mail', title: 'Postal Mail', hasLandingPage: true, landingPageUrl: '/learn/postal-mail' },
          { id: 'digital-accounts', title: 'Digital Accounts', hasLandingPage: true, landingPageUrl: '/learn/digital-accounts' },
          { id: 'credit-bureaus', title: 'Credit Bureaus', hasLandingPage: true, landingPageUrl: '/learn/credit-bureaus' }
        ]
      },
      homeAccounts: {
        title: 'Close or Redirect Home Accounts',
        subtasks: [
          { id: 'home-payment', title: 'Rent/Home Payment', hasLandingPage: true, landingPageUrl: '/learn/rent-home-payment' },
          { id: 'electric', title: 'Electric Company', hasLandingPage: true, landingPageUrl: '/learn/electric-company' },
          { id: 'gas', title: 'Gas Company', hasLandingPage: true, landingPageUrl: '/learn/gas-company' },
          { id: 'phone', title: 'Phone Service', hasLandingPage: true, landingPageUrl: '/learn/phone-service' },
          { id: 'cable', title: 'Cable Bill/Streaming Services', hasLandingPage: true, landingPageUrl: '/learn/cable-streaming' }
        ]
      },
      governmentAgencies: {
        title: 'Notifying State and Federal Agencies',
        subtasks: [
          { id: 'dmv', title: 'DMV', hasLandingPage: true, landingPageUrl: '/learn/dmv' },
          { id: 'social-security', title: 'Social Security Administration', hasLandingPage: true, landingPageUrl: '/learn/social-security-admin' },
          { id: 'voter-registration', title: 'Update Voter Registration' },
          { id: 'disability-permits', title: 'Disability Permits', hasLandingPage: true, landingPageUrl: '/learn/disability-permits' },
          { id: 'irs', title: 'IRS', hasLandingPage: true, landingPageUrl: '/learn/irs' },
          { id: 'passport', title: 'US Passport', hasLandingPage: true, landingPageUrl: '/learn/us-passport' }
        ]
      },
      notifications: {
        title: 'Completing Notification Process',
        subtasks: [
          { id: 'email', title: 'Email' },
          { id: 'social-media', title: 'Social Media' },
          { id: 'life-insurance', title: 'Life Insurance', hasLandingPage: true, landingPageUrl: '/learn/life-insurance' },
          { id: 'long-term-care', title: 'Long Term Care Insurance', hasLandingPage: true, landingPageUrl: '/learn/long-term-care' },
          { id: 'finance-companies', title: 'Finance Companies', hasLandingPage: true, landingPageUrl: '/learn/finance-companies' },
          { id: 'ddnc-list', title: 'Sign up for DDNC List' },
          { id: 'vehicles', title: 'Vehicle(s)', hasLandingPage: true, landingPageUrl: '/learn/vehicles' },
          { id: 'cell-phone', title: 'Cell Phone', hasLandingPage: true, landingPageUrl: '/learn/cell-phone' },
          { id: 'online-subscriptions', title: 'Online Subscriptions', hasLandingPage: true, landingPageUrl: '/learn/online-subscriptions' },
          { id: 'physical-subscriptions', title: 'Physical Subscriptions', hasLandingPage: true, landingPageUrl: '/learn/physical-subscriptions' },
          { id: 'bills-accounts', title: 'Bills and Accounts to Notify' }
        ]
      },
      will: {
        title: "Executing Decedent's Will or Probating Funds and Assets",
        subtasks: [
          { id: 'execute-will', title: 'Executing the Will', hasLandingPage: true, landingPageUrl: '/learn/executing-will' },
          { id: 'probate-assets', title: 'If There is No Will - Probating Funds and Assets', hasLandingPage: true, landingPageUrl: '/learn/probating-assets' }
        ]
      },
      assets: {
        title: 'Inventory of all Assets',
        subtasks: [
          { id: 'inventory-assets', title: 'Inventory of All Assets', hasLandingPage: true, landingPageUrl: '/learn/inventory-assets' }
        ]
      },
      benefits: {
        title: 'Applying for Benefits',
        subtasks: [
          { id: 'insurance-benefits', title: 'Insurance', hasLandingPage: true, landingPageUrl: '/learn/insurance' },
          { id: 'pension-retirement', title: 'Pensions and Retirement', hasLandingPage: true, landingPageUrl: '/learn/pensions-retirement' },
          { id: 'annuities', title: 'Annuities', hasLandingPage: true, landingPageUrl: '/learn/annuities' },
          { id: 'veterans-admin', title: 'Veterans Administration', hasLandingPage: true, landingPageUrl: '/learn/veterans-administration' },
          { id: 'investments', title: 'Investments', hasLandingPage: true, landingPageUrl: '/learn/investments' },
          { id: 'social-security-benefits', title: 'Social Security', hasLandingPage: true, landingPageUrl: '/learn/social-security' },
          { id: 'file-life-insurance', title: 'Filing Life Insurance', hasLandingPage: true, landingPageUrl: '/learn/filing-life-insurance' }
        ]
      },
      finalizing: {
        title: 'Finalizing',
        subtasks: [
          { id: 'scatter-ashes', title: 'Scattering Ashes', hasLandingPage: true, landingPageUrl: '/learn/scattering-ashes' },
          { id: 'thank-you-cards', title: 'Send Thank You Cards', hasLandingPage: true, landingPageUrl: '/learn/thank-you-cards' }
        ]
      }
    }
  }
};

export default function ChecklistCopy() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [currentPopupContent, setCurrentPopupContent] = useState(null);
  const [saving, setSaving] = useState(false);
  // Add a new state for expanded subcategories
  const [expandedSubCategories, setExpandedSubCategories] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // Simple auth state subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      // If user signs in, load their tasks
      if (session?.user) {
        loadUserTasks(session.user.id);
      } else {
        // Clear tasks if user signs out
        setCompletedTasks(new Set());
      }
    });

    // Initial session check
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await loadUserTasks(session.user.id);
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  const loadUserTasks = async (userId) => {
    try {
      setLoading(true);
      const { data: userTasks, error: tasksError } = await supabase
            .from('user_tasks')
        .select('task_id')
        .eq('user_id', userId);

      if (tasksError) {
        console.error('Error loading tasks:', tasksError);
        return;
      }

      setCompletedTasks(new Set(userTasks?.map(task => task.task_id) || []));
    } catch (error) {
      console.error('Error loading user tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    
    // If not logged in, prompt to sign in
    if (!session?.user) {
      setIsSignInPopupOpen(true);
      return;
    }

    try {
      setSaving(true);
      const isCompleting = !completedTasks.has(taskId);
      
      // If user is authenticated, save to database first
      const { error: dbError } = isCompleting
        ? await supabase
            .from('user_tasks')
            .insert([{
              user_id: session.user.id,
              task_id: taskId,
              status: 'completed',
              completed_at: new Date().toISOString()
            }])
        : await supabase
            .from('user_tasks')
            .delete()
            .eq('user_id', session.user.id)
            .eq('task_id', taskId);

      if (dbError) {
        console.error('Error updating task:', dbError);
        throw dbError;
      }

      // Update local state
      setCompletedTasks(prev => {
        const newSet = new Set(prev);
        if (isCompleting) {
          newSet.add(taskId);
        } else {
          newSet.delete(taskId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error toggling task completion:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const calculateProgress = () => {
    let totalTasks = 0;
    let completedCount = 0;

    Object.values(checklistSections).forEach(section => {
      Object.values(section.tasks).forEach(category => {
        // Handle regular subtasks
        if (category.subtasks) {
          category.subtasks.forEach(task => {
            if (!task.isHeader) {
              totalTasks++;
              if (completedTasks.has(task.id)) {
                completedCount++;
              }
            }
          });
        }
        
        // Handle subcategories if they exist
        if (category.subCategories) {
          Object.values(category.subCategories).forEach(subCategory => {
            subCategory.subtasks.forEach(task => {
              if (!task.isHeader) {
              totalTasks++;
              if (completedTasks.has(task.id)) {
                completedCount++;
                }
              }
            });
          });
        }
      });
    });

    return {
      percentage: totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100),
      completed: completedCount,
      total: totalTasks
    };
  };

  const openInfoPopup = (taskId) => {
    if (popupContent[taskId]) {
      setCurrentPopupContent(popupContent[taskId]);
      setIsInfoPopupOpen(true);
    }
  };

  // Add a new function to toggle subcategories
  const toggleSubCategory = (subCategoryKey) => {
    setExpandedSubCategories(prev => ({
      ...prev,
      [subCategoryKey]: !prev[subCategoryKey]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6266ea]"></div>
      </div>
    );
  }

  // Calculate progress here before rendering
  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Sign In Popup */}
      <Dialog
        open={isSignInPopupOpen}
        onClose={() => setIsSignInPopupOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl animate-fadeIn">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Sign in to use checklist
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-6">
              Please sign in or create an account to track your progress.
            </Dialog.Description>

            <div className="mt-4 space-y-3">
              <button
                onClick={() => {
                  setIsSignInPopupOpen(false);
                  navigate('/signin');
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent bg-[#6266ea] px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsSignInPopupOpen(false);
                  navigate('/signup');
                }}
                className="w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              >
                Create Account
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Info Popup */}
      <Dialog
        open={isInfoPopupOpen}
        onClose={() => setIsInfoPopupOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl animate-fadeIn overflow-y-auto max-h-[80vh]">
            {currentPopupContent && (
              <>
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                  {currentPopupContent.title}
                </Dialog.Title>
                <div className="prose prose-sm">
                  {currentPopupContent.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700">
                      {paragraph.includes('**') 
                        ? paragraph.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={i}>{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })
                        : paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setIsInfoPopupOpen(false)}
                    className="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checklist</h1>
          <p className="text-gray-600 mb-4">
            Track your progress through important tasks after the loss of a loved one.
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {progress.completed} of {progress.total} tasks completed
              </span>
              <span className="text-sm font-medium text-gray-700">
                {progress.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-[#6266ea] h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Checklist Sections */}
        {Object.entries(checklistSections).map(([sectionKey, section]) => (
          <div key={sectionKey} className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
            
            {/* Categories */}
            <div className="space-y-6">
              {Object.entries(section.tasks).map(([categoryKey, category]) => (
                <div key={categoryKey} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCategory(`${sectionKey}-${categoryKey}`)}
                    className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{category.title}</span>
                    <ChevronDownIcon 
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        expandedCategories[`${sectionKey}-${categoryKey}`] ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {expandedCategories[`${sectionKey}-${categoryKey}`] && (
                    <div className="p-4 space-y-3 bg-white">
                      {/* Render regular subtasks */}
                      {category.subtasks && category.subtasks.map(task => (
                        <div key={task.id} className={`flex items-start space-x-3 ${task.isHeader ? 'mt-4 mb-2' : ''}`}>
                          {!task.isHeader && (
                            <div className="flex-shrink-0 pt-0.5">
                            <button
                              onClick={() => toggleTaskCompletion(task.id)}
                                className={`h-5 w-5 rounded border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] ${
                                completedTasks.has(task.id) 
                                  ? 'bg-[#6266ea] border-[#6266ea]' 
                                  : 'border-gray-300'
                                }`}
                                disabled={saving}
                            >
                              {completedTasks.has(task.id) && (
                                <CheckIcon className="h-3 w-3 text-white" />
                              )}
                            </button>
                            </div>
                          )}
                          
                          <div className="flex-grow">
                            <div className="flex items-center">
                              <span className={`text-sm ${task.isHeader ? 'font-semibold text-gray-700' : 'text-gray-800'} ${
                                completedTasks.has(task.id) ? 'line-through text-gray-500' : ''
                              }`}>
                                {task.title}
                              </span>
                              
                              {!task.isHeader && (
                                <div className="flex ml-2 space-x-2">
                                  {popupContent[task.id] && (
                                    <button
                                      onClick={() => openInfoPopup(task.id)}
                                      className="text-gray-400 hover:text-[#6266ea] focus:outline-none"
                                      title="View Details"
                                    >
                                      <InformationCircleIcon className="h-4 w-4" />
                                    </button>
                                  )}
                                  {task.hasLandingPage && (
                                    <Link 
                                      to={task.landingPageUrl} 
                                      className="text-xs text-[#6266ea] hover:text-purple-700"
                                    >
                                      Learn More
                                    </Link>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Render subcategories if they exist */}
                      {category.subCategories && Object.entries(category.subCategories).map(([subCategoryKey, subCategory]) => (
                        <div key={subCategoryKey} className="mt-4 border border-gray-100 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleSubCategory(`${sectionKey}-${categoryKey}-${subCategoryKey}`)}
                            className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <span className="font-medium text-gray-700">{subCategory.title}</span>
                            <ChevronDownIcon 
                              className={`h-4 w-4 text-gray-500 transition-transform ${
                                expandedSubCategories[`${sectionKey}-${categoryKey}-${subCategoryKey}`] ? 'transform rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          {expandedSubCategories[`${sectionKey}-${categoryKey}-${subCategoryKey}`] && (
                            <div className="p-3 space-y-3 bg-white pl-4">
                            {subCategory.subtasks.map(task => (
                              <div key={task.id} className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 pt-0.5">
                                <button
                                  onClick={() => toggleTaskCompletion(task.id)}
                                      className={`h-5 w-5 rounded border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] ${
                                    completedTasks.has(task.id) 
                                      ? 'bg-[#6266ea] border-[#6266ea]' 
                                      : 'border-gray-300'
                                      }`}
                                      disabled={saving}
                                >
                                  {completedTasks.has(task.id) && (
                                    <CheckIcon className="h-3 w-3 text-white" />
                                  )}
                                </button>
                                  </div>
                                  
                                <div className="flex-grow">
                                  <div className="flex items-center">
                                      <span className={`text-sm text-gray-800 ${
                                        completedTasks.has(task.id) ? 'line-through text-gray-500' : ''
                                      }`}>
                                      {task.title}
                                    </span>
                                      
                                    <div className="flex ml-2 space-x-2">
                                      {popupContent[task.id] && (
                                        <button
                                          onClick={() => openInfoPopup(task.id)}
                                          className="text-gray-400 hover:text-[#6266ea] focus:outline-none"
                                            title="View Details"
                                        >
                                          <InformationCircleIcon className="h-4 w-4" />
                                        </button>
                                      )}
                                      {task.hasLandingPage && (
                                        <Link 
                                          to={task.landingPageUrl} 
                                          className="text-xs text-[#6266ea] hover:text-purple-700"
                                        >
                                          Learn More
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}