'use client';
import { useEffect, useState } from 'react';
import { ProjectsFriendsButton, ProjectsFriendsClose, ProjectsFriendsContainer, ProjectsFriendsMainContainer, ProjectsFriendsMainContainerCardBottomLvl, ProjectsFriendsMainContainerCardLeft, ProjectsFriendsMainContainerCardRight, ProjectsFriendsTitleContainer } from './ProjectsFriends.css';
import { useRouter } from 'next/navigation';
import { getProjects } from '@/api/handlers/getProjects';
import { ProjectsFriendsMainContainerCard, ProjectsFriendsMainContainerCardBottomCost, ProjectsFriendsMainContainerCardDescription, ProjectsFriendsMainContainerCardRow, ProjectsFriendsMainContainerCardTitle, ProjectsFriendsMainContainerTypeButton, ProjectsFriendsMainContainerTypeRow } from '../ProjectsFriends/ProjectsFriends.css';
import Image from 'next/image';
import { Box, IconButton, MenuItem, Select } from '@mui/material';
import CoinIcon from '../../assets/icons/coin_big.png';
import { Add, Check, Close } from '@mui/icons-material';
import { getFriends } from '@/api/handlers/getFriends';
import { sendGift } from '@/api/handlers/sendGift';

export const ProjectsFriends = ({ id, username }: {
    id: number,
    username?: string,
}) => {
    const [projects, setProjects] = useState<{
        id: number,
        name: string;
        price: number;
        income: number;
        description: string;
        mode: string;
        level: number;
        logo: string;
    }[]>([]);

    const [chosenProjects, setChosenProjects] = useState<number[]>([]);
    const [chosenFriend, setChosenFriend] = useState<string>('');

    const [type, setType] = useState('Forests');

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

    useEffect(() => {
        const getUserProjects = async () => {
            const res = await getProjects();
            return res
        }

        getUserProjects().then(data => {
            setProjects(data.response.projects);
        })
    }, []);

    const router = useRouter();
    
    useEffect(() => {
        const getUserProjects = async () => {
            const res = await getProjects();
            return res
        }

        getUserProjects().then(data => {

        })
    }, []);

    return (
        <ProjectsFriendsContainer>
            <ProjectsFriendsMainContainer>
                <ProjectsFriendsTitleContainer>
                    Gift for a friend
                </ProjectsFriendsTitleContainer>
                <ProjectsFriendsMainContainerTypeRow>
                    <ProjectsFriendsMainContainerTypeButton
                        sx={{backgroundColor: type === 'Forests' ? '#306A11' : 'none'}}
                        onClick={() => setType('Forests')}>
                        Forests
                    </ProjectsFriendsMainContainerTypeButton>
                    <ProjectsFriendsMainContainerTypeButton
                        sx={{backgroundColor: type === 'Transport' ? '#306A11' : 'none'}}
                        onClick={() => setType('Transport')}>
                        Transport
                    </ProjectsFriendsMainContainerTypeButton>
                    <ProjectsFriendsMainContainerTypeButton
                        sx={{backgroundColor: type === 'Energy' ? '#306A11' : 'none'}}
                        onClick={() => setType('Energy')}>
                        Energy
                    </ProjectsFriendsMainContainerTypeButton>
                    <ProjectsFriendsMainContainerTypeButton
                        sx={{backgroundColor: type === 'Wastes' ? '#306A11' : 'none'}}
                        onClick={() => setType('Wastes')}>
                        Wastes
                    </ProjectsFriendsMainContainerTypeButton>
                </ProjectsFriendsMainContainerTypeRow>
                <ProjectsFriendsMainContainerCardRow>
                    {projects.filter(project => project.mode === type).map((project, index) => (
                        <ProjectsFriendsMainContainerCard key={index} onClick={() => {
                        }}>
                            <Box sx={{display: 'flex'}}>
                                <Box sx={{height: 88, width: 60, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                                            lvl {project.level}
                                        </ProjectsFriendsMainContainerCardBottomLvl>
                                    </Box>
                                </ProjectsFriendsMainContainerCardLeft>
                            </Box>
                            <ProjectsFriendsMainContainerCardRight>
                                <ProjectsFriendsMainContainerCardBottomCost>
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Image src={CoinIcon} alt="" height={15} style={{marginRight: 3}} /> {project.price}
                                    </Box>
                                </ProjectsFriendsMainContainerCardBottomCost>
                                {chosenProjects.includes(project.id) ? (
                                    <IconButton
                                        sx={{backgroundColor: '#85B960', height: 20, width: 20, padding: 0, '&:hover': {backgroundColor: '#85B960'}}}
                                        onClick={() => {
                                            setChosenProjects(chosenProjects.filter(id => id !== project.id))
                                        }}>
                                        <Check sx={{color: '#fff'}} />
                                    </IconButton>
                                ): (
                                    <IconButton sx={{backgroundColor: '#000', height: 20, width: 20, padding: 0, '&:hover': {backgroundColor: '#000'}}}
                                        onClick={() => {
                                            setChosenProjects([...chosenProjects, project.id])
                                        }}>
                                        <Add sx={{color: '#fff'}} />
                                    </IconButton>
                                )}
                            </ProjectsFriendsMainContainerCardRight>
                        </ProjectsFriendsMainContainerCard>
                    ))}
                </ProjectsFriendsMainContainerCardRow>
                <Select
                    sx={{width: '90%', color: chosenFriend === 'link' ? '#7ADA46' : '#fff'}}
                    value={chosenFriend}
                    onChange={e => setChosenFriend(e.target.value)}>
                    <MenuItem value="link" sx={{color: '#306A11'}}>Send a link to the gift in Telegram</MenuItem>
                    {friends.map(friend =>(
                        <MenuItem key={friend.id} value={friend.id}>{friend.username}</MenuItem>
                    ))}
                </Select>
                <ProjectsFriendsButton onClick={async () => {
                    if (chosenFriend === 'link') {
                        const data = await sendGift(id, chosenProjects[0]);
                        window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(data.response.link)}&text=Play with me, invest in real projects and earn money.\n💵+5k coins as the first gift`);
                    } else if (chosenFriend !== '') {
                        await sendGift(id, chosenProjects[0], Number(chosenFriend));
                        router.push(`/friends?id=${id}&username=${username}`)
                    }
                }}>
                    Send the gift
                </ProjectsFriendsButton>
            </ProjectsFriendsMainContainer>
            <ProjectsFriendsClose>
                <IconButton onClick={() => router.push(`/friends?id=${id}&username=${username}`)}>
                    <Close sx={{color: '#fff'}} />
                </IconButton>
            </ProjectsFriendsClose>
        </ProjectsFriendsContainer>
    )
}