'use client';

import React from 'react';
import { ProjectModalButton, ProjectModalContainer, ProjectModalMainText, ProjectModalProfitText, ProjectModalSecondaryText, ProjectModalSecondaryTextContainer, ProjectsModalMainContainerMoney } from './ProjectModal.css';
import { Drawer } from '@mui/material';

import CoinIcon from '../../assets/icons/coin_big.png';
import CoinMax from '../../assets/icons/coin_max.svg';

import Image from 'next/image';
import { buyProject } from '@/api/handlers/buyProject';

export const ProjectModal = (
    { 
        id,
        project,
        toggleDrawer,
        open,
        currentMoney,
        setCurrentMoney,
        updateProjects,
    }: {
        id: number;
        project?: {
            id: number,
            name: string;
            price: number;
            income: number;
            description: string;
            mode: string;
            level: number;
            logo: string;
        };
        toggleDrawer: any;
        open: boolean;
        currentMoney: number;
        setCurrentMoney: (x: number) => void;
        updateProjects: () => Promise<void>
    },
) => {
    return (
        <Drawer
            open={open} 
            onClose={() => toggleDrawer(false)}
            anchor="bottom"
            sx={{
                '& .MuiDrawer-paper': {
                    background: 'none',
                    overflow: 'visible'
                }
            }}>
            <ProjectModalContainer>
                <ProjectModalMainText>
                    {project?.name}
                </ProjectModalMainText>
                <ProjectModalSecondaryText>
                    {project?.description}
                </ProjectModalSecondaryText>
                <ProjectModalProfitText>
                    Profit per hour<br />
                    <Image src={CoinIcon} alt="" height={12} style={{marginRight: 3}} /> + {project?.income}
                </ProjectModalProfitText>
                <ProjectsModalMainContainerMoney>
                    <CoinMax style={{marginRight: 10}} /> {currentMoney.toLocaleString('ru-RU')}
                </ProjectsModalMainContainerMoney>
                <ProjectModalButton onClick={async () => {
                    if (currentMoney - (project?.price ?? 0) < 0) {
                        alert(`You don't have enough money`);
                        return
                    }
                    await buyProject(id, project?.id ?? 0);
                    await updateProjects();
                    setCurrentMoney(currentMoney - (project?.price ?? 0));
                    toggleDrawer(false);
                }}>
                    Buy
                </ProjectModalButton>
            </ProjectModalContainer>
        </Drawer>
    )
}