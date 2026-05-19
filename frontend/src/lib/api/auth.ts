import { mockAuth, mockUsers } from "@/src/lib/mock/database";
import type { AuthResponse, LoginCredentials, RegisterPayload, User } from "@/src/types";

// Mock delay to simulate API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(500); // Simulate network delay
    
    const user = mockAuth.validateCredentials(credentials.email, credentials.password);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const token = mockAuth.generateToken();
    
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        bio: user.bio,
        isArtist: user.isArtist,
        isVerified: user.isVerified,
      },
      token,
    };
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    await delay(500); // Simulate network delay
    
    // Check if user already exists
    const existingUser = mockAuth.findByEmail(payload.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create new user (in a real app, this would save to database)
    const firstName = payload.firstName || payload.username;
    const lastName = payload.lastName || "";
    const newUser = {
      id: `${Date.now()}`,
      username: payload.username,
      email: payload.email,
      password: payload.password,
      firstName,
      lastName,
      avatar: firstName.charAt(0) + (lastName.charAt(0) || ""),
      bio: "",
      isArtist: false,
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    const token = mockAuth.generateToken();
    
    return {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        avatar: newUser.avatar,
        bio: newUser.bio,
        isArtist: newUser.isArtist,
        isVerified: newUser.isVerified,
      },
      token,
    };
  },

  me: async (): Promise<User> => {
    await delay(300); // Simulate network delay
    
    // Return a mock user for testing
    const mockUser = mockUsers[0];
    return {
      id: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      avatar: mockUser.avatar,
      bio: mockUser.bio,
      isArtist: mockUser.isArtist,
      isVerified: mockUser.isVerified,
    };
  },

  logout: async (): Promise<void> => {
    await delay(300); // Simulate network delay
    return Promise.resolve();
  },
};
