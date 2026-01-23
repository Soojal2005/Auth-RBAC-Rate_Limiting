export type User = {
  id:string,
  email:string,
  passwordHash: string;
  role: string;
}
export const users:User[] = [];