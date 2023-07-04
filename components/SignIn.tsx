import React, { useState, useCallback } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';

export const SignIn = () => {
    const { data: session } = useSession();

    async function handleSignIn() {
        signIn('google');
    }

    async function handleSignOut() {
        signOut();
    }

    
    if (session) {
        return (
            <>
            <Paper elevation={2} className="flex justify-center items-center px-2 py-1 space-x-2 hover:bg-zinc-200 hover:cursor-pointer duration-300">
            <Avatar alt={session.user?.name as string} src={session.user?.image as string} sx={{ width: 24, height: 24 }} />
            <h1>{session.user?.email}</h1>
            </Paper>
            
            
            </>
        )
    } else {
        return (
            <>
            <h1>Sign In</h1>
            </>
        )
    }
    

}

