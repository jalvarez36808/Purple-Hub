# Purple Hub

A compassionate full-stack web application designed to assist individuals who have lost a loved one in a car accident. Purple Hub provides a structured, step-by-step checklist, helpful resources, and document storage to guide users through necessary post-loss arrangements.

## Features

- **Interactive Checklist**: Step-by-step guidance through post-loss arrangements
- **Resource Library**: Curated collection of helpful articles and guides
- **Document Storage**: Secure storage for important documents
- **Progress Tracking**: Keep track of completed tasks and next steps
- **Category Organization**: Tasks organized by categories like Funeral Arrangements, Financial Help, etc.

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS for styling
- React Router for navigation
- React Query for data management
- Zustand for state management
- Headless UI & Heroicons for UI components

### Backend
- Node.js with Express.js
- Supabase for:
  - PostgreSQL Database
  - Authentication
  - File Storage
- Express Validator for input validation
- Multer for file uploads

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd purple-hub
```

### 2. Environment Setup

Create and configure environment files for both frontend and backend:

```bash
# Frontend setup
cd frontend
cp .env.example .env
# Update .env with your Supabase credentials

# Backend setup
cd ../backend
cp .env.example .env
# Update .env with your configuration
```

### 3. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 4. Start Development Servers

```bash
# Start frontend (in frontend directory)
npm run dev
# Frontend will be available at http://localhost:3000

# Start backend (in backend directory)
npm run dev
# Backend will be available at http://localhost:5000
```

## Project Structure

```
purple-hub/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── store/        # Zustand store
│   │   ├── api/          # API integration
│   │   └── utils/        # Utility functions
│   ├── public/           # Static assets
│   └── index.html
│
├── backend/
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utility functions
│   └── index.js          # Entry point
│
├── schema.sql           # Database schema
└── .env.example         # Example environment variables
```

## Database Schema

The application uses a PostgreSQL database with the following main tables:
- `users`: User account information
- `categories`: Task categories
- `tasks`: Checklist items
- `user_tasks`: User progress on tasks
- `resources`: Resource library items
- `documents`: User uploaded documents
- `onboarding_responses`: User questionnaire responses

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Thanks to all contributors who have helped with the development
- Special thanks to organizations supporting families who have lost loved ones in car accidents 
# ViteSite