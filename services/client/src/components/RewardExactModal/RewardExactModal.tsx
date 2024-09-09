'use client';

import React from 'react';
import { RewardExactModalButton, RewardExactModalContainer, RewardExactModalMainText, RewardExactModalSecondaryText, RewardExactModalSecondaryTextContainer } from './RewardExactModal.css';
import { Drawer } from '@mui/material';
import Image from 'next/image';

import Gift from '../../assets/icons/gift.png';
import Coin from '../../assets/icons/coin_big.png';

export const RewardExactModal = (
    { 
        id,
        toggleDrawer,
        open,
        reward,
    }: {
        id: number;
        toggleDrawer: any;
        open: boolean;
        reward: {
            type: string;
            amount: number;
            text?: undefined;
        } | {
            type: string;
            text: string;
            amount?: undefined;
        };
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
            <RewardExactModalContainer>
                <Image src={reward.type === 'coins' ? Coin : Gift} alt="" height={74} />
                <RewardExactModalMainText>
                    You got...
                </RewardExactModalMainText>
                <RewardExactModalSecondaryTextContainer>
                    <RewardExactModalSecondaryText>
                        {reward.text ?? (reward.amount + ' Tokens')}
                    </RewardExactModalSecondaryText>
                </RewardExactModalSecondaryTextContainer>
                <RewardExactModalButton onClick={() => toggleDrawer(false)}>
                    Recieve
                </RewardExactModalButton>
            </RewardExactModalContainer>
        </Drawer>
    )
}