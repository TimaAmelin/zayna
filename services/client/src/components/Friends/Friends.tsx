'use client';
import { Box, Fade, Popper } from '@mui/material';
import {
  ContentCopyIcon,
  FriendsCard,
  FriendsCardText,
  FriendsCardTextContainer,
  FriendsContainer,
  FriendsFriendCard,
  FriendsInviteButton,
  FriendsInviteButtonContainer,
  FriendsInviteButtonText,
  FriendsSecondaryTextContainer,
  FriendsSubTitleContainer,
  FriendsTitleContainer,
} from './Friends.css';

import CoinMin from '../../assets/icons/coin_min.svg';
import Arrow from '../../assets/icons/arrow.svg';
import InviteIcon from '../../assets/icons/invite.png';
import Gift from '../../assets/icons/gift.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFriends } from '@/api/handlers/getFriends';
import { AccountCircle, Check } from '@mui/icons-material';

function copyTextToClipboard(text: string): void {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Текст скопирован в буфер обмена');
      })
      .catch((err) => {
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

export const Friends = ({ tgLogin }: { tgLogin: string }) => {
  const [friends, setFriends] = useState<
    { username: string; id: number; photo: string }[]
  >([]);

  useEffect(() => {
    const getUserFriends = async () => {
      const res = await getFriends(
        window.Telegram.WebApp.initDataUnsafe.user.id
      );
      return res;
    };

    getUserFriends().then((data) => {
      setFriends(data.response.friends);
    });
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [friendsInviteButtonTextColor, setFriendsInviteButtonTextColor] =
    useState('#7ADA46');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const popperId = open ? 'simple-popper' : undefined;

  const router = useRouter();
  return (
    <FriendsContainer>
      <FriendsTitleContainer>Приглашайте своих друзей!</FriendsTitleContainer>
      <FriendsSubTitleContainer>
        Вы и Ваши друзья получите бонусы!
      </FriendsSubTitleContainer>
      <FriendsCard>
        <Box
          sx={{
            margin: '10px',
            width: 66,
            height: 59,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src={InviteIcon} alt="" height={66} />
        </Box>
        <FriendsCardTextContainer
          onClick={() =>
            window.Telegram.WebApp.openTelegramLink(
              `https://t.me/share/url?url=${encodeURIComponent(
                'https://t.me/zayna_eco_bot'
              )}&text=Play with me, invest in real projects and earn money.\n💵+5k coins as the first gift`
            )
          }
        >
          <FriendsCardText sx={{ fontSize: 14, fontWeight: 600 }}>
            Пригласить друга
          </FriendsCardText>
          <FriendsCardText sx={{ fontSize: 12, fontWeight: 400 }}>
            <CoinMin style={{ marginRight: 5 }} />
            +5,000 для Вас и Вашего друга
          </FriendsCardText>
        </FriendsCardTextContainer>
      </FriendsCard>
      <FriendsCard onClick={() => router.push(`/projects-friends`)}>
        <Box
          sx={{
            margin: '10px',
            width: 59,
            height: 59,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src={Gift} alt="" height={59} />
        </Box>
        <FriendsCardTextContainer>
          <FriendsCardText sx={{ fontSize: 14, fontWeight: 600 }}>
            Подарок для друга
          </FriendsCardText>
          <FriendsCardText sx={{ fontSize: 12, fontWeight: 400 }}>
            <CoinMin style={{ marginRight: 5 }} />
            +5,000 для Вас и Вашего друга
          </FriendsCardText>
        </FriendsCardTextContainer>
        <Box
          sx={{
            margin: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Arrow />
        </Box>
      </FriendsCard>
      <FriendsSecondaryTextContainer>
        Список друзей
      </FriendsSecondaryTextContainer>
      {!friends.length && (
        <FriendsFriendCard>Вы еще никого не пригласили</FriendsFriendCard>
      )}
      {friends.map((friend) => (
        <FriendsFriendCard key={1}>
          {friend.photo ? (
            <Box
              sx={{
                marginRight: 2,
                height: 20,
                width: 20,
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <Image src={friend.photo} alt="" height={20} width={20} />
            </Box>
          ) : (
            <AccountCircle sx={{ marginRight: 2 }} />
          )}
          {friend.username}
        </FriendsFriendCard>
      ))}
      <FriendsInviteButtonContainer
        onClick={(e) => {
          handleClick(e);
          setFriendsInviteButtonTextColor('#fff');
          copyTextToClipboard(
            `https://t.me/${tgLogin}?start=${window.Telegram.WebApp.initDataUnsafe.user.id}`
          );
          setTimeout(() => {
            setAnchorEl(null);
          }, 1000);
          setTimeout(() => {
            setFriendsInviteButtonTextColor('#7ADA46');
          }, 200);
        }}
      >
        <FriendsInviteButtonText
          sx={{
            backgroundColor: friendsInviteButtonTextColor,
            '&:hover': {
              backgroundColor: friendsInviteButtonTextColor,
            },
          }}
        >
          Пригласить друзей
        </FriendsInviteButtonText>
        <FriendsInviteButton
          sx={{
            backgroundColor: friendsInviteButtonTextColor,
            '&:hover': {
              backgroundColor: friendsInviteButtonTextColor,
            },
          }}
        >
          <ContentCopyIcon />
        </FriendsInviteButton>
        <Popper
          id={popperId}
          open={open}
          anchorEl={anchorEl}
          transition
          placement="top"
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <Box
                sx={{
                  border: 1,
                  height: 32,
                  width: 114,
                  borderRadius: '3px',
                  margin: '0 auto',
                  backgroundColor: '#EDF7ED',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#1D4620',
                }}
              >
                <Check sx={{ marginRight: 1.5, color: '#1D4620' }} />
                Ссылка скопирована!
              </Box>
            </Fade>
          )}
        </Popper>
      </FriendsInviteButtonContainer>
    </FriendsContainer>
  );
};
