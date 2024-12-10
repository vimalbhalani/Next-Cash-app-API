import NextAuth from 'next-auth';
import authConfig from './auth.config';

console.log('Auth env', process.env);
export const { auth, handlers, signOut, signIn } = NextAuth(authConfig);
