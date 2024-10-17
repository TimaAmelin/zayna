'use client';

import React, { useState } from 'react';
import {
  SettingsButton,
  SettingsInput,
  SettingsContainer,
  SettingsMainContainer,
  SettingsSecondaryTextContainer,
  SettingsTitleContainer,
  SettingsButtonsContainer,
} from './SettingsName.css';
import { useRouter } from 'next/navigation';
import { changeName } from '@/api/handlers/changeName';

export const SettingsName = () => {
  const router = useRouter();

  const [name, setName] = useState('');

  return (
    <SettingsContainer>
      <SettingsMainContainer>
        <SettingsTitleContainer>Выбор имени</SettingsTitleContainer>
        <SettingsSecondaryTextContainer>
          Введите новое имя
        </SettingsSecondaryTextContainer>
        <SettingsInput
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></SettingsInput>
      </SettingsMainContainer>
      <SettingsButtonsContainer>
        <SettingsButton
          onClick={async () => {
            await changeName(
              window.Telegram.WebApp.initDataUnsafe.user.id,
              name
            );
            router.push(
              `/settings?id=${window.Telegram.WebApp.initDataUnsafe.user.id}&username=${name}`
            );
          }}
        >
          Готово
        </SettingsButton>
        <SettingsButton
          sx={{ backgroundColor: '#fff' }}
          onClick={() => router.push(`/settings`)}
        >
          Закрыть
        </SettingsButton>
      </SettingsButtonsContainer>
    </SettingsContainer>
  );
};
