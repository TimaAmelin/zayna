'use client';

import React, { useState } from 'react';
import { RewardModalContainer, RewardModalMainText, RewardModalCard, RewardModalSecondaryText, RewardModalSecondaryTextContainer, RewardModalCardRow, RewardModalCardShadow, RewardModalButton } from './RewardModal.css';
import { Box, Drawer, IconButton } from '@mui/material';

import Reward from '../../assets/icons/reward.png';
import Lock from '../../assets/icons/lock.png';
import Coin from '../../assets/icons/coin_calendar.png';
import Gift from '../../assets/icons/gift_calendar.png';
import Image from 'next/image';
import { RewardExactModal } from '../RewardExactModal/RewardExactModal';
import { Close } from '@mui/icons-material';
import { recieveDaily } from '@/api/handlers/recieveDaily';

export const RewardModal = (
    { 
        id,
        toggleDrawer,
        open,
        combo,
        available,
        money,
        setMoney,
        setAvailable,
    }: {
        id: number;
        toggleDrawer: any;
        open: boolean;
        combo: number;
        available: boolean;
        money: number;
        setMoney: (x: number) => void;
        setAvailable: (x: boolean) => void;
    },
) => {
    const [rewards, setRewards] = useState([
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'gift',
            text: 'Текст подсказка совет',
        },
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'gift',
            text: 'Текст подсказка совет',
        },
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'gift',
            text: 'Текст подсказка совет',
        },
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'gift',
            text: 'Текст подсказка совет',
        },
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'gift',
            text: 'Текст подсказка совет',
        },
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'gift',
            text: 'Текст подсказка совет',
        },
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'gift',
            text: 'Текст подсказка совет',
        },
        {
            type: 'coins',
            amount: 1000,
        },
        {
            type: 'gift',
            text: 'Текст подсказка совет',
        },
        {
            type: 'coins',
            amount: 1000,
        },
    ]);

    const [openExact, setOpenExact] = useState(false);
    const [reward, setReward] = useState(rewards[0]);

    return (
        <Drawer
            open={open} 
            onClose={() => toggleDrawer(false)}
            anchor="bottom"
            sx={{
                '& .MuiDrawer-paper': {
                    background: 'none',
                    overflow: 'visible',
                    height: '100%',
                },
            }}>
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                <RewardModalContainer>
                    <Image src={Reward} alt="" height={74} />
                    <RewardModalMainText>
                        Daily reward
                    </RewardModalMainText>
                    <RewardModalSecondaryTextContainer>
                        <RewardModalSecondaryText>
                        Pick up coins for logging into the game daily without<br />skipping. The ‘Pick up’ button must be pressed daily,<br />otherwise the day count will start again
                        </RewardModalSecondaryText>
                    </RewardModalSecondaryTextContainer>
                    {
                        [0, 1, 2, 3].map(rowN => (
                            <RewardModalCardRow key={1}>
                                {[0, 1, 2, 3, 4].map(rewardN => rowN * 5 + rewardN <= combo ? (
                                    <RewardModalCard key={1} onClick={async () => {
                                        if (!available) {
                                            return
                                        }
                                        const result = await recieveDaily(id);
                                        setMoney(money + result.response.tokens ?? 0);
                                        setReward(rewards[rowN * 5 + rewardN])
                                        setOpenExact(true)
                                    }}>
                                        <Box sx={{height: 32, display: 'flex', alignItems: 'center'}}>
                                            <Image src={rewards[rowN * 5 + rewardN].type === 'coins' ? Coin : Gift} alt="" height={26} />
                                        </Box>
                                        Day {rowN * 5 + rewardN + 1}<br />
                                        {rewards[rowN * 5 + rewardN].type === 'coins' && '1K'}
                                        {rowN * 5 + rewardN < combo && <RewardModalCardShadow />}
                                        {rowN * 5 + rewardN === combo && !available && <RewardModalCardShadow />}
                                    </RewardModalCard>
                                ) : (
                                    <RewardModalCard key={1}>
                                        <Image src={Lock} alt="" height={40} />
                                    </RewardModalCard>
                                ))}
                            </RewardModalCardRow>
                        ))
                    }
                </RewardModalContainer>
            </Box>
            <RewardModalButton>
                <IconButton onClick={() => toggleDrawer(false)}>
                    <Close sx={{color: '#fff'}} />
                </IconButton>
            </RewardModalButton>
            <RewardExactModal id={id} toggleDrawer={setOpenExact} open={openExact} reward={reward} />
        </Drawer>
    )
}