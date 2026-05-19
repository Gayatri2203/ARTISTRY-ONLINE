# Mock Authentication Setup

This project now uses a mock authentication system for development and testing.

## Mock Users

The following test accounts are available in the mock database:

### User 1 - Artist Account
- **Email:** john@example.com
- **Password:** password123
- **Username:** johndoe
- **Role:** Artist (Verified)

### User 2 - Collector Account
- **Email:** jane@example.com
- **Password:** password123
- **Username:** janedoe
- **Role:** Collector (Verified)

### User 3 - Professional Artist
- **Email:** artist@example.com
- **Password:** password123
- **Username:** artistpro
- **Role:** Artist (Verified)

## How to Use

1. Navigate to the login page: `http://localhost:3000/login`
2. Enter any of the credentials above
3. Click "Login"
4. You will be redirected to the dashboard or the originally requested page

## Protected Routes

The following routes are protected and require authentication:
- `/dashboard` - User dashboard
- `/upload` - Upload artwork page
- `/profile/[username]` - User profile pages
- `/profile/edit` - Profile editing

## How It Works

The mock authentication system:
- Uses a local mock database (`src/lib/mock/database.ts`)
- Simulates API calls with artificial delays
- Generates mock tokens for session management
- Stores authentication state in localStorage and cookies
- Works with the existing Zustand auth store

## Development Notes

- The mock API is located in `src/lib/api/auth.ts`
- To switch to real API, replace the mock implementations with actual API calls
- The mock database can be extended with additional users in `src/lib/mock/database.ts`
