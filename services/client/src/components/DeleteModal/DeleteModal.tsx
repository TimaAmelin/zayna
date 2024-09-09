'use client';

import React from 'react';
import { DeleteModalButton, DeleteModalContainer, DeleteModalMainText, DeleteModalSecondaryText, DeleteModalSecondaryTextContainer } from './DeleteModal.css';
import { Drawer } from '@mui/material';
import { deleteAccount } from '@/api/handlers/deleteAccount';


export const DeleteModal = (
    { 
        id,
        toggleDrawer,
        open
    }: {
        id: number;
        toggleDrawer: any;
        open: boolean;
    },
) => {
    return (
        <Drawer
            open={open} 
            onClose={() => toggleDrawer(false)}
            anchor="bottom"
            sx={{
                '& .MuiDrawer-paper': {
                  background: 'none',
                  overflow: 'visible'
                }
              }}>
            <DeleteModalContainer>
                <DeleteModalMainText>
                    Are you sure you want<br />
                    to delete your account?
                </DeleteModalMainText>
                <DeleteModalSecondaryTextContainer>
                    <DeleteModalSecondaryText>
                    All your data, including game progress, achievements<br />
                    and purchases will be irretrievably deleted.
                    </DeleteModalSecondaryText>
                </DeleteModalSecondaryTextContainer>
                <DeleteModalButton sx={{backgroundColor: '#FD3F36', color: '#fff'}} onClick={async () => {
                    await deleteAccount(id);
                    toggleDrawer(false);
                    window.Telegram.WebApp.close();
                }}>
                    Delete account
                </DeleteModalButton>
                <DeleteModalButton onClick={() => toggleDrawer(false)}>
                    Cancel
                </DeleteModalButton>
            </DeleteModalContainer>
        </Drawer>
    )
}