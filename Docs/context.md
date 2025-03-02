# **Purple Hub - Website Flow & Features**

## **Overview**
Purple Hub is a full-stack web application designed to assist individuals who have lost a loved one in a car accident. The website provides a structured, step-by-step checklist, helpful resources, and document storage to guide users through necessary post-loss arrangements.

---

## **Website Flow**

### **1. Homepage**
- **Main Header:** "Handling Arrangements for the Loss of a Loved One – All Resources on One Website!"
- **Call to Action:** "Click to Get Started" button leading to the **Sign Up / Sign In** page.
- **Scrolling Sections (Left Side):**
  - Image & Text-Based Navigation
  - Topics: Financial Assistance, Funeral Arrangements, Notifications, Emotional Support
- **Scrolling Sections (Right Side):**
  - To-Do List Overview with Key Subjects: 
    - Funeral Arrangements
    - Financial Help
    - Emotional Support
    - Death Certificate Process
    - Who to Notify
- **Floating "Go to My Checklist" Button:** Persistent throughout all pages for quick access.

---

### **2. User Authentication & Onboarding**
- **Sign Up / Sign In Page**
  - Users must create an account or log in.
  - Authentication via email & password using **Supabase Auth**.
  
- **Onboarding Questionnaire** (Upon Signup)
  - Determines how far along the user is in the process.
  - Customizes the interactive to-do list.
  
---

### **3. Dashboard**
- **User-Specific To-Do List**
  - Tasks are dynamically generated based on the onboarding questionnaire.
  - Users can check off completed tasks.
  - Each task links to a detailed information page.

- **Main Dashboard Features:**
  - **Resource Library** – Collection of articles, guides, and external links.
  - **Stored Documents** – Users can upload & save documents (e.g., obituary drafts, financial forms) using **Supabase Storage**.
  - **Informative Task Pages** – Each checklist item has a dedicated explanation page.

---

## **Feature Breakdown**

### **1. Interactive To-Do List**
- Users can mark tasks as complete.
- Checklist dynamically updates based on progress, stored in **Supabase Database**.
- Each task has an associated guide page.

### **2. Resource Library**
- Provides relevant articles, guides, and links.
- Categorized for easy navigation.

### **3. Stored Documents**
- Users can upload & manage important files.
- Document types include obituaries, financial forms, and legal paperwork.
- Stored securely using **Supabase Storage**.

### **4. Informative Task Pages**
- Breakdown of each to-do list item.
- Step-by-step instructions.
- Embedded links to relevant external resources.

### **5. Floating "Go to My Checklist" Button**
- Available on all landing pages.
- Provides quick access to the checklist from any page.

---

## **Tech Stack**

### **Frontend**
- **React.js (Vite)** – For a dynamic, interactive UI.
- **Tailwind CSS** – For rapid styling and modern design.
- **React Router** – For seamless navigation.

### **Backend & Database**
- **Node.js with Express.js** – Handles API requests.
- **Supabase (PostgreSQL Database)** – Stores user data, checklist progress, and resources.
- **Supabase Auth** – Handles email/password authentication.

### **Storage & File Handling**
- **Supabase Storage** – Stores user-uploaded documents securely.

### **Hosting & Deployment**
- **Vercel (Frontend Deployment)** – Fast and free hosting for the frontend.
- **Railway.app (Backend Deployment)** – Free hosting for the Node.js server.
- **Supabase (Managed Database & Auth)** – Handles all backend database needs.

---

## **Simple Deployment Steps**

1. **Frontend Deployment (Vercel):**
   - Push your React.js (Vite) frontend code to a GitHub repository.
   - Log in to Vercel and import the repository.
   - Configure the build settings (if needed) and deploy the frontend.

2. **Backend Deployment (Railway.app):**
   - Push your Node.js backend code to a GitHub repository.
   - Log in to Railway.app and create a new project.
   - Link the GitHub repository and deploy the backend.

3. **Supabase Setup:**
   - Create a new project in Supabase.
   - Set up the PostgreSQL database and configure tables for user data, checklist progress, and resources.
   - Enable Supabase Auth for user authentication and Supabase Storage for document uploads.

4. **Connect Frontend and Backend:**
   - Update the frontend to point to the backend API hosted on Railway.app.
   - Ensure the backend is configured to interact with Supabase for database, authentication, and storage.

5. **Test and Launch:**
   - Test the entire application to ensure all features (authentication, checklist, document uploads, etc.) are working correctly.
   - Once verified, launch the application for public use.

---

