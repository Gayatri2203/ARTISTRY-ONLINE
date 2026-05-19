// Mock database for development and testing

export interface MockUser {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  isArtist: boolean;
  isVerified: boolean;
  createdAt: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    username: "johndoe",
    email: "john@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    avatar: "JD",
    bio: "Digital artist passionate about creating unique artwork",
    isArtist: true,
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    username: "janedoe",
    email: "jane@example.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Doe",
    avatar: "JA",
    bio: "Art collector and enthusiast",
    isArtist: false,
    isVerified: true,
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    username: "artistpro",
    email: "artist@example.com",
    password: "password123",
    firstName: "Alex",
    lastName: "Artist",
    avatar: "AA",
    bio: "Professional digital artist with 10+ years experience",
    isArtist: true,
    isVerified: true,
    createdAt: "2024-02-01T00:00:00Z",
  },
];

// Helper functions for mock authentication
export const mockAuth = {
  findByEmail: (email: string) => mockUsers.find((u) => u.email === email),
  findByUsername: (username: string) => mockUsers.find((u) => u.username === username),
  validateCredentials: (email: string, password: string) => {
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    return user || null;
  },
  generateToken: () => {
    return `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },
};
