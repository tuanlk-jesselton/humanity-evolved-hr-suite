
export interface JwtPayload {
  sub: number; // user id
  email: string;
  roles: string[];
  iat?: number; // issued at
  exp?: number; // expiration
}
