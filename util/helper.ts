import { supabase } from '../lib/supabase';
// import { parse, serialize } from "cookie";
import { Session } from 'next-auth';
// import { useSession, signIn, signOut } from "next-auth/react";

export async function decreaseUserCredits(email: string | null) {
    //const email = session.user?.email;
    const { data, error } = await supabase
    .rpc('decrementcredits', { email });

if (error) {
    throw new Error("Error updating user credits");
}
    

    // const cookies = parse(document.cookie);
    // if (!cookies.credits) {
    //     document.cookie = `credits=5;path=/;max-age=${60};samesite=lax`;

    //     const cookieValue = serialize("session", "5", {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === "production",
    //         maxAge: 60 * 60 * 24 * 7, // 1 week
    //         sameSite: "strict",
    //         path: "/",
    //       });
    //       `res.setHeader("Set-Cookie", cookieValue);`
    // }

    // if (!session) {
    //     document.cookie = `credits=${parseInt(cookies.credits)-1};path=/;max-age=${60*60*24*7};samesite=lax`;
    // } else {
    //     return "0";
    // }

}

export async function addUserCredits() {

}

export async function getUserCredits(session: Session | null) {

    // const cookies = parse(document.cookie);
    // if (!cookies.credits) {
    //     document.cookie = `credits=5;path=/;max-age=${60};samesite=lax`;
    // }

    // // const updatedCookie = serialize('credits', "3", {
    // //     path: '/',
    // // })

    // // document.cookie = updatedCookie;


    // if (!session) {
    //     console.log(cookies.credits);
    //     return cookies.credits;
    // } else {
    //     return "0";
    // }

}