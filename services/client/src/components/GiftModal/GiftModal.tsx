'use client';

import React from 'react';
import {
  GiftModalButton,
  GiftModalContainer,
  GiftModalMainText,
  GiftModalSecondaryText,
  GiftModalSecondaryTextContainer,
} from './GiftModal.css';
import { Drawer } from '@mui/material';

import GiftIcon from '../../assets/icons/gift.png';
import Image from 'next/image';
import { recieveGift } from '@/api/handlers/recieveGift';

export const GiftModal = ({
  id,
  gift,
  toggleDrawer,
  open,
  refetch,
}: {
  id: number;
  gift?: {
    id: number;
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
  refetch: () => Promise<void>;
}) => {
  return (
    <Drawer
      open={open}
      onClose={() => toggleDrawer(false)}
      anchor="bottom"
      sx={{
        '& .MuiDrawer-paper': {
          background: 'none',
          overflow: 'visible',
        },
      }}
    >
      <GiftModalContainer>
        <Image src={GiftIcon} height={46} alt="" />
        <GiftModalMainText>
          Вы получили подарок <br />
          <span style={{ color: '#7ADA46' }}>от {gift?.sender__username}</span>
        </GiftModalMainText>
        <GiftModalSecondaryTextContainer>
          {gift?.project__name}
          <GiftModalSecondaryText>
            {gift?.project__description}
          </GiftModalSecondaryText>
        </GiftModalSecondaryTextContainer>
        <GiftModalButton
          onClick={async () => {
            if (gift) {
              await recieveGift(id, gift?.id);
              await refetch();
              toggleDrawer(false);
            }
          }}
        >
          Получить
        </GiftModalButton>
      </GiftModalContainer>
    </Drawer>
  );
};
