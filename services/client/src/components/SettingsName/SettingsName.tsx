'use client'

import React, { useState } from 'react';
import { SettingsButton, SettingsInput, SettingsContainer, SettingsMainContainer, SettingsSecondaryTextContainer, SettingsTitleContainer, SettingsButtonsContainer } from './SettingsName.css';
import { useRouter } from 'next/navigation';
import { changeName } from '@/api/handlers/changeName';

export const SettingsName = ({ id, username }: {
    id: number,
    username?: string,
}) => {
    const router = useRouter();

    const [name, setName] = useState('');

    return (
        <SettingsContainer>
            <SettingsMainContainer>
                <SettingsTitleContainer>
                    Name selection
                </SettingsTitleContainer>
                <SettingsSecondaryTextContainer>
                    Type in a new name
                </SettingsSecondaryTextContainer>
                <SettingsInput placeholder="Name" value={name} onChange={e => setName(e.target.value)}>
                </SettingsInput>
            </SettingsMainContainer>
            <SettingsButtonsContainer>
                <SettingsButton onClick={async () => {
                    await changeName(id, name);
                    router.push(`/settings?id=${id}&username=${name}`);
                }}>
                    Done
                </SettingsButton>
                <SettingsButton sx={{backgroundColor: '#fff'}} onClick={() => router.push(`/settings?id=${id}&username=${username}`)}>
                    Close
                </SettingsButton>
            </SettingsButtonsContainer>
        </SettingsContainer>
    )
}