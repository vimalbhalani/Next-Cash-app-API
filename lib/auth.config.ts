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
      allowDangerousEmailAccountLinking: true,
      async profile(profile, req: Next) {
        await dbConnect();

        // Get the user's IP address from the request
        const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const user = await User.findOne({ email: profile.email });

        if (!user) {
          const newUser = new User({
            firstname: profile.name,
            email: profile.email,
            verifystatus: "yes",
            ip: userIp, // Save the user's IP address
          });
          await newUser.save(); // Save the new user to the database
        }

        return {
          name: profile.name,
          email: profile.email,
          ip: userIp, // You can return IP in the profile if needed
        };
      },
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
