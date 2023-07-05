import React, { useState, useCallback } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';


export const SignIn = () => {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    async function handleSignIn() {
        signIn('google');
    }

    async function handleSignOut() {
        signOut();
    }

    function handleClick(event: any) {
        console.log("hello");
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
      };
    
    if (session) {
        return (
            <>
            <Stack direction="row" spacing={2} className="flex justify-center items-center">

            <Paper elevation={2} sx={{ borderRadius: '20px', background: 'white', }} className=" h-7 flex justify-center items-center px-2 py-1 space-x-2 hover:bg-zinc-200 hover:cursor-pointer duration-300">
                {`Free`} Tier
            </Paper>

            <Paper elevation={2} sx={{ borderRadius: '20px' }}  className=" h-7 flex justify-center items-center px-2 py-1 space-x-2 hover:bg-zinc-200 hover:cursor-pointer duration-300">
                {3} Credits
            </Paper>

            <Tooltip title="Account settings">
            <Paper elevation={2} className="flex justify-center items-center px-2 py-1 space-x-2 hover:bg-zinc-200 hover:cursor-pointer duration-300" onClick={handleClick}>
            <Avatar alt={session.user?.name as string} src={session.user?.image as string} sx={{ width: 24, height: 24 }} />
            {/* <h1>{session.user?.email}</h1> */}
            </Paper>
            </Tooltip>

            

            </Stack>

        
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        disableAutoFocusItem
      >
        <MenuItem onClick={handleClose} sx={{ pointerEvents: 'none' }}>
            <b>Signed in as {session.user?.name}</b>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CreditCardIcon fontSize="small" />
          </ListItemIcon>
          Buy More Credits
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ChangeHistoryIcon fontSize="small" />
          </ListItemIcon>
          Upgrade Plan
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Signout
        </MenuItem>
      </Menu>
            
            
            </>
        )
    } else {
        return (
            <>
            <Stack direction="row" spacing={2}>

                <Paper elevation={2} className="flex justify-center items-center px-2 py-1 space-x-2 hover:bg-zinc-200 hover:cursor-pointer duration-300">
                    {`Guest`} Tier
                </Paper>

                {/* KEEP TRACK OF UNLOGGED IN USER CREDITS WITH COOKIES */}
                <Paper elevation={2} className="flex justify-center items-center px-2 py-1 space-x-2 hover:bg-zinc-200 hover:cursor-pointer duration-300">
                    {3} Available Credits
                </Paper>

                <Tooltip title="Sign in with Google">
                <Paper elevation={2} className="flex justify-center items-center px-2 py-1 space-x-2 hover:bg-zinc-200 hover:cursor-pointer duration-300" onClick={handleSignIn}>
                <AccountCircleIcon fontSize="small" />
                <h1>Sign in with Google</h1>
                </Paper>
                </Tooltip>
            </Stack>
            </>
        )
    }
    

}

