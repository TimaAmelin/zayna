'use client';

import React, { useState } from 'react';
import {
  SettingsButton,
  SettingsCard,
  SettingsContainer,
  SettingsMainContainer,
  SettingsPrivacyPolicy,
  SettingsTitleContainer,
} from './Settings.css';
import { useRouter } from 'next/navigation';

import SettingsIcon from '../../assets/icons/settings.png';
import Arrow from '../../assets/icons/arrow.svg';
import Delete from '../../assets/icons/delete.svg';
import Exchange from '../../assets/icons/exchange.svg';
import Name from '../../assets/icons/name.svg';
import Image from 'next/image';
import { Box } from '@mui/material';
import Link from 'next/link';
import { DeleteModal } from '../DeleteModal/DeleteModal';

export const Settings = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <SettingsContainer>
      <SettingsMainContainer>
        <SettingsTitleContainer>
          <Image src={SettingsIcon} alt="" height={32} />
          Настройки
        </SettingsTitleContainer>
        <SettingsCard onClick={() => router.push(`/stocks`)}>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Exchange style={{ margin: 10 }} /> Раздел обмена
          </Box>
          <Arrow style={{ margin: 15 }} />
        </SettingsCard>
        <SettingsCard onClick={() => router.push(`/settings/name`)}>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Name style={{ margin: 10 }} /> Выбор имени
          </Box>
          <Arrow style={{ margin: 15 }} />
        </SettingsCard>
        <SettingsCard onClick={() => setOpen(true)}>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Delete style={{ margin: 10 }} /> Удалить аккаунт
          </Box>
          <Arrow style={{ margin: 15 }} />
        </SettingsCard>
        <SettingsPrivacyPolicy>
          <Link style={{ color: '#C3C2C2', textDecoration: 'none' }} href="">
            Политика приватности
          </Link>
        </SettingsPrivacyPolicy>
      </SettingsMainContainer>
      <SettingsButton onClick={() => router.push(`/tapper`)}>
        Закрыть
      </SettingsButton>
      {typeof window !== 'undefined' && (
        <DeleteModal
          id={window?.Telegram.WebApp.initDataUnsafe.user.id ?? 0}
          open={open}
          toggleDrawer={setOpen}
        />
      )}
    </SettingsContainer>
  );
};
