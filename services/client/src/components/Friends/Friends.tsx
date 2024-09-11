'use client'
import { Box } from '@mui/material';
import { ContentCopyIcon, FriendsCard, FriendsCardText, FriendsCardTextContainer, FriendsContainer, FriendsFriendCard, FriendsInviteButton, FriendsInviteButtonContainer, FriendsInviteButtonText, FriendsSecondaryTextContainer, FriendsSubTitleContainer, FriendsTitleContainer } from './Friends.css';

import CoinMin from '../../assets/icons/coin_min.svg';
import Arrow from '../../assets/icons/arrow.svg';
import InviteIcon from '../../assets/icons/invite.png';
import Gift from '../../assets/icons/gift.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFriends } from '@/api/handlers/getFriends';
import { AccountCircle } from '@mui/icons-material';

function copyTextToClipboard(text: string): void {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Текст скопирован в буфер обмена');
        }).catch(err => {
            console.error('Ошибка при копировании текста: ', err);
        });
    } else {
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

export const Friends = ({ id, username, tgLogin }: {
    id: number,
    username?: string,
    tgLogin: string,
}) => {
    const [friends, setFriends] = useState<{username: string, id: number}[]>([]);

    useEffect(() => {
        const getUserFriends = async () => {
            const res = await getFriends(id);
            return res
        }

        getUserFriends().then(data => {
            setFriends(data.response.friends);
        })
    }, []);

    const router = useRouter();
    return (
        <FriendsContainer>
            <FriendsTitleContainer>
                Invite your friends!
            </FriendsTitleContainer>
            <FriendsSubTitleContainer>
                You and your mate will get bonuses
            </FriendsSubTitleContainer>
            <FriendsCard>
                <Box sx={{margin: '10px', width: 66, height: 59, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Image src={InviteIcon} alt="" height={66} />
                </Box>
                <FriendsCardTextContainer onClick={() => window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent('https://t.me/zayna_eco_bot')}&text=Play with me, invest in real projects and earn money.\n💵+5k coins as the first gift`)}>
                    <FriendsCardText sx={{fontSize: 14, fontWeight: 600}}>Invite a friend</FriendsCardText>
                    <FriendsCardText sx={{fontSize: 12, fontWeight: 400}}><CoinMin style={{marginRight: 5}} />+5,000 for you and your friend</FriendsCardText>
                </FriendsCardTextContainer>
            </FriendsCard>
            <FriendsCard onClick={() => router.push(`/projects-friends?id=${id}&username=${username}`)}>
                <Box sx={{margin: '10px', width: 59, height: 59, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Image src={Gift} alt="" height={59} />
                </Box>
                <FriendsCardTextContainer>
                    <FriendsCardText sx={{fontSize: 14, fontWeight: 600}}>Gift for a friend</FriendsCardText>
                    <FriendsCardText sx={{fontSize: 12, fontWeight: 400}}><CoinMin style={{marginRight: 5}} />+5,000 for you and your friend</FriendsCardText>
                </FriendsCardTextContainer>
                <Box sx={{margin: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Arrow />
                </Box>
            </FriendsCard>
            <FriendsSecondaryTextContainer>
                A list of your friends
            </FriendsSecondaryTextContainer>
            {!friends.length && (
                <FriendsFriendCard>
                    You haven&rsquo;t invited anyone yet
                </FriendsFriendCard>
            )}
            {friends.map(friend => (
                <FriendsFriendCard key={1}>
                    <AccountCircle sx={{marginRight: 2}} />{friend.username}
                </FriendsFriendCard>
            ))}
            <FriendsInviteButtonContainer>
                <FriendsInviteButtonText>
                    Invite friends
                </FriendsInviteButtonText>
                <FriendsInviteButton>
                    <ContentCopyIcon onClick={() => copyTextToClipboard(`https://t.me/${tgLogin}?start=${id}`)} />
                </FriendsInviteButton>
            </FriendsInviteButtonContainer>
        </FriendsContainer>
    )
}