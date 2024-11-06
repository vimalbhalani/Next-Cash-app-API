import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from './dbConnect';
import User from '@/models/User';

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
        const user = {
          id: '1',
          name: 'John',
          email: credentials?.email as string
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/' // Sign-in page path
  },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      await dbConnect();
      
      if (account.provider === 'google') {
        try {
          // Retrieve the Google access token
          const googleAccessToken = account.access_token;
          let existingUser = await User.findOne({ email: user.email });
          
          // If user doesn't exist, create a new one with the access token
          if (!existingUser) {
            existingUser = await User.create({
              firstname: user.name,
              email: user.email,
              verifystatus: "yes",
              ip: "Google",
              token: googleAccessToken, // Save the token in the database
            });
          } else {
            console.log("<<<<<<<<<<<<<<<<", googleAccessToken);
            // Update access token for the existing user
            existingUser.token = googleAccessToken;
            await existingUser.save();

            
          }

          console.log(">>>>>>>>>>>>>>>>>>", googleAccessToken);
          

          // Store user information for the client side
          const userInfo = {
            userId: existingUser._id,
            email: existingUser.email,
            token: googleAccessToken,
            role: existingUser.role,
            name: existingUser.firstname,
          };

          console.log("??????????????????", userInfo);
          

          // Save userInfo in the token for access in jwt callback
          account.userInfo = userInfo;

          return true;
        } catch (error) {
          console.error("Error saving Google user to the database", error);
          return false;
        }
      }
      
      return true;
    },
    
    async jwt({ token, user, account }: any) {
      // Check if userInfo was added in signIn callback and store it in the JWT token
      if (account?.userInfo) {
        token.userInfo = account.userInfo;
      }
      
      return token;
    },
    
    async session({ session, token }: any) {
      // Add userInfo from the token to the session object so it's available on the client side
      session.userInfo = token.userInfo;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  }
} satisfies NextAuthConfig;

export default authConfig;
