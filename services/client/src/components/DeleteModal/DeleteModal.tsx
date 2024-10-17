'use client';

import React from 'react';
import {
  DeleteModalButton,
  DeleteModalContainer,
  DeleteModalMainText,
  DeleteModalSecondaryText,
  DeleteModalSecondaryTextContainer,
} from './DeleteModal.css';
import { Drawer } from '@mui/material';
import { deleteAccount } from '@/api/handlers/deleteAccount';

export const DeleteModal = ({
  id,
  toggleDrawer,
  open,
}: {
  id: number;
  toggleDrawer: any;
  open: boolean;
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
      <DeleteModalContainer>
        <DeleteModalMainText>
          Вы уверены, что хотите
          <br />
          удалить Ваш аккаунт?
        </DeleteModalMainText>
        <DeleteModalSecondaryTextContainer>
          <DeleteModalSecondaryText>
            Все ваши данные, включая игровой прогресс, достижения
            <br />и покупки будут безвозвратно удалены.
          </DeleteModalSecondaryText>
        </DeleteModalSecondaryTextContainer>
        <DeleteModalButton
          sx={{ backgroundColor: '#FD3F36', color: '#fff' }}
          onClick={async () => {
            await deleteAccount(id);
            toggleDrawer(false);
            window.Telegram.WebApp.close();
          }}
        >
          Удалить аккаунт
        </DeleteModalButton>
        <DeleteModalButton onClick={() => toggleDrawer(false)}>
          Отмена
        </DeleteModalButton>
      </DeleteModalContainer>
    </Drawer>
  );
};
