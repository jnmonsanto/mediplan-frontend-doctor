# MediPlan - Doctor Exercise Management System

A production-ready Vue 3 + TypeScript + TailwindCSS frontend application for managing exercise plans, patients, and exercises. Built to consume data from a Strapi backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Navigation](#navigation)
- [Live Preview](#live-preview)
- [Strapi Integration Guide](#strapi-integration-guide)
  - [Overview](#overview)
  - [Quick Start](#quick-start-1)
  - [Detailed Setup Instructions](#detailed-setup-instructions)
  - [Strapi Collection Structure](#strapi-collection-structure)
  - [Strapi Response Format](#strapi-response-format)
  - [CORS Configuration](#cors-configuration)
  - [Authentication Setup](#authentication-setup)
  - [Data Flow Diagram](#data-flow-diagram)
  - [Testing the Integration](#testing-the-integration)
  - [Debugging](#debugging)
  - [Console Logging](#console-logging)
  - [Environment Variables Reference](#environment-variables-reference)
  - [API Service Reference](#api-service-reference)
  - [Mock Data Fallback](#mock-data-fallback)
  - [Next Steps](#next-steps)
- [Recommended IDE Setup](#recommended-ide-setup)
- [Type Support for .vue Imports in TS](#type-support-for-vue-imports-in-ts)
- [License](#license)

## Features

- 🔐 **Doctor Authentication** - Credential-based login with demo doctor accounts
- 🔑 **Password Reset** - Forgot password functionality with email-based reset link
- 📋 **Dashboard** - Unified view to manage Plans, Patients, and Exercises
- 👥 **Patient Management** - Add, edit, delete patients with full details
- 💪 **Exercise Library** - Manage exercise database with JSON configuration
- 📊 **Plan Management** - Create and assign exercise plans to patients with sets and reps
- 👨‍⚕️ **Doctor Profile** - View and edit doctor information with click-outside-to-close modal
- 🔍 **Search & Filtering** - Full-text search and sort options on all lists
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful design with Tailwind CSS and custom color scheme
- 🔗 **Strapi Ready** - Full integration with Strapi backend (with mock data fallback)
- 📄 **Application Footer** - App-wide footer with branding and year information

## Tech Stack

- **Frontend**: Vue 3.5.17 with Composition API
- **TypeScript**: Full type safety throughout
- **Styling**: TailwindCSS 3.4.11 with custom design tokens
- **Routing**: Vue Router for client-side navigation
- **State Management**: Vue composables for reactive state
- **Build Tool**: Vite 7 for fast development and optimized builds
- **Testing**: Vitest + Vue Test Utils
- **Linting**: ESLint 9 + Prettier

## Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
# Visit http://localhost:5173
```

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run type-check
```

### Linting & Formatting

```bash
npm run lint      # Lint and fix
npm run format    # Format code with Prettier
```

### Running Tests

```bash
npm run test:unit
```

## Project Structure

```
src/
├── api/
│   ├── mockData.ts          # Mock data for development
│   └── strapiService.ts     # Strapi API service layer
├── components/
│   ├── ProfileModal.vue     # Doctor profile editor
│   └── icons/              # Icon components
├── composables/
│   └── useAppData.ts       # Main data composable
├── layouts/
│   └── MainLayout.vue      # Main app layout with header, main content & footer
├── pages/
│   ├── LoginPage.vue       # Doctor login page with credentials
│   ├── Dashboard.vue       # Main dashboard with view selector
│   ├── PlansList.vue       # Plans list view
│   ├── PlanForm.vue        # Plan add/edit form
│   ├── PatientsList.vue    # Patients list view
│   ├── PatientForm.vue     # Patient add/edit form
│   ├── ExercisesList.vue   # Exercises list view
│   └── ExerciseForm.vue    # Exercise add/edit form
├── assets/
│   ├── main.css            # Main styles
│   └── base.css            # Base styles with Tailwind
├── types.ts                # TypeScript type definitions
├── router.ts               # Vue Router configuration
├─��� main.ts                 # Application entry point
└── App.vue                 # Root component
```

## Authentication

### Login Screen

The application requires doctor authentication to access the dashboard. The login page includes:

- **Email & Password Fields** - Enter your credentials
- **Demo Doctor Accounts** - Pre-configured accounts for testing
- **Forgot Password** - Link to reset password functionality
- **Password Reset Form** - Email-based password recovery

### Demo Doctor Credentials

Use any of these credentials to log in:

| Doctor Name  | Email               | Password    |
| ------------ | ------------------- | ----------- |
| Dr. Smith    | smith@clinic.com    | smith123    |
| Dr. Johnson  | johnson@clinic.com  | johnson123  |
| Dr. Williams | williams@clinic.com | williams123 |

**Note:** These are demo credentials for development/testing. In production, implement proper authentication with your backend.

### Password Reset

1. Click "Forgot Password?" on the login screen
2. Enter your email address
3. Click "Send Reset Link"
4. A confirmation message will appear
5. You can then return to login with updated credentials

## Navigation

After logging in, the app uses a top-left hamburger menu for navigation:

- **Dashboard** - Main view with Plans, Patients, and Exercises selector
- **Plans** - Dedicated plans list page
- **Patients** - Dedicated patients list page
- **Exercises** - Dedicated exercises list page

Top-right profile icon opens doctor profile editor (click outside the modal to close).

## Doctor Profile

The doctor profile modal allows you to:

- **View Profile Information** - Name, email, phone, address, specialization, age
- **Update Profile Photo** - Change your profile picture via URL
- **Edit Information** - Modify any profile details
- **Save Changes** - Update your information on the backend
- **Logout** - Securely logout from the application

**Features:**

- Click outside the modal to close it
- Changes are saved to localStorage and backend (if Strapi connected)
- Profile information is displayed in various parts of the app

## Live Preview

### Login Screen

Doctor authentication page with:

- Credential-based login form
- Demo doctor accounts listed for reference
- Forgot password link with reset functionality
- Password reset form for account recovery

### Dashboard - Plans View

**Live Demo:** https://d419d4e8a4eb4edba08ff135ac8d1a91-cb7ea198cf0e41a985eeb04e5.fly.dev

Main dashboard showing exercise plans assigned to patients with:

- Search and filter functionality
- Plan details (title, description, duration, difficulty level)
- Thumbnail images for each plan
- Exercises list with sets/reps information
- Score and rating display
- Edit and delete action buttons

### Patients Management

**Live Demo:** https://d419d4e8a4eb4edba08ff135ac8d1a91-cb7ea198cf0e41a985eeb04e5.fly.dev/patients

Patients page displaying all patients with:

- Patient list with photos
- Contact information (name, email)
- SNS ID for each patient
- Search and sort functionality
- Edit and delete action buttons
- Add new patient button

### Exercises Library

**Live Demo:** https://d419d4e8a4eb4edba08ff135ac8d1a91-cb7ea198cf0e41a985eeb04e5.fly.dev/exercises

Exercises library showing:

- List of all available exercises
- Exercise names and descriptions
- JSON configuration data display
- Search and sort by name or ID
- Edit and delete action buttons
- Add new exercise button

---

# Strapi Integration Guide

## Overview

This MediPlan frontend is designed to work seamlessly with a Strapi backend. The app currently uses mock data by default, but is fully prepared to consume data from a Strapi server.

The integration is handled through:

- **`src/api/strapiService.ts`** - Service layer that handles all API communication
- **`src/composables/useAppData.ts`** - Vue composable that manages application state
- **Environment variables** - Configuration for Strapi URL

## Quick Start

### Step 1: Set Up Your Strapi Server

Before connecting the frontend, ensure your Strapi server is running:

```bash
# If you have Strapi installed locally
cd /path/to/your-strapi-project
npm run develop
# Strapi runs at http://localhost:1337 by default
```

### Step 2: Configure the Frontend

Create a `.env.local` file in the root of this project:

```bash
# .env.local
VITE_STRAPI_URL=http://localhost:1337
```

### Step 3: Set Up Doctors Collection

Create a `doctors` collection in Strapi with the demo doctors and passwords:

```json
{
  "id": "1",
  "name": "Dr. Smith",
  "email": "smith@clinic.com",
  "password": "smith123",
  "phone": "+1 (555) 123-4567",
  "address": "123 Medical Center Drive",
  "photo": "https://...",
  "specialization": "Orthopedic",
  "age": 45
}
```

### Step 4: Restart the Development Server

```bash
npm run dev
```

The frontend will now:

- Log: `[Strapi] Connected to: http://localhost:1337`
- Fetch authentication and data from your Strapi API
- Automatically fall back to mock data if the API is unreachable

---

## Detailed Setup Instructions

### 1. Environment Configuration

#### Development Environment

Create `.env.local`:

```bash
VITE_STRAPI_URL=http://localhost:1337
```

#### Production Environment

Set the environment variable in your deployment platform:

**For Vercel:**

```
Go to Project Settings → Environment Variables
Add: VITE_STRAPI_URL = https://your-strapi-domain.com
```

**For Netlify:**

```
Go to Site Settings → Build & Deploy → Environment
Add: VITE_STRAPI_URL = https://your-strapi-domain.com
```

**For Docker/Self-hosted:**

```dockerfile
ENV VITE_STRAPI_URL=https://your-strapi-domain.com
```

#### Testing the Configuration

After setting the environment variable:

1. Open browser DevTools (F12)
2. Go to Console tab
3. You should see: `[Strapi] Connected to: http://localhost:1337`

If no Strapi URL is set, you'll see: `[Strapi] Using mock data (no VITE_STRAPI_URL configured)`

---

## Strapi Collection Structure

The frontend expects your Strapi collections to be structured as follows:

### Collection: `doctors`

Doctor profiles with authentication credentials.

**Fields:**

```json
{
  "id": "1",
  "name": "Dr. Smith",
  "email": "smith@clinic.com",
  "password": "smith123",
  "phone": "+1 (555) 123-4567",
  "address": "123 Medical Center Drive, Suite 100, Springfield, IL 62701",
  "photo": "https://...",
  "specialization": "Orthopedic",
  "age": 45
}
```

**Field Descriptions:**

- `id` (string) - Unique identifier
- `name` (string) - Doctor's full name
- `email` (string) - Doctor's email address (used for login)
- `password` (string) - Doctor's password (used for login)
- `phone` (string, optional) - Doctor's phone number
- `address` (string, optional) - Doctor's office address
- `photo` (string, optional) - URL to doctor's profile photo
- `specialization` (string) - Medical specialization
- `age` (number) - Doctor's age

**Strapi API Endpoints:**

```
GET    /api/doctors              // Get all doctors
POST   /api/doctors              // Create a doctor
PUT    /api/doctors/:id          // Update a doctor
DELETE /api/doctors/:id          // Delete a doctor
```

**Security Note:** In production, implement proper password hashing and use JWT tokens instead of storing plain passwords.

---

### Collection: `patients`

List of patients managed by the doctor.

**Fields:**

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "photo": "https://...", // URL to image
  "snsId": "SNS123456"
}
```

**Strapi API Endpoints:**

```
GET    /api/patients              // Get all patients
POST   /api/patients              // Create a patient
PUT    /api/patients/:id          // Update a patient
DELETE /api/patients/:id          // Delete a patient
```

---

### Collection: `exercises`

Library of available exercises.

**Fields:**

```json
{
  "id": "1",
  "name": "Push-ups",
  "description": "A classic upper body exercise that strengthens chest, shoulders, and triceps.",
  "jsonData": {
    "difficulty": "medium",
    "instructions": "Keep your body straight..."
  }
}
```

**Field Descriptions:**

- `id` (string) - Unique identifier
- `name` (string) - Exercise name
- `description` (string) - Detailed description of the exercise
- `jsonData` (object, optional) - Additional JSON configuration

**Note:** Sets, repetitions, and duration are configured per-patient when creating exercise plans via PlanExercise objects (see Plans collection).

**Strapi API Endpoints:**

```
GET    /api/exercises             // Get all exercises
POST   /api/exercises             // Create an exercise
PUT    /api/exercises/:id         // Update an exercise
DELETE /api/exercises/:id         // Delete an exercise
```

---

### Collection: `plans`

Exercise plans assigned to patients.

**Fields:**

```json
{
  "id": "1",
  "patientId": "1",
  "patient": {                     // Populated relation
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "photo": "https://...",
    "snsId": "SNS123456"
  },
  "title": "Upper Body Strength Training",
  "description": "A comprehensive upper body workout plan focusing on chest, shoulders, and arms.",
  "duration": 30,
  "difficulty": "intermediate",
  "exercises": [
    {
      "exerciseId": "1",
      "exercise": {                // Populated relation
        "id": "1",
        "name": "Push-ups",
        "description": "A classic upper body exercise...",
        "jsonData": { ... }
      },
      "sets": 3,
      "repetitions": 10,
      "duration": 5
    }
  ],
  "score": 8.5,
  "rating": 4,
  "videoUrl": "https://example.com/videos/upper-body.mp4",
  "imageUrl": "https://example.com/images/upper-body.jpg",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

**Field Descriptions:**

- `id` (string) - Unique identifier
- `patientId` (string) - Foreign key to patient
- `patient` (object, populated) - Full patient details
- `title` (string) - Plan title
- `description` (string) - Plan description
- `duration` (number) - Total duration in minutes
- `difficulty` (enum) - One of: "beginner", "intermediate", "advanced"
- `exercises` (array) - Array of PlanExercise objects with exerciseId, sets, repetitions, duration, and populated exercise details
- `score` (number) - Doctor's assigned score (0-10)
- `rating` (number) - Doctor's rating (1-5 stars)
- `videoUrl` (string, optional) - Link to instructional video
- `imageUrl` (string, optional) - Plan thumbnail image
- `createdAt` (timestamp) - When plan was created
- `updatedAt` (timestamp) - When plan was last updated

**Strapi API Endpoints:**

```
GET    /api/plans                 // Get all plans
POST   /api/plans                 // Create a plan
PUT    /api/plans/:id             // Update a plan
DELETE /api/plans/:id             // Delete a plan
```

---

## Strapi Response Format

The frontend expects standard Strapi response format:

### Single Item Response

```json
{
  "data": {
    "id": "1",
    "name": "John Doe",
    ...
  },
  "meta": { }
}
```

### Collection Response

```json
{
  "data": [
    { "id": "1", "name": "John Doe", ... },
    { "id": "2", "name": "Jane Smith", ... }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "total": 2
    }
  }
}
```

The service layer automatically extracts the `data` field, so you don't need to handle the wrapper in your components.

---

## CORS Configuration

Since the frontend and Strapi backend may run on different domains, configure CORS:

### Strapi Configuration (`config/middlewares.js`)

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000', // Local dev frontend
        'http://localhost:5173', // Vite dev server
        'https://yourdomain.com', // Production frontend
      ],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'app::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
```

---

## Authentication System

The frontend includes a complete doctor authentication system with login and password reset functionality.

### Current Implementation

The authentication system uses credential-based login with demo doctors:

- **Login Page** (`src/pages/LoginPage.vue`)

  - Email and password form
  - Demo credentials display for reference
  - Forgot password link

- **Password Reset**

  - Email-based password recovery form
  - Shows confirmation message after reset
  - Password is updated in the system

- **Auth Composable** (`src/composables/useAuth.ts`)

  - `loginWithCredentials(email, password)` - Authenticate doctor
  - `logout()` - Sign out doctor
  - `getCurrentDoctor()` - Get current logged-in doctor
  - Stores doctor info in localStorage

- **Protected Routes**
  - All dashboard routes require authentication
  - Unauthenticated users redirected to login page
  - Session persists across browser refreshes

### Mock Data Authentication

By default, the app uses mock doctors for development:

```typescript
// src/api/mockData.ts
export const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Smith',
    email: 'smith@clinic.com',
    password: 'smith123',
    // ... other fields
  },
  // More doctors...
]
```

### Production Authentication

When connecting to Strapi, implement proper security:

### Option 1: JWT Tokens (Recommended)

1. **Strapi Side:**

   - Enable Strapi's built-in authentication
   - Use hashed passwords (bcrypt)
   - Configure JWT in `config/plugins.js`

2. **Frontend Side:**
   - Store JWT tokens in `localStorage` or `sessionStorage`
   - Update `src/composables/useAuth.ts` to use token-based auth
   - Include auth header in API requests:

```typescript
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}
```

3. **Password Reset:**
   - Send reset email via Strapi
   - Generate secure reset tokens
   - Validate token on password change

### Option 2: Session-Based Authentication

- Use traditional session cookies
- Ensure `credentials: 'include'` in fetch options
- Configure session storage in Strapi

---

## Data Flow Diagram

```
┌──────────���──────┐
│   Vue Component │
│  (Dashboard)    │
└────────┬────────┘
         │
         ▼
┌───��─────────────────┐
│  useAppData()       │ (src/composables/useAppData.ts)
│  Composable         │ - Manages reactive state
│                     │ - Coordinates API calls
└────────┬──────────���─┘
         │
         ▼
┌──────────────────────┐
│ strapiService        │ (src/api/strapiService.ts)
│ - Makes API calls    │ - Handles Strapi responses
│ - Manages errors     │ - Falls back to mock data
│ - Logs status        │
└────────┬─────────────┘
         │
         ▼
    ┌──��─────┐
    ��� Strapi │
    │  API   │
    └────────┘
```

---

## Testing the Integration

### Test 1: Verify Strapi Connection

```javascript
// In browser console
fetch('http://localhost:1337/api/patients')
  .then((res) => res.json())
  .then((data) => console.log(data))
```

If you see the response with patient data, your Strapi is working.

### Test 2: Check Frontend Console

Open your frontend in the browser and check the console (F12):

- Should show: `[Strapi] Connected to: http://localhost:1337`
- Or: `[Strapi] Using mock data...` if no URL is configured

### Test 3: Verify Data Loading

1. Open Dashboard
2. Check if Plans/Patients/Exercises load
3. Try adding a new plan - check Network tab (F12) to see if POST request is made

---

## Debugging

### Common Issues

#### Issue 1: CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

- Check Strapi CORS configuration
- Ensure frontend URL is in the allowed origins list
- Restart Strapi after changing config

#### Issue 2: 404 Errors on Endpoints

```
GET http://localhost:1337/api/patients 404
```

**Solution:**

- Verify collections exist in Strapi
- Check collection names match exactly (case-sensitive)
- Ensure API routes are enabled for each collection

#### Issue 3: Data Not Loading (Silent Fail)

```
Console shows: [Strapi] Using mock data...
```

**Solution:**

- Check Network tab (F12) - are API calls being made?
- Verify `VITE_STRAPI_URL` is set correctly
- Check browser console for error messages
- Ensure Strapi server is running

#### Issue 4: Token/Auth Errors

```
401 Unauthorized
```

**Solution:**

- Implement authentication when ready
- Store and send auth tokens in request headers
- Check Strapi user permissions for API access

---

## Console Logging

The service provides helpful logging:

```
[Strapi] Connected to: http://localhost:1337
[Strapi] Using mock data (no VITE_STRAPI_URL configured)
Error fetching patients: SyntaxError: Unexpected token...
```

These logs help you understand which mode the app is in and identify issues.

---

## Environment Variables Reference

| Variable          | Type   | Default | Usage                          |
| ----------------- | ------ | ------- | ------------------------------ |
| `VITE_STRAPI_URL` | String | (none)  | Base URL of your Strapi server |

**Example Values:**

- Development: `http://localhost:1337`
- Production: `https://strapi.yourdomain.com`
- With port: `http://api.example.com:1337`

---

## API Service Reference

### Authentication Methods

All authentication operations are in `src/composables/useAuth.ts`:

```typescript
loginWithCredentials(email: string, password: string): Doctor | null
logout(): void
getCurrentDoctor(): Doctor | null
initializeAuth(): void
```

### Data Service Methods

All data operations are in `src/api/strapiService.ts`:

### Doctor Operations

```typescript
getDoctor(): Promise<Doctor>
updateDoctor(doctor: Doctor): Promise<Doctor>
```

### Patient Operations

```typescript
getPatients(): Promise<Patient[]>
addPatient(patient: Omit<Patient, 'id'>): Promise<Patient>
updatePatient(id: string, patient: Partial<Patient>): Promise<Patient>
deletePatient(id: string): Promise<void>
```

### Exercise Operations

```typescript
getExercises(): Promise<Exercise[]>
addExercise(exercise: Omit<Exercise, 'id'>): Promise<Exercise>
updateExercise(id: string, exercise: Partial<Exercise>): Promise<Exercise>
deleteExercise(id: string): Promise<void>
```

### Plan Operations

```typescript
getPlans(): Promise<Plan[]>
addPlan(plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plan>
updatePlan(id: string, plan: Partial<Plan>): Promise<Plan>
deletePlan(id: string): Promise<void>
```

---

## Mock Data Fallback

The app includes comprehensive mock data for development and testing. If your Strapi API is unreachable, the app automatically falls back to mock data from `src/api/mockData.ts`. This allows:

- **Development:** Work offline with complete mock data
- **Testing:** Test UI and authentication without API
- **Fallback:** Graceful degradation if API is down
- **Demo Credentials:** Pre-configured doctor accounts for login testing

### Mock Data Includes

- **Doctors** - 3 demo doctors with credentials (Smith, Johnson, Williams)
- **Patients** - Multiple patients with details and relationships to doctors
- **Exercises** - Exercise library with descriptions and JSON configurations
- **Plans** - Exercise plans with assignments to patients

To use mock data intentionally, simply don't set `VITE_STRAPI_URL`.

**Note:** Authentication always works with mock data using the provided credentials. When connecting to Strapi, ensure your doctors collection has matching email/password combinations.

---

## Next Steps

1. ✅ Set up your Strapi server with the required collections
2. ✅ Create the collections with the specified fields
3. ✅ Add sample data to your collections
4. ✅ Configure CORS in Strapi
5. ✅ Set `VITE_STRAPI_URL` in `.env.local`
6. ✅ Restart the frontend dev server
7. ✅ Test the integration (check console for connection message)
8. ✅ Verify data loads from Strapi on Dashboard

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## License

MIT
