'use client'

import React, { useState } from 'react';
import { SettingsButton, SettingsCard, SettingsContainer, SettingsMainContainer, SettingsPrivacyPolicy, SettingsTitleContainer } from './Settings.css';
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

export const Settings = ({ id, username }: {
    id: number,
    username?: string,
}) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    return (
        <SettingsContainer>
            <SettingsMainContainer>
                <SettingsTitleContainer>
                    <Image src={SettingsIcon} alt="" height={32} />
                    Settings
                </SettingsTitleContainer>
                <SettingsCard onClick={() => router.push(`/stocks?id=${id}&username=${username}`)}>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Exchange style={{margin: 10}} /> Exchange section
                    </Box>
                    <Arrow style={{margin: 15}} />
                </SettingsCard>
                <SettingsCard onClick={() => router.push(`/settings/name?id=${id}&username=${username}`)}>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Name style={{margin: 10}} /> Name selection 
                    </Box>
                    <Arrow style={{margin: 15}} />
                </SettingsCard>
                <SettingsCard onClick={() => setOpen(true)}>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Delete style={{margin: 10}} /> Delete account
                    </Box>
                    <Arrow style={{margin: 15}} />
                </SettingsCard>
                <SettingsPrivacyPolicy>
                    <Link style={{ color: '#C3C2C2', textDecoration: 'none' }} href="">Privacy policy</Link>
                </SettingsPrivacyPolicy>
            </SettingsMainContainer>
            <SettingsButton onClick={() => router.push(`/tapper?id=${id}&username=${username}`)}>
                Close
            </SettingsButton>
            <DeleteModal id={id} open={open} toggleDrawer={setOpen} />
        </SettingsContainer>
    )
}