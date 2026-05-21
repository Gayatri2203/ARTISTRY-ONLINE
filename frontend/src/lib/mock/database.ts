// Deprecated mock database. Mock auth removed; keep minimal exports for compatibility.
export const mockUsers: any[] = [];
export const mockAuth = {
  findByEmail: (_: string) => null,
  findByUsername: (_: string) => null,
  validateCredentials: (_: string, __: string) => null,
  generateToken: () => "",
};
