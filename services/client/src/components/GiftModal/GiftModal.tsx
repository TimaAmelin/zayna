'use client';

import React from 'react';
import { GiftModalButton, GiftModalContainer, GiftModalMainText, GiftModalSecondaryText, GiftModalSecondaryTextContainer } from './GiftModal.css';
import { Drawer } from '@mui/material';

import GiftIcon from '../../assets/icons/gift.png';
import Image from 'next/image';

export const GiftModal = (
    { 
        id,
        gift,
        toggleDrawer,
        open,
    }: {
        id: number;
        gift?: {
            project__id: number;
            project__name: string;
            project__price: number;
            project__income: number;
            project__level: number;
            project__mode: string;
            project__description: string;
            project__logo: string;
            sender__username: string;
        };
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
            <GiftModalContainer>
                <Image src={GiftIcon} height={46} alt="" />
                <GiftModalMainText>
                    You have a gift <br />
                    <span style={{color: '#7ADA46',}}>from Anna Ivanova</span>
                </GiftModalMainText>
                <GiftModalSecondaryTextContainer>
                    <GiftModalSecondaryText>
                        Strategic session in Europe lvl2 
                    </GiftModalSecondaryText>
                </GiftModalSecondaryTextContainer>
                <GiftModalButton onClick={() => toggleDrawer(false)}>
                    Recieve
                </GiftModalButton>
            </GiftModalContainer>
        </Drawer>
    )
}