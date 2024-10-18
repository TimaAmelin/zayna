'use client';

import React from 'react';
import {
  MiniModalButton,
  MiniModalContainer,
  MiniModalMainText,
  MiniModalSecondaryText,
  MiniModalSecondaryTextContainer,
} from './MiniModal.css';
import { Drawer } from '@mui/material';

import GiftIcon from '../../assets/icons/gift.png';
import Image from 'next/image';
import { recieveGift } from '@/api/handlers/recieveGift';
import { useRouter } from 'next/navigation';

export const MiniModal = ({
  toggleDrawer,
  open,
}: {
  toggleDrawer: any;
  open: boolean;
}) => {
  const router = useRouter();
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
      <MiniModalContainer>
        <Image src={GiftIcon} height={46} alt="" />
        <MiniModalMainText>Вы выйграли 50K</MiniModalMainText>
        <MiniModalButton
          onClick={async () => {
            router.push('/tapper');
          }}
        >
          Получить
        </MiniModalButton>
      </MiniModalContainer>
    </Drawer>
  );
};
