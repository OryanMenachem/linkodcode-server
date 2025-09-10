export class User {
  id: string;
  username: string;
  role: 'user' | 'admin';
  hashed_password: string;
}
