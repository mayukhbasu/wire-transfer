declare namespace Express {
  export interface User {
    id: string;
    displayName?: string;
    googleId?: string;
  }
}