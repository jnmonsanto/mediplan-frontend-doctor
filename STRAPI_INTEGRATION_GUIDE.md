# Strapi Integration Guide

## Screenshots

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

### Step 3: Restart the Development Server

```bash
npm run dev
```

The frontend will now:

- Log: `[Strapi] Connected to: http://localhost:1337`
- Fetch data from your Strapi API instead of using mock data
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

### Collection: `doctors` (Singleton)

A single document for the authenticated doctor's profile.

**Fields:**

```json
{
  "id": "1",
  "name": "Dr. Smith",
  "email": "smith@clinic.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Medical Center Drive, Suite 100, Springfield, IL 62701",
  "photo": "https://...", // URL to image
  "specialization": "Orthopedic",
  "age": 45
}
```

**Field Descriptions:**

- `id` (string) - Unique identifier
- `name` (string) - Doctor's full name
- `email` (string) - Doctor's email address
- `phone` (string, optional) - Doctor's phone number
- `address` (string, optional) - Doctor's office address
- `photo` (string, optional) - URL to doctor's profile photo
- `specialization` (string) - Medical specialization
- `age` (number) - Doctor's age

**Strapi API Endpoint:** `GET /api/doctor` (or `/api/doctors/me`)

---

### Collection: `patients`

List of patients managed by the doctor.

**Fields:**

```json
{
  "id": "1",
  "doctorId": "1",
  "doctor": {
    // Populated relation
    "id": "1",
    "name": "Dr. Smith",
    "email": "smith@clinic.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Medical Center Drive, Suite 100, Springfield, IL 62701",
    "photo": "https://...",
    "specialization": "Orthopedic",
    "age": 45
  },
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

Library of available exercises created by the doctor.

**Fields:**

```json
{
  "id": "1",
  "doctorId": "1",
  "doctor": {
    // Populated relation
    "id": "1",
    "name": "Dr. Smith",
    "email": "smith@clinic.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Medical Center Drive, Suite 100, Springfield, IL 62701",
    "photo": "https://...",
    "specialization": "Orthopedic",
    "age": 45
  },
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

Exercise plans created by a doctor and assigned to patients.

**Fields:**

```json
{
  "id": "1",
  "doctorId": "1",
  "doctor": {                          // Populated relation
    "id": "1",
    "name": "Dr. Smith",
    "email": "smith@clinic.com",
    "photo": "https://...",
    "specialization": "Orthopedic",
    "age": 45
  },
  "patientId": "1",
  "patient": {                         // Populated relation
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "photo": "https://...",
    "snsId": "SNS123456"
  },
  "title": "Upper Body Strength Training",
  "description": "A comprehensive upper body workout plan focusing on chest, shoulders, and arms.",
  "difficulty": "intermediate",
  "exercises": [
    {
      "exerciseId": "1",
      "exercise": {                    // Populated relation
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
- `doctorId` (string) - Foreign key to doctor
- `doctor` (object, populated) - Full doctor details
- `patientId` (string) - Foreign key to patient
- `patient` (object, populated) - Full patient details
- `title` (string) - Plan title
- `description` (string) - Plan description
- `difficulty` (enum) - One of: "beginner", "intermediate", "advanced"
- `exercises` (array) - Array of PlanExercise objects with exerciseId, sets, repetitions, duration, and populated exercise details
- `score` (number) - Doctor's assigned score (0-10)
- `rating` (number) - Doctor's rating (1-5 stars)
- `videoUrl` (string, optional) - Link to instructional video
- `imageUrl` (string, optional) - Plan thumbnail image
- `createdAt` (timestamp) - When plan was created
- `updatedAt` (timestamp) - When plan was last updated

**Note:** Plan duration is calculated as the sum of all exercise durations in the `exercises` array.

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

## Authentication Setup

Currently, the frontend has no authentication implemented (as per your requirements). When you're ready to add authentication:

### Option 1: JWT Tokens (Recommended)

1. **Strapi Side:**

   - Enable Strapi's built-in authentication
   - Configure JWT settings in `config/plugins.js`

2. **Frontend Side:**
   - Add token storage in `localStorage` or `sessionStorage`
   - Update `src/api/strapiService.ts` to include auth header:

```typescript
// In strapiService.ts, add this method
private getAuthHeaders() {
  const token = localStorage.getItem('strapi_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  }
}

// Then use it in fetch calls:
const response = await fetch(`${API_URL}${endpoint}`, {
  headers: this.getAuthHeaders(),
})
```

### Option 2: Session-Based Authentication

- Use traditional session cookies
- Ensure `credentials: 'include'` is set in fetch options

---

## Data Flow Diagram

```
┌─────────────────┐
│   Vue Component │
│  (Dashboard)    │
└────────┬────────┘
         │
         ▼
┌────────��────────────┐
│  useAppData()       │ (src/composables/useAppData.ts)
│  Composable         │ - Manages reactive state
│                     │ - Coordinates API calls
└────────┬────────────┘
         │
         ▼
┌────────────────────���─┐
│ strapiService        �� (src/api/strapiService.ts)
│ - Makes API calls    ��� - Handles Strapi responses
│ - Manages errors     │ - Falls back to mock data
│ - Logs status        │
└────────��─────────────┘
         │
         ▼
    ┌────────┐
    │ Strapi │
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

All operations are in `src/api/strapiService.ts`:

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

If your Strapi API is unreachable, the app automatically falls back to mock data from `src/api/mockData.ts`. This allows:

- **Development:** Work offline with mock data
- **Testing:** Test UI without API
- **Fallback:** Graceful degradation if API is down

To use mock data intentionally, simply don't set `VITE_STRAPI_URL`.

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

## Support & Troubleshooting

If you encounter issues:

1. **Check the console** - Look for `[Strapi]` log messages
2. **Check Network tab** (F12) - Verify API requests are being made
3. **Verify Strapi is running** - Visit `http://localhost:1337/admin` in browser
4. **Check CORS configuration** - Review Strapi middleware settings
5. **Verify environment variable** - Ensure `.env.local` is in project root and restarted

---

## File References

- **Service Layer:** `src/api/strapiService.ts`
- **Composable:** `src/composables/useAppData.ts`
- **Mock Data:** `src/api/mockData.ts`
- **Types:** `src/types.ts`
- **Config Example:** `.env.example`
