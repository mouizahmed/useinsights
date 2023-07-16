import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from '../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {

      // get user from database
      const { data: ExistingUser, error: ExistingUserError } = await supabase
        .from('Users')
        .select('*')
        .eq('email', user.email)
        .limit(1);

      if (ExistingUserError) {
        console.log('Supabase error when retreiving user');
        return false;
      }

      // user does not exist in database
      if (ExistingUser.length === 0) {
        const { data: newUser, error: newUserError } = await supabase
          .from('Users')
          .insert([
            {
              id: uuidv4(),
              email: user.email,
              name: user.name,
              image: user.image
            }
          ])
      } else {
        // update name and/or profile picture
        if (ExistingUser[0].name !== user.name || ExistingUser[0].image !== user.image) {
          const { data, error } = await supabase
            .from('Users')
            .update({ name: user.name, image: user.image })
            .eq('id', ExistingUser[0].id)

          if (error) {
            console.log(error);
            return false;
          }
        }

        // // update profile picture
        // if (ExistingUser[0].profile_picture !== user.image) {
        //   const { data, error } = await supabase
        //   .from('Users')
        //   .update({ profile_picture: user.image})
        //   .eq('id', ExistingUser[0].id)

        //   if (error) {
        //     console.log(error);
        //     return false;
        //   }
        // }
      }

      return true;
    },
    async session({ session }) {
      let { user } = session;
      //console.log(session);

      let { data, error } = await
        supabase
          .from('Users')
          .select()
          .eq('email', user?.email);

      //console.log(data);

      if (data && data.length > 0) {
        session.user = {
          ...user,
          ...data[0],
        };
      }

      //console.log(session);
      //console.log(user);
      return session;
    }
  },

  secret: process.env.JWT_TOKEN,

})