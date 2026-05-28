// Deprecated mock database. Mock auth removed; keep minimal exports for compatibility.
export const mockUsers: unknown[] = [];
export const mockAuth = {
  findByEmail: () => null,
  findByUsername: () => null,
  validateCredentials: () => null,
  generateToken: () => "",
};
