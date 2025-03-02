import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
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

const checklistSections = {
  immediate: {
    title: 'Immediately After the Death of a Loved One',
    tasks: {
      notifications: {
        title: 'Notifications',
        subtasks: [
          { id: 'contact-family', title: 'Contact Immediate Family', content: `In the difficult moments following a loved one's passing, connecting with immediate family is crucial for support and necessary decision-making.

Steps to Contact Family:
1. Reach Out Promptly
   • Notify key family members via personal phone calls or in-person meetings
   • Maintain privacy and sensitivity
   • If you are unable to reach them, leave a message with the funeral home or local authorities
2. Share Known Wishes
   • Discuss preferences about organ donation, cremation, or burial if known
3. Identify Legal Next of Kin
   • Ensure they are informed quickly
   • They may need to make urgent decisions or sign documents
4. Find Essential Documents
   • Look for wills or end-of-life plans
   • These can guide upcoming decisions
5. Make Decisions Collectively
   • Decide on immediate actions like funeral arrangements
   • Honor the deceased's wishes
   • Consider family's emotional and financial state

Support Each Other:
Remember to provide emotional support to one another, recognizing that everyone processes grief differently.` },
          { id: 'notify-friends', title: 'Notify Close Friends and Extended Family', content: `Informing friends and extended family requires sensitivity and coordination.

Steps to Notify Others:
1. Create a Contact List
   • Compile a list of close friends and extended family who need to be informed

2. Assign Responsibilities
   • Family Members: Have each sibling notify their own branch of the family
   • Trusted Friends: Ask for help reaching out to those in the deceased's address book
3. Choose Communication Methods
   • Use phone calls for close relationships
   • Opt for emails or messages for wider circles

4. Share Essential Information
   • Service Details: Share funeral or memorial service plans if available
   • Family's Preferences: Communicate if the family needs privacy
   • Condolences: Provide information on where to send messages, flowers, or donations` },
          { id: 'notify-doctor', title: "Notify Descendant's Doctor", content: `Notifying your loved one's doctor is an important step, especially if they were under medical care.

Steps to Notify Doctor:
1. Determine the Right Contact Person
   • Identify which doctor needs to be informed
   • This may be a primary care physician, specialist, or hospice provider

2. Make the Call
   • Contact the doctor's office
   • Ask to speak with a staff member or nurse if the doctor is unavailable

3. Provide Essential Information
   • Share the deceased's full name and date of passing
   • Ask about death certificate signing process

4. Ask About Next Steps
   • Inquire about additional paperwork
   • Discuss accessing medical records
   • Understand if an autopsy is required

5. Close Any Remaining Medical Matters
   • Address any long-term care or treatment matters
   • Finalize medical records or notifications` },
          { id: 'notify-employer', title: "Notify Descendant's Employer", content: `Notifying the employer ensures proper handling of final payments and benefits.

Steps to Notify Employer:
1. Prepare Required Documents
   • Death certificate is typically required
   • Gather any other relevant documentation

2. Contact the Employer Promptly
   • Call the human resources department
   • For small businesses, speak with supervisor or owner
   • Note: Limited information may be provided if you're not next of kin

3. Ask About Final Pay and Benefits
   • Unpaid wages, vacation, or sick time
   • Death benefits and pensions
   • 401(k) funds
   • Employer-provided life insurance
   • Health coverage for dependents (COBRA)

Note: Some benefits are paid to named beneficiaries, while others may go through probate.` }
        ]
      },
      care: {
        title: 'Care',
        subtasks: [
          { id: 'care-children', title: "Descendant's Children", content: `Ensuring immediate care for children is a top priority after a loved one's passing.

Steps for Children's Care:
1. Ensure Immediate Safety and Stability
   • Keep children in a safe environment with a responsible adult
   • Prioritize emotional needs, food, shelter, and routine care

2. Communicate with Immediate Family
   • Support surviving parent/guardian
   • Respect their wishes about keeping children close or arranging help

3. Arrange Temporary Care (If Needed)
   • Identify trusted relatives or friends for short-term care
   • Choose someone who can provide stability

4. Determine Legal Guardianship
   • Contact attorney if guardian is named in will
   • Petition court if no guardian is named
   • Consult family law attorney for guidance

5. Provide Ongoing Support
   • Maintain normal routines for stability
   • Encourage open conversations about grief
   • Consider counseling if needed` },
          { id: 'care-pets', title: 'Pet Care', content: `Arranging care for pets requires immediate attention to ensure their wellbeing.

Steps for Pet Care:
1. Meet Immediate Needs
   • Provide food, water, and safe space
   • Maintain routine to reduce anxiety

2. Find a Temporary Caregiver
   • Ask trusted family, friend, or neighbor
   • Contact boarding facility if needed
   • Reach out to rescue organizations

3. Locate Important Pet Records
   • Gather vaccination records
   • Collect medical history
   • Find microchip information
   • Check for written care arrangements

4. Arrange Long-Term Care
   • Contact designated guardian if named in will
   • Work with family to find new home
   • Consider reputable shelters if needed

5. Help the Pet Adjust
   • Provide familiar items (bedding, toys)
   • Ensure love and attention
   • Maintain stability in new home` }
        ]
      },
      wishes: {
        title: "Descendant's Wishes",
        subtasks: [
          { id: 'determine-wishes', title: "Determine Descendant's Wishes", content: `Understanding and honoring the deceased's wishes is important.

Steps to Determine Wishes:
1. Look for Written Instructions
2. Check Legal Documents
3. Consult Family Members
4. Review Any Pre-arrangements
5. Document All Findings`,
            hasLandingPage: true,
            landingPageUrl: '/learn/determining-wishes'
          }
        ]
      },
      body: {
        title: "Descendant's Body",
        subtasks: [
          { id: 'cremation-burial', title: 'Decide on Cremation or Burial', content: `Making the decision between cremation and burial requires careful consideration.

Factors to Consider:
1. Known Wishes
2. Religious/Cultural Beliefs
3. Family Preferences
4. Cost Considerations
5. Timeline Requirements`,
            hasLandingPage: true,
            landingPageUrl: '/learn/understanding-remains-options'
          },
          { id: 'transport-body', title: 'Arrange Transportation of the Body', content: `Proper transportation arrangements need to be made promptly.

Transportation Steps:
1. Contact Funeral Home
2. Arrange Pick-up Location
3. Complete Required Forms
4. Coordinate Timing
5. Confirm Transportation Details`,
            hasLandingPage: true,
            landingPageUrl: '/learn/body-transportation'
          }
        ]
      },
      funeral: {
        title: 'Funeral Home',
        subtasks: [
          { id: 'choose-funeral-home', title: 'Choose a Funeral Home', content: `Selecting an appropriate funeral home is an important decision.

Selection Steps:
1. Research Local Options
2. Compare Services/Prices
3. Read Reviews
4. Visit Facilities
5. Discuss Services
6. Review Contracts` }
        ]
      },
      will: {
        title: "Descendant's Will or Probate",
        subtasks: [
          { id: 'determine-will', title: 'How to Determine if There is a Will', content: `Locating and verifying a will is a crucial early step.

Steps to Find Will:
1. Search Personal Papers
2. Contact Attorney
3. Check Safe Deposit Box
4. Consult Family Members
5. Check County Records`,
            hasLandingPage: true,
            landingPageUrl: '/learn/finding-will'
          },
          { id: 'probate-necessity', title: 'Is Probate Necessary?', content: `Understanding if probate is required for the estate.

Determining Factors:
1. Estate Size
2. Type of Assets
3. State Laws
4. Joint Ownership
5. Beneficiary Designations` },
          { id: 'probate-process', title: 'What to Expect in Probate', content: `Understanding the probate process helps prepare for what's ahead.

Probate Process Overview:
1. File Petition
2. Notify Heirs
3. Inventory Assets
4. Pay Debts
5. Distribute Assets
6. Close Estate` }
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
          { id: 'obtain-certificate', title: 'How to Obtain a Death Certificate', content: `Getting official death certificates is a necessary step.

Steps to Obtain:
1. Contact Vital Records Office
2. Gather Required Information
3. Complete Application
4. Pay Required Fees
5. Choose Delivery Method` },
          { id: 'multiple-copies', title: 'Obtain Copies of Death Certificate', content: `Multiple copies are often needed for various purposes.

Guidelines for Copies:
1. Determine Number Needed
2. List Required Organizations
3. Request Certified Copies
4. Store Securely
5. Keep Records of Usage` }
        ]
      },
      obituary: {
        title: 'Obituary Options',
        subtasks: [
          { id: 'write-obituary', title: 'How to Write an Obituary', content: `Writing a meaningful obituary to honor your loved one.

Writing Guidelines:
1. Gather Biographical Info
2. Include Key Life Events
3. List Survivors
4. Add Service Details
5. Proofread Carefully`,
            hasLandingPage: true,
            landingPageUrl: '/learn/write-obituary'
          },
          { id: 'facebook-memorial', title: 'Create a Facebook Memorial Page', content: `Creating an online memorial space on Facebook.

Setup Steps:
1. Gather Photos
2. Write Biography
3. Set Privacy Settings
4. Share with Family
5. Manage Comments` },
          { id: 'legacy-publish', title: 'Publish in Legacy.com', content: `Publishing obituary on Legacy.com for wider reach.

Publication Steps:
1. Create Account
2. Choose Package
3. Submit Content
4. Add Photos
5. Share Link` },
          { id: 'newspaper-submit', title: 'Submit to Newspapers', content: `Submitting obituary to local newspapers.

Submission Process:
1. Contact Newspapers
2. Check Requirements
3. Submit Content
4. Verify Publication
5. Keep Copies` }
        ]
      },
      funeral: {
        title: 'Making Funeral Arrangements',
        subtasks: [
          { id: 'gather-info', title: 'Gather Information About Loved One', content: `Collecting necessary information for funeral arrangements.

Information Needed:
1. Personal Details
2. Military Service
3. Religious Preferences
4. Special Requests
5. Family Traditions`,
            hasLandingPage: true,
            landingPageUrl: '/learn/collecting-memories'
          },
          { id: 'collect-memories', title: 'Collect Memories for Funeral Service', content: `Gathering memories and materials for the service.

Items to Collect:
1. Photographs
2. Personal Stories
3. Achievement Records
4. Special Mementos
5. Video Clips` },
          { id: 'arrange-officiant', title: 'Arrange for Officiant/Clergy', content: `Choosing someone to lead the funeral or memorial service helps set the tone for a meaningful tribute.

Options for Officiating the Service:
• Religious Leader – A religious leader can lead a faith-based service
• Funeral Home Officiant – Many funeral homes provide non-religious officiants
• Family or Friend – A loved one can lead the service with personal reflections

Things to Discuss with the Officiant:
• The structure and tone of the service
• Readings or special tributes
• Personal stories or messages to honor your loved one

Selecting the right officiant ensures a service that reflects your loved one's beliefs, values, and the memories they leave behind.` },
          { id: 'arrange-music', title: 'Arrange Music', content: `Music can bring comfort and meaning to a funeral or memorial service.

Options for Including Music:
• Play Recorded Music – Use a Bluetooth speaker or venue sound system
• Group Singing – Choose meaningful, familiar songs for attendees
• Live Performances – Invite family or friends to sing or play
• Hire a Musician – Consider a professional singer or instrumentalist

A thoughtful music selection can provide a touching tribute and bring a sense of connection to those gathered.` },
          { id: 'flowers-donations', title: 'Request Flowers or Donations', content: `Managing flower arrangements and donation requests requires careful coordination.

Organization Steps:
1. Choose Florist
   • Research local florists
   • Compare prices and styles
   • Check delivery options

2. Select Arrangements
   • Consider service venue size
   • Choose meaningful flowers
   • Coordinate color schemes

3. Set Up Donations
   • Select charitable organizations
   • Create donation instructions
   • Set up online giving options

4. Communicate Preferences
   • Include in obituary
   • Share with funeral home
   • Inform family and friends

5. Track Contributions
   • Keep records of flowers received
   • Monitor donation notifications
   • Send acknowledgments` },
          { id: 'eulogies', title: 'Ask for Eulogies', content: `Coordinating eulogies helps create a meaningful and personal service.

Eulogy Planning:
1. Choose Speakers
   • Select those who knew your loved one well
   • Consider different perspectives
   • Ask early to allow preparation time

2. Provide Guidelines
   • Suggest time limits
   • Share tone preferences
   • Offer writing tips

3. Set Time Limits
   • Plan for multiple speakers
   • Allow for emotions
   • Keep overall timing in mind

4. Arrange Order
   • Create a speaking schedule
   • Consider emotional impact
   • Plan smooth transitions

5. Offer Support
   • Help with writing if needed
   • Provide speaking tips
   • Be available for practice` },
          { id: 'guest-book', title: 'Set Up a Guest Book', content: `A guest book creates a lasting record of those who attended the service.

Setup Steps:
1. Purchase Book
   • Choose an appropriate style
   • Consider durability
   • Get extra signing pages

2. Create Sign-in Area
   • Set up a well-lit table
   • Arrange comfortable access
   • Add meaningful decorations

3. Provide Pens
   • Have multiple pens ready
   • Choose good quality ones
   • Include extras as backup

4. Assign Attendant
   • Ask someone to oversee
   • Guide guests as needed
   • Keep area organized

5. Save Messages
   • Collect all pages
   • Store safely
   • Consider digitizing` },
          { id: 'share-arrangements', title: 'Share Funeral Arrangements', content: `Clear communication about service details helps family and friends plan to attend.

Communication Steps:
1. Create Announcement
   • Include all essential details
   • Date, time, and location
   • Special instructions or requests

2. Choose Platforms
   • Social media
   • Email
   • Phone calls
   • Traditional mail

3. Include Details
   • Service type
   • Dress code if applicable
   • Parking information
   • Reception details

4. Send Timely
   • Give adequate notice
   • Consider travel needs
   • Send reminders as needed

5. Follow Up
   • Confirm key participants
   • Update with any changes
   • Answer questions promptly` }
        ]
      },
      home: {
        title: "Descendant's Home",
        subtasks: [
          { id: 'home-care', title: 'Arrange Care for Deceased Home', content: `Securing and maintaining the deceased's residence.

Home Care Steps:
1. Secure Property
2. Forward Mail
3. Maintain Utilities
4. Check Insurance
5. Regular Inspection` }
        ]
      },
      documents: {
        title: 'Documents',
        subtasks: [
          { id: 'gather-documents', title: 'Gather Important Documents', content: `Collecting and organizing essential paperwork.

Documents to Gather:
1. Birth Certificate
2. Marriage Certificate
3. Military Records
4. Property Deeds
5. Insurance Policies
6. Financial Statements` }
        ]
      },
      assistance: {
        title: 'Financial Assistance',
        subtasks: [
          { id: 'crowdfunding', title: 'Crowdfunding Platforms', content: `Various platforms available for funeral expense fundraising.

Popular Platforms:
1. GoFundMe
2. GiveButter
3. Donorbox
4. Classy
5. Snap! Raise
6. FundRazr
7. Facebook/Instagram` },
          { id: 'nonprofits', title: 'Assistance Through Nonprofits and Charities', content: `Organizations that provide funeral assistance.

Available Resources:
1. Funeral Consumers Alliance
2. Modest Needs
3. Children's Burial Assistance
4. Local Charities` },
          { id: 'community', title: 'Community Support', content: `Local community resources for assistance.

Support Sources:
1. Religious Organizations
2. Community Groups
3. Local Foundations
4. Civic Organizations` },
          { id: 'government', title: 'Government Assistance', content: `Government programs offering financial help.

Available Programs:
1. Social Security Benefits
2. Veterans Benefits
3. State Aid Programs
4. FEMA Assistance
5. County Resources` },
          { id: 'employer', title: 'Employer Assistance', content: `Workplace benefits and support options.

Benefit Types:
1. Life Insurance
2. Death Benefits
3. Pension Plans
4. Union Benefits
5. Employee Assistance` },
          { id: 'meals', title: 'Meal Assistance', content: `Services for meal support during bereavement.

Meal Services:
1. MealTrain
2. Grocery Delivery
3. Helping Hands
4. CaringBridge` }
        ]
      }
    }
  },
  afterTwoWeeks: {
    title: 'What to Do After 2 Weeks',
    tasks: {
      accounts: {
        title: 'Account Management',
        subtasks: [
          { id: 'close-accounts', title: 'Close or Transfer Accounts', content: `Managing accounts after a loved one's passing requires careful attention to detail.

Steps for Account Management:
1. Gather Account Information
   • Bank accounts
   • Credit cards
   • Investment accounts
   • Utility accounts
   • Subscription services

2. Contact Each Institution
   • Notify of the death
   • Request account closure or transfer
   • Submit required documentation
   • Get confirmation in writing

3. Handle Digital Accounts
   • Email accounts
   • Social media profiles
   • Online subscriptions
   • Digital payment services

4. Monitor Credit Reports
   • Request credit reports
   • Watch for suspicious activity
   • Place fraud alerts if needed` },
          { id: 'transfer-utilities', title: 'Transfer Utilities & Services', content: `Managing utility and service transfers to prevent interruption.

Steps for Utilities & Services:
1. List All Services
   • Electricity
   • Water
   • Gas
   • Internet
   • Phone
   • Cable/Streaming
   • Home Security

2. Contact Providers
   • Notify of the situation
   • Arrange transfers
   • Update billing information
   • Cancel unnecessary services

3. Document Changes
   • Keep records of transfers
   • Note final bill dates
   • Save confirmation numbers` }
        ]
      },
      insurance: {
        title: 'Insurance Claims',
        subtasks: [
          { id: 'life-insurance', title: 'Life Insurance Claims', content: `Processing life insurance claims requires organization and follow-through.

Steps for Life Insurance Claims:
1. Gather Documentation
   • Policy information
   • Death certificate
   • Beneficiary information
   • Claim forms

2. Contact Insurance Companies
   • File claims
   • Submit required documents
   • Track claim status
   • Follow up regularly

3. Consider Additional Policies
   • Employer policies
   • Credit card insurance
   • Mortgage insurance
   • Accidental death policies` },
          { id: 'other-insurance', title: 'Other Insurance Matters', content: `Managing other insurance policies and coverage changes.

Types of Insurance to Address:
1. Health Insurance
   • Cancel or transfer coverage
   • Handle outstanding claims
   • COBRA coverage if applicable

2. Property Insurance
   • Update home insurance
   • Transfer vehicle insurance
   • Modify coverage as needed

3. Disability Insurance
   • Cancel policies
   • Process final claims` }
        ]
      },
      property: {
        title: 'Property & Assets',
        subtasks: [
          { id: 'property-transfer', title: 'Property Transfer Process', content: `Managing the transfer of property and assets to beneficiaries.

Property Transfer Steps:
1. Real Estate
   • Gather property documents
   • Contact property lawyer
   • Update deed records
   • Handle mortgage transfers

2. Vehicles
   • Transfer titles
   • Update registration
   • Modify insurance coverage

3. Personal Property
   • Create inventory
   • Distribute according to will
   • Document transfers` },
          { id: 'asset-valuation', title: 'Asset Valuation', content: `Determining the value of assets for estate purposes.

Valuation Process:
1. Professional Appraisals
   • Real estate
   • Vehicles
   • Jewelry
   • Art and collectibles

2. Financial Assets
   • Investment accounts
   • Retirement accounts
   • Business interests

3. Documentation
   • Keep all appraisals
   • Photo documentation
   • Professional assessments` }
        ]
      },
      taxes: {
        title: 'Tax Matters',
        subtasks: [
          { id: 'final-taxes', title: 'Final Tax Returns', content: `Managing tax obligations for the deceased.

Tax Management Steps:
1. Personal Tax Return
   • Gather tax documents
   • File final return
   • Pay any taxes due
   • Request refunds if applicable

2. Estate Tax Return
   • Determine if required
   • Calculate estate value
   • File appropriate forms
   • Meet deadlines

3. Property Tax
   • Update records
   • Handle payments
   • Transfer obligations` },
          { id: 'tax-documents', title: 'Organize Tax Documents', content: `Collecting and organizing tax-related documents.

Document Organization:
1. Income Documents
   • W-2 forms
   • 1099 forms
   • Social Security statements
   • Pension distributions

2. Deduction Records
   • Medical expenses
   • Charitable contributions
   • Property tax payments

3. Asset Records
   • Investment statements
   • Property assessments
   • Business records` }
        ]
      },
      longTerm: {
        title: 'Long-term Planning',
        subtasks: [
          { id: 'estate-settlement', title: 'Estate Settlement Timeline', content: `Understanding and planning for the estate settlement process.

Settlement Timeline:
1. Initial Steps (2-3 months)
   • Probate filing
   • Asset inventory
   • Creditor notification

2. Mid-term Tasks (4-6 months)
   • Asset valuation
   • Debt settlement
   • Tax filings

3. Final Phase (6-12 months)
   • Asset distribution
   • Account closures
   • Final accounting` },
          { id: 'future-planning', title: 'Future Financial Planning', content: `Adjusting financial plans for the future.

Planning Steps:
1. Review Current Situation
   • Income changes
   • Expense adjustments
   • Insurance needs

2. Update Financial Plans
   • Budget revisions
   • Investment strategy
   • Retirement planning

3. Legal Considerations
   • Update own will
   • Review beneficiaries
   • Power of attorney` }
        ]
      }
    }
  }
};

