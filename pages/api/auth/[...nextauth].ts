import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from '../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export const authOptions: NextAuthOptions = ({
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

      let { data: user_info, error: user_error } = await
        supabase
          .from('Users')
          .select()
          .eq('email', user?.email);
        
       

      //console.log(data);



      // let { data: Secret_Keys, error: api_error } = await supabase
      //   .from('Secret_Keys')
      //   .select()
      //   .eq('created_by', user?.email);

      //   const user_keys = { api_keys: Secret_Keys}

      if (user_info && user_info.length > 0) {
        session.user = {
          ...user,
          ...user_info[0],
          // ...user_keys
        };
      }

      //console.log(session);
      //console.log(user);
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl) return `${baseUrl}/app`

      return baseUrl
    },
  },

  secret: process.env.JWT_TOKEN,

})

export default NextAuth(authOptions);