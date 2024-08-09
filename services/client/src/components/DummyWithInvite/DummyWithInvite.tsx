'use client'

import React, { useEffect } from 'react';
import { ContentCopyIcon, DummyContainer, DummyContentContainer, DummyHeader, DummyInviteButton, DummyInviteButtonContainer, DummyInviteButtonText, DummyInviteText, DummySocial, DummySocialContainer, DummySubHeader, DummyText } from './DummyWithInvite.css';
import Image from 'next/image';
import insta from '../../assets/social/insta.png';
import tg from '../../assets/social/tg.png';
import tiktok from '../../assets/social/tiktok.png';
import x from '../../assets/social/x.png';
import yt from '../../assets/social/yt.png';
import { putUser } from '@/api/handlers/putUser';
import { Box } from '@mui/material';

function copyTextToClipboard(text: string): void {
    if (navigator.clipboard) {
        // Современный способ через Clipboard API
        navigator.clipboard.writeText(text).then(() => {
            console.log('Текст скопирован в буфер обмена');
        }).catch(err => {
            console.error('Ошибка при копировании текста: ', err);
        });
    } else {
        // Обратная совместимость для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            console.log('Текст скопирован в буфер обмена');
        } catch (err) {
            console.error('Ошибка при копировании текста: ', err);
        }
        document.body.removeChild(textArea);
    }
}

export const DummyWithInvite = ({ id, username, from, tgLogin }: {
    id: number,
    username: string,
    from: number,
    tgLogin: string,
}) => {
    useEffect(() => {
        const addUser = async () => {
            const res = await putUser(id, username, from);

            return res
        }

        addUser();
    }, [from, id, username]);
    return (
        <DummyContainer>
            <DummyContentContainer sx={{ position: 'absolute', top: '-50px', height: '180px', zIndex: 0, width: '80%' }}>
            </DummyContentContainer>
            <Box sx={{ zIndex: 1, textAlign: 'center' }}>
                <DummyHeader>
                    Zayna’s <br/>
                    invest fund
                </DummyHeader>
                <DummySubHeader>
                    will be launched soon
                </DummySubHeader>
            </Box>
            <DummyContentContainer>
                <DummyInviteText>
                    Invite friends
                </DummyInviteText>
                <DummyInviteButtonContainer>
                    <DummyInviteButtonText>
                        Invite friends
                    </DummyInviteButtonText>
                    <DummyInviteButton>
                        <ContentCopyIcon onClick={() => copyTextToClipboard(`https://t.me/${tgLogin}?start=${from}`)} />
                    </DummyInviteButton>
                </DummyInviteButtonContainer>
                <DummySocialContainer>
                    <DummySocial>
                        <Image alt="YouTube" src={yt} width={36} height={36} />
                    </DummySocial>
                    <DummySocial>
                        <Image alt="Instagrm" src={insta} width={36} height={36} />
                    </DummySocial>
                    <DummySocial>
                        <Image alt="Telegram" src={tg} width={36} height={36} />
                    </DummySocial>
                    <DummySocial>
                        <Image alt="X" src={x} width={36} height={36} />
                    </DummySocial>
                    <DummySocial>
                        <Image alt="TikTok" src={tiktok} width={36} height={36} />
                    </DummySocial>
                </DummySocialContainer>
            </DummyContentContainer>
        </DummyContainer>
    )
}