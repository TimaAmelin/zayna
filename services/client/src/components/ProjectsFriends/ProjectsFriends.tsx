'use client';
import { useEffect, useState } from 'react';
import {
  ProjectsFriendsButton,
  ProjectsFriendsClose,
  ProjectsFriendsContainer,
  ProjectsFriendsMainContainer,
  ProjectsFriendsMainContainerCardBottomLvl,
  ProjectsFriendsMainContainerCardLeft,
  ProjectsFriendsMainContainerCardRight,
  ProjectsFriendsTitleContainer,
} from './ProjectsFriends.css';
import { useRouter } from 'next/navigation';
import { getProjects } from '@/api/handlers/getProjects';
import {
  ProjectsFriendsMainContainerCard,
  ProjectsFriendsMainContainerCardBottomCost,
  ProjectsFriendsMainContainerCardDescription,
  ProjectsFriendsMainContainerCardRow,
  ProjectsFriendsMainContainerCardTitle,
  ProjectsFriendsMainContainerTypeButton,
  ProjectsFriendsMainContainerTypeRow,
} from '../ProjectsFriends/ProjectsFriends.css';
import Image from 'next/image';
import { Box, IconButton, MenuItem, Select } from '@mui/material';
import CoinIcon from '../../assets/icons/coin_big.png';
import { Add, Check, Close } from '@mui/icons-material';
import { getFriends } from '@/api/handlers/getFriends';
import { sendGift } from '@/api/handlers/sendGift';
import { getPresents } from '@/api/handlers/getPresents';

export const ProjectsFriends = () => {
  const [projects, setProjects] = useState<
    {
      id: number;
      name: string;
      price: number;
      income: number;
      description: string;
      mode: string;
      level: number;
      logo: string;
    }[]
  >([]);

  const [chosenProjects, setChosenProjects] = useState<number[]>([]);
  const [chosenFriend, setChosenFriend] = useState<string>('');

  const [type, setType] = useState('Forests');

  const [friends, setFriends] = useState<{ username: string; id: number }[]>(
    []
  );

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

  useEffect(() => {
    const getUserProjects = async () => {
      const res = await getPresents();
      return res;
    };

    getUserProjects().then((data) => {
      setProjects(data.response.projects);
    });
  }, []);

  const router = useRouter();

  return (
    <ProjectsFriendsContainer>
      <ProjectsFriendsMainContainer>
        <ProjectsFriendsTitleContainer>
          Подарок для друга
        </ProjectsFriendsTitleContainer>
        <ProjectsFriendsMainContainerTypeRow>
          <ProjectsFriendsMainContainerTypeButton
            sx={{ backgroundColor: type === 'Рынок' ? '#306A11' : 'none' }}
            onClick={() => setType('Рынок')}
          >
            Рынок
          </ProjectsFriendsMainContainerTypeButton>
          <ProjectsFriendsMainContainerTypeButton
            sx={{ backgroundColor: type === 'Недвижимость' ? '#306A11' : 'none' }}
            onClick={() => setType('Недвижимость')}
          >
            Недвижимость
          </ProjectsFriendsMainContainerTypeButton>
          <ProjectsFriendsMainContainerTypeButton
            sx={{ backgroundColor: type === 'Энергия' ? '#306A11' : 'none' }}
            onClick={() => setType('Энергия')}
          >
            Энергия
          </ProjectsFriendsMainContainerTypeButton>
          <ProjectsFriendsMainContainerTypeButton
            sx={{ backgroundColor: type === 'Затраты' ? '#306A11' : 'none' }}
            onClick={() => setType('Затраты')}
          >
            Затраты
          </ProjectsFriendsMainContainerTypeButton>
        </ProjectsFriendsMainContainerTypeRow>
        <ProjectsFriendsMainContainerCardRow>
          {projects &&
            projects
              .filter((project) => project.mode === type)
              .map((project, index) => (
                <ProjectsFriendsMainContainerCard
                  key={index}
                  onClick={() => {}}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Box
                      sx={{
                        height: 88,
                        width: 60,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image src={project.logo} alt="" height={60} width={60} />
                    </Box>
                    <ProjectsFriendsMainContainerCardLeft>
                      <ProjectsFriendsMainContainerCardTitle>
                        {project.name}
                      </ProjectsFriendsMainContainerCardTitle>
                      <Box>
                        <ProjectsFriendsMainContainerCardDescription>
                          {project.description}
                        </ProjectsFriendsMainContainerCardDescription>
                        <ProjectsFriendsMainContainerCardBottomLvl>
                          уровень {project.level}
                        </ProjectsFriendsMainContainerCardBottomLvl>
                      </Box>
                    </ProjectsFriendsMainContainerCardLeft>
                  </Box>
                  <ProjectsFriendsMainContainerCardRight>
                    <ProjectsFriendsMainContainerCardBottomCost>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                          src={CoinIcon}
                          alt=""
                          height={15}
                          style={{ marginRight: 3 }}
                        />{' '}
                        {project.price}
                      </Box>
                    </ProjectsFriendsMainContainerCardBottomCost>
                    {chosenProjects.includes(project.id) ? (
                      <IconButton
                        sx={{
                          backgroundColor: '#85B960',
                          height: 20,
                          width: 20,
                          padding: 0,
                          '&:hover': { backgroundColor: '#85B960' },
                        }}
                        onClick={() => {
                          setChosenProjects(
                            chosenProjects.filter((id) => id !== project.id)
                          );
                        }}
                      >
                        <Check sx={{ color: '#fff' }} />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{
                          backgroundColor: '#000',
                          height: 20,
                          width: 20,
                          padding: 0,
                          '&:hover': { backgroundColor: '#000' },
                        }}
                        onClick={() => {
                          setChosenProjects([...chosenProjects, project.id]);
                        }}
                      >
                        <Add sx={{ color: '#fff' }} />
                      </IconButton>
                    )}
                  </ProjectsFriendsMainContainerCardRight>
                </ProjectsFriendsMainContainerCard>
              ))}
          {!projects && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                marginTop: 2,
              }}
            >
              Подарков пока нет
            </Box>
          )}
        </ProjectsFriendsMainContainerCardRow>
        <Select
          sx={{
            width: '90%',
            color: chosenFriend === 'link' ? '#7ADA46' : '#fff',
          }}
          value={chosenFriend}
          onChange={(e) => setChosenFriend(e.target.value)}
        >
          <MenuItem value="link" sx={{ color: '#306A11' }}>
            Отправьте ссылку на подарок в Telegram
          </MenuItem>
          {friends.map((friend) => (
            <MenuItem key={friend.id} value={friend.id}>
              {friend.username}
            </MenuItem>
          ))}
        </Select>
        <ProjectsFriendsButton
          onClick={async () => {
            if (chosenFriend === 'link') {
              const data = await sendGift(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                chosenProjects[0]
              );
              window.Telegram.WebApp.openTelegramLink(
                `https://t.me/share/url?url=${encodeURIComponent(
                  data.response.link
                )}&text=Играйте со мной, инвестируйте в реальные проекты и зарабатывайте деньги.\n💵+5k монет в качестве приветственного подарка`
              );
            } else if (chosenFriend !== '') {
              await sendGift(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                chosenProjects[0],
                Number(chosenFriend)
              );
              router.push(`/friends`);
            }
          }}
        >
          Отправить подарок
        </ProjectsFriendsButton>
      </ProjectsFriendsMainContainer>
      <ProjectsFriendsClose>
        <IconButton onClick={() => router.push(`/friends`)}>
          <Close sx={{ color: '#fff' }} />
        </IconButton>
      </ProjectsFriendsClose>
    </ProjectsFriendsContainer>
  );
};
