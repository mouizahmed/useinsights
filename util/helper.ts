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

}

export function hideKey(text: string, initial: number): string {
    const remainingLength = text.length - initial;
    const hiddenPart = "*".repeat(remainingLength);

    return text.substring(0, initial) + hiddenPart;
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