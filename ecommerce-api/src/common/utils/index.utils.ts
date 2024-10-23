import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
// payload jwt interface
export interface JwtPayload {
   id: number;
   name: string;
   email: string;
   role: Role;
}

// hashing utils
export async function hashingPassword(password: string): Promise<string> {
   return await bcrypt.hash(password, 10);
}
