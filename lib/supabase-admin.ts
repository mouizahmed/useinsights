import { createClient } from '@supabase/supabase-js';
import { User } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASEURL ?? '';
const supabaseKey = process.env.SERVICE_ROLE ?? '';
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export async function deleteAccount(email: string) {

    const { error } = await supabaseAdmin
        .from('Users')
        .delete()
        .eq('email', email);

    if (error) throw Error(error.message);

}

export async function createAccount(user: User) {
    const { data: newUser, error: newUserError } = await supabaseAdmin
        .from('Users')
        .insert([
            {
                id: uuidv4(),
                email: user.email,
                name: user.name,
                image: user.image
            }
        ])
}

export async function updateAccount(user: User, id: number) {
    const { data, error } = await supabaseAdmin
        .from('Users')
        .update({ name: user.name, image: user.image })
        .eq('id', id)

    if (error) {
        console.log(error);
        return false;
    }

    return true;
}

export async function getAccountByEmail(email: string) {

}

export async function getSecretKeys(email: string) {
    let { data: Secret_Keys, error: api_error } = await supabaseAdmin
        .from("Secret_Keys")
        .select()
        .eq("created_by", email);

    if (api_error) {
        throw Error(api_error.message);
    }

    return Secret_Keys;
}

export async function addSecretKey(email: string) {
    const { data, error } = await supabaseAdmin
        .from("Secret_Keys")
        .insert([{ created_by: email }])
        .select();

    if (error) {
        throw Error(error.message);
    }
    return data;
}

export async function deleteSecretKey(api_key: string) {
    const { data, error } = await supabaseAdmin
        .from("Secret_Keys")
        .delete()
        .eq("secret_key", api_key);

    if (error) throw Error(error.message);

    return data;
}

export async function setOpenAI(openAI: string, userID: string) {
    const { data, error } = await supabaseAdmin
        .from("Users")
        .update({ openAI: openAI })
        .match({ id: userID })
        .select();

    console.log(data);
}

export async function createOrRetrieveCustomer(userID: string) {
    
}

