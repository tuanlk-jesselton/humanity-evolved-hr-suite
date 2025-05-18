export interface JwtPayload {
  sub: number; // user id
  email?: string; // Made optional to match User entity
  roles: string[];
}
