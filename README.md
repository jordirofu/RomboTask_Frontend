# RomboTask Frontend

Frontend application for the RomboTask project management platform.  
Built with React and TypeScript, it provides an intuitive interface for managing projects and tasks with role-based access control.

## Live Demo

https://rombo-task-frontend.vercel.app/

## Demo Users

- rubenm@rombo.com / 11111111  
- martinf@rombo.com / 22222222  

## Features

- Project and task management UI
- Task creation, editing, and deletion
- Task status updates (workflow progression)
- Notes/comments on tasks
- Authentication (login, password recovery)
- Role-based UI behavior (manager / collaborator)
- Form handling and validation
- Responsive interface

## Tech Stack

- **React** – UI library
- **TypeScript** – static typing
- **React Router** – client-side routing
- **React Query** – server state management
- **React Hook Form** – form management

## Architecture Highlights

### State Management

- Server state handled with **React Query**
- Efficient caching and synchronization with backend

### Routing

- Navigation managed with **React Router**
- Protected routes based on authentication state

### Forms

- Form handling with **React Hook Form**
- Validation and performance optimization

### API Integration

- Communication with backend REST API
- JWT-based authentication for secured endpoints

## Project Structure
src
├── api              # API service layers (Auth, Project, Task, Team, etc.)
├── components       # Reusable UI components
│   ├── auth         # Login, Register, and Password forms
│   ├── notes        # Task notes and panel components
│   ├── profile      # User profile and tab management
│   ├── projects     # Modals and forms for project CRUD
│   ├── tasks        # Task cards, lists, and detail modals
│   └── team         # Team member management and search
├── hooks            # Custom React hooks (useAuth)
├── layouts          # Main page layouts (AppLayout, AuthLayout, ProfileLayout)
├── lib              # Shared library configurations (Axios)
├── locales          # Localization files (es.ts)
├── types            # Global TypeScript definitions
├── utils            # Utility functions and access policies
├── views            # Application pages
│   ├── 404          # Custom Not Found error page
│   ├── auth         # Registration, Login, and Auth flow views
│   ├── profile      # User settings and profile views
│   └── projects     # Dashboard and Project Detail views
├── index.css        # Global styles (Tailwind CSS)
├── router.tsx       # Routing logic
└── main.tsx         # Entry point

## Installation

Clone the repository:

```bash
git clone https://github.com/RomboTask-Fullstack/RomboTask_Frontend.git
```

Install dependencies:

```bash
npm install
```

Required Variables (.env):
   - `VITE_API_URL`
   
Run the development server:

```bash
npm run dev
```

## Author

Developed by **Jordi Romero**