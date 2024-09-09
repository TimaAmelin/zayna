'use client';
import { useEffect, useState } from 'react';
import { ProjectsContainer, ProjectsMainContainer, ProjectsMainContainerCard, ProjectsMainContainerCardBottom, ProjectsMainContainerCardBottomCost, ProjectsMainContainerCardBottomLvl, ProjectsMainContainerCardDescription, ProjectsMainContainerCardProfit, ProjectsMainContainerCardRow, ProjectsMainContainerCardTitle, ProjectsMainContainerMoney, ProjectsMainContainerTypeButton, ProjectsMainContainerTypeRow } from './Projects.css';
import { getProjects } from '@/api/handlers/getProjects';
import { getTokens } from '@/api/handlers/getTokens';

import { ProjectsStatisticsContainer, ProjectsStatistics, ProjectsStatisticsCoinContainer, ProjectsStatisticsProfitContainer, ProjectsStatisticsProfitTitleContainer, ProjectsStatisticsProfitAmountContainer, ProjectsStatisticsLeft, ProjectsStatisticsRight, ProjectsStatisticsAvatar, ProjectsStatisticsSettingsContainer, ProjectsStatisticsSettingsLine, ProjectsStatisticsName } from './Projects.css';

import CoinMin from '../../assets/icons/coin_min.svg';
import CoinIcon from '../../assets/icons/coin_big.png';
import IIcon from '../../assets/icons/i.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import CoinMax from '../../assets/icons/coin_max.svg';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box } from '@mui/material';
import { ProjectModal } from '../ProjectModal/ProjectModal';

export const Projects = ({ id, username }: {
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

    const [money, setMoney] = useState(0);
    const [moneyPerHour, setMoneyPerHour] = useState(0);

    const [type, setType] = useState('Forests');

    const [open, setOpen] = useState(false);
    const [project, setProject] = useState(projects[0]);

    const router = useRouter();
    
    useEffect(() => {
        const getUserProjects = async () => {
            const res = await getProjects();
            return res
        }

        getUserProjects().then(data => {
            setProjects(data.response.projects);
        })
    }, []);

    useEffect(() => {
        const getUserTokens = async () => {
            const res = await getTokens(Number(id));
            return res
        }

        getUserTokens().then(data => {
            setMoney(data.response.sum);
            setMoneyPerHour(data.response.per_hour ?? 0);
        })
    }, [id]);

    return (
        <ProjectsContainer>
            <ProjectsStatisticsContainer>
                <ProjectsStatistics>
                    <ProjectsStatisticsLeft>
                        <ProjectsStatisticsCoinContainer>
                            <CoinMin />
                        </ProjectsStatisticsCoinContainer>
                        <ProjectsStatisticsProfitContainer>
                            <ProjectsStatisticsProfitTitleContainer>
                                Profit per hour
                            </ProjectsStatisticsProfitTitleContainer>
                            <ProjectsStatisticsProfitAmountContainer>
                                +{moneyPerHour} <IIcon />
                            </ProjectsStatisticsProfitAmountContainer>
                        </ProjectsStatisticsProfitContainer>
                    </ProjectsStatisticsLeft>
                    <ProjectsStatisticsRight>
                        <ProjectsStatisticsAvatar />
                        <ProjectsStatisticsName>
                            {username}
                        </ProjectsStatisticsName>
                        <ProjectsStatisticsSettingsLine />
                        <ProjectsStatisticsSettingsContainer
                            onClick={() => router.push(`/settings?id=${id}&username=${username}`)}>
                            <SettingsIcon />
                        </ProjectsStatisticsSettingsContainer>
                    </ProjectsStatisticsRight>
                </ProjectsStatistics>
            </ProjectsStatisticsContainer>
            <ProjectsMainContainer>
                <ProjectsMainContainerMoney>
                    <CoinMax style={{marginRight: 10}} /> {money.toLocaleString('ru-RU')}
                </ProjectsMainContainerMoney>
                <ProjectsMainContainerTypeRow>
                    <ProjectsMainContainerTypeButton
                        sx={{backgroundColor: type === 'Forests' ? '#306A11' : 'none'}}
                        onClick={() => setType('Forests')}>
                        Forests
                    </ProjectsMainContainerTypeButton>
                    <ProjectsMainContainerTypeButton
                        sx={{backgroundColor: type === 'Transport' ? '#306A11' : 'none'}}
                        onClick={() => setType('Transport')}>
                        Transport
                    </ProjectsMainContainerTypeButton>
                    <ProjectsMainContainerTypeButton
                        sx={{backgroundColor: type === 'Energy' ? '#306A11' : 'none'}}
                        onClick={() => setType('Energy')}>
                        Energy
                    </ProjectsMainContainerTypeButton>
                    <ProjectsMainContainerTypeButton
                        sx={{backgroundColor: type === 'Wastes' ? '#306A11' : 'none'}}
                        onClick={() => setType('Wastes')}>
                        Wastes
                    </ProjectsMainContainerTypeButton>
                </ProjectsMainContainerTypeRow>
                <ProjectsMainContainerCardRow>
                    {projects.filter(project => project.mode === type).map((project, index) => (
                        <ProjectsMainContainerCard key={index} onClick={() => {
                            setProject(project);
                            setOpen(true);
                        }}>
                            <Image src={project.logo} alt="" height={38} width={38} />
                            <ProjectsMainContainerCardTitle>
                                {project.name}
                            </ProjectsMainContainerCardTitle>
                            <ProjectsMainContainerCardDescription>
                                {project.description}
                            </ProjectsMainContainerCardDescription>
                            <ProjectsMainContainerCardProfit>
                                Profit per hour<br />
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Image src={CoinIcon} alt="" height={12} style={{marginRight: 3}} /> + {project.income}
                                </Box>
                            </ProjectsMainContainerCardProfit>
                            <ProjectsMainContainerCardBottom>
                                <ProjectsMainContainerCardBottomLvl>
                                    lvl {project.level}
                                </ProjectsMainContainerCardBottomLvl>
                                <ProjectsMainContainerCardBottomCost>
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Image src={CoinIcon} alt="" height={15} style={{marginRight: 3}} /> {project.price}
                                    </Box>
                                </ProjectsMainContainerCardBottomCost>
                            </ProjectsMainContainerCardBottom>
                        </ProjectsMainContainerCard>
                    ))}
                </ProjectsMainContainerCardRow>
            </ProjectsMainContainer>
            <ProjectModal id={id} project={project} open={open} toggleDrawer={setOpen} currentMoney={money} setCurrentMoney={setMoney} />
        </ProjectsContainer>
    )
}