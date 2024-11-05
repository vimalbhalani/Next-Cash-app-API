import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from './dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password must be provided");
        }

        try {
          const user = await User.findOne({ email: credentials.email });
          if (user && typeof user.password === 'string') {
            const isMatch = await bcrypt.compare(credentials.password, user.password);
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err: any) {
          throw new Error(err.message || "An error occurred during authentication");
        }
      }
    })
  ],
  pages: {
    signIn: '/' // Sign-in page path
  }
} satisfies NextAuthConfig;

export default authConfig;