export default function Checklist() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
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
        .eq('user_id', userId)
        .eq('status', 'completed');

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
    const session = await checkSession();
    if (!session) {
      setIsSignInPopupOpen(true);
      return;
    }
    if (saving) return; // Prevent multiple simultaneous saves

    try {
      setSaving(true);
      const isCompleting = !completedTasks.has(taskId);
      
      // If user is authenticated, save to database first
      if (user) {
        if (isCompleting) {
          // Add task
          const { data, error: addError } = await supabase
            .from('user_tasks')
            .upsert({
              user_id: user.id,
              task_id: taskId,
              status: 'completed',
              completed_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

          if (addError) {
            console.error('Error adding task:', addError);
            throw addError;
          }
        } else {
          // Remove task
          const { error: deleteError } = await supabase
            .from('user_tasks')
            .delete()
            .match({ 
              user_id: user.id, 
              task_id: taskId 
            });

          if (deleteError) {
            console.error('Error deleting task:', deleteError);
            throw deleteError;
          }
        }

        // Only update local state after successful database operation
        const newCompletedTasks = new Set(completedTasks);
        if (isCompleting) {
          newCompletedTasks.add(taskId);
        } else {
          newCompletedTasks.delete(taskId);
        }
        setCompletedTasks(newCompletedTasks);
      }
    } catch (error) {
      console.error('Error saving task progress:', error);
      // Show error to user
      alert('Failed to save your progress. Please try again.');
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
        category.subtasks.forEach(task => {
          totalTasks++;
          if (completedTasks.has(task.id)) {
            completedCount++;
          }
        });
      });
    });

    return {
      percentage: totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100),
      completed: completedCount,
      total: totalTasks
    };
  };

  const progress = calculateProgress();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6266ea]"></div>
      </div>
    );
  }

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
                className="w-full inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
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

      <div className="max-w-7xl mx-auto py-2 sm:py-8 px-2 sm:px-6 lg:px-8 bg-gray-50">
        <style dangerouslySetInnerHTML={{ __html: fadeInAnimation }} />
        <div className="sm:px-0">
          <div className="mb-4 sm:mb-10 bg-white rounded-xl shadow-sm p-3 sm:p-6 border border-gray-300">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Task Checklist</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-6">Track your progress through important tasks and responsibilities.</p>
            
            {!user && (
              <div className="bg-gradient-to-r from-[#6266ea]/5 to-[#7c80ee]/5 border border-[#6266ea]/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-[#6266ea]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs sm:text-sm font-medium text-[#6266ea]">Sign in to save your progress</h3>
                    <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                      <p>Your progress will be saved automatically when you're signed in. <Link to="/signin" className="font-medium text-[#6266ea] hover:text-[#4232c2] underline">Sign in now</Link> to keep track of your completed tasks.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3 sm:mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  Progress ({progress.completed}/{progress.total} tasks completed)
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#6266ea]">{progress.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
                <div
                  className="bg-gradient-to-r from-[#6266ea] to-[#7c80ee] h-2.5 sm:h-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {Object.entries(checklistSections).map(([sectionKey, section]) => (
            <div key={sectionKey} className="mb-4 sm:mb-12 bg-white rounded-xl shadow-sm p-3 sm:p-6 border border-gray-300">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-6 pb-2 sm:pb-3 border-b border-gray-300">
                {section.title}
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                {Object.entries(section.tasks).map(([categoryKey, category]) => (
                  <div key={categoryKey} className="rounded-xl border border-gray-300 bg-white hover:border-[#6266ea]/40 transition-colors duration-200">
                    <button
                      onClick={() => toggleCategory(`${sectionKey}-${categoryKey}`)}
                      className="w-full flex items-center justify-between p-3 sm:p-4 text-left bg-gradient-to-r from-[#6266ea]/5 to-[#7c80ee]/5 hover:from-[#6266ea]/15 hover:to-[#7c80ee]/15 rounded-xl transition-all duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base sm:text-xl font-semibold text-[#6266ea] pr-2">
                          {category.title} ({category.subtasks.filter(task => completedTasks.has(task.id)).length}/{category.subtasks.length})
                        </h3>
                        {category.subtasks.length > 0 && 
                         category.subtasks.every(task => completedTasks.has(task.id)) && (
                          <div className="flex items-center space-x-1 bg-[#6266ea]/10 text-[#6266ea] px-2 py-1 rounded-full text-xs font-medium animate-fadeIn">
                            <CheckIcon className="w-3 h-3" />
                            <span>Complete</span>
                          </div>
                        )}
                      </div>
                      <ChevronDownIcon 
                        className={`w-5 h-5 flex-shrink-0 text-[#6266ea] transform transition-transform duration-300 ${
                          expandedCategories[`${sectionKey}-${categoryKey}`] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        expandedCategories[`${sectionKey}-${categoryKey}`] 
                          ? 'max-h-[2000px] opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-2 sm:space-y-4 p-2 sm:p-4">
                        {category.subtasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center justify-between p-2 sm:p-4 bg-white rounded-xl border border-gray-300 hover:border-[#6266ea]/40 hover:bg-gradient-to-r hover:from-[#6266ea]/[0.05] hover:to-[#7c80ee]/[0.05] transition-all duration-200"
                          >
                            <div className="flex items-start sm:items-center space-x-3 flex-grow min-w-0">
                              <button
                                onClick={() => toggleTaskCompletion(task.id)}
                                className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 mt-0.5 sm:mt-0 rounded-md border-2 ${
                                  completedTasks.has(task.id)
                                    ? 'bg-gradient-to-r from-[#6266ea] to-[#7c80ee] border-[#6266ea]'
                                    : 'border-gray-300 hover:border-[#6266ea] hover:bg-[#6266ea]/[0.05]'
                                } flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] transition-all duration-200`}
                              >
                                {completedTasks.has(task.id) && (
                                  <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                )}
                              </button>
                              <span className={`text-sm sm:text-base ${
                                completedTasks.has(task.id) 
                                  ? 'text-gray-400 line-through' 
                                  : 'text-gray-700'
                              } truncate`}>
                                {task.title}
                              </span>
                            </div>

                            <button
                              onClick={() => setSelectedTask(task)}
                              className="flex-shrink-0 ml-2 flex items-center text-[#6266ea] hover:text-[#4232c2] text-xs sm:text-sm font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-[#6266ea]/10 transition-all duration-200"
                            >
                              <span className="hidden sm:inline">View Details</span>
                              <span className="sm:hidden">View</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Dialog
            open={selectedTask !== null}
            onClose={() => setSelectedTask(null)}
            className="fixed inset-0 z-10 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <Dialog.Overlay 
                className="fixed inset-0 bg-gray-900/50 transition-opacity duration-300 ease-in-out backdrop-blur-sm"
              />

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div
                className={`inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all duration-300 ease-out sm:my-8 sm:align-middle sm:max-w-2xl w-full sm:p-8 relative ${
                  selectedTask
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {selectedTask && (
                  <>
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                      <button
                        type="button"
                        className="bg-white rounded-lg text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6266ea]"
                        onClick={() => setSelectedTask(null)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                        <Dialog.Title as="h3" className="text-xl sm:text-2xl leading-6 font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-300">
                          {selectedTask.title}
                        </Dialog.Title>
                        <div className="mt-4 sm:mt-6 space-y-6 sm:space-y-8">
                          {selectedTask.content.split('\n\n').map((block, blockIndex) => {
                            // Handle introduction paragraph
                            if (blockIndex === 0) {
                              return (
                                <div key={blockIndex} className="text-sm sm:text-base text-gray-600 leading-relaxed border-l-4 border-[#6266ea]/20 pl-4 py-2 bg-gradient-to-r from-[#6266ea]/5 to-transparent rounded-r-lg">
                                  {block}
                                </div>
                              );
                            }

                            if (block.includes(':')) {
                              const [heading, ...items] = block.split('\n');
                              return (
                                <div key={blockIndex} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                  <h4 className="text-base sm:text-lg font-semibold text-white mb-0 bg-gradient-to-r from-[#6266ea] to-[#7c80ee] px-4 py-2">
                                    {heading.replace(':', '')}
                                  </h4>
                                  <div className="p-4">
                                    <ul className="list-none space-y-4">
                                      {items.map((item, itemIndex) => {
                                        // Handle numbered steps
                                        if (item.trim().match(/^\d+\./)) {
                                          const [stepNum, ...stepContent] = item.trim().split('.');
                                          const stepText = stepContent.join('.').trim();
                                          const subItems = stepText.split('\n').filter(Boolean);
                                          
                                          return (
                                            <li key={itemIndex} className="space-y-2">
                                              <div className="flex items-start text-sm sm:text-base text-gray-600">
                                                <span className="font-semibold text-[#6266ea] min-w-[2rem] sm:min-w-[2.5rem] text-right pr-3 pt-2">
                                                  {stepNum}.
                                                </span>
                                                <div className="flex-1 space-y-2">
                                                  {subItems.map((subItem, subIndex) => {
                                                    const trimmedItem = subItem.trim();
                                                    if (trimmedItem.startsWith('•')) {
                                                      return (
                                                        <div key={subIndex} className="flex items-start group hover:bg-[#6266ea]/5 rounded-lg p-2 transition-colors duration-200">
                                                          <span className="text-[#6266ea] mr-2 sm:mr-3 text-base sm:text-lg group-hover:scale-110 transition-transform duration-200">—</span>
                                                          <span className="leading-relaxed">{trimmedItem.substring(1).trim()}</span>
                                                        </div>
                                                      );
                                                    }
                                                    return (
                                                      <div key={subIndex} className="font-medium text-gray-700 p-2">
                                                        {trimmedItem}
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            </li>
                                          );
                                        }
                                        
                                        // Handle bullet points
                                        if (item.trim().startsWith('•')) {
                                          return (
                                            <li key={itemIndex} className="flex items-start group hover:bg-[#6266ea]/5 rounded-lg p-2 transition-colors duration-200">
                                              <span className="text-[#6266ea] mr-2 sm:mr-3 text-base sm:text-lg group-hover:scale-110 transition-transform duration-200">•</span>
                                              <span className="leading-relaxed text-sm sm:text-base text-gray-600">{item.trim().substring(1)}</span>
                                            </li>
                                          );
                                        }

                                        // Handle plain text
                                        return (
                                          <li key={itemIndex} className="text-sm sm:text-base text-gray-600 leading-relaxed p-2">
                                            {item.trim()}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <p key={blockIndex} className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                {block}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 sm:mt-8">
                      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                        <button
                          type="button"
                          className="w-full sm:flex-1 inline-flex justify-center items-center rounded-xl border border-gray-300 shadow-sm px-4 sm:px-6 py-2 sm:py-3 bg-white text-sm sm:text-base font-medium text-gray-700 hover:text-[#6266ea] hover:border-[#6266ea]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] transition-all duration-200"
                          onClick={() => setSelectedTask(null)}
                        >
                          Close
                        </button>
                        {selectedTask.hasLandingPage && (
                          <Link
                            to={selectedTask.landingPageUrl}
                            className="w-full sm:flex-1 inline-flex justify-center items-center rounded-xl border border-transparent shadow-sm px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#6266ea] to-[#7c80ee] text-sm sm:text-base font-medium text-white hover:from-[#4232c2] hover:to-[#6266ea] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] transition-all duration-200 hover:shadow-lg"
                            onClick={() => setSelectedTask(null)}
                          >
                            Learn More
                          </Link>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
} 