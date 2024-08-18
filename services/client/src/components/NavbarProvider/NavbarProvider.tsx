'use client';

import React from 'react';
import { NavbarProviderContainer, NavbarProviderChildrenContainer, NavbarContainer, Navbar } from './NavbarProvider.css';
import { BottomNavigationAction } from '@mui/material';

import { useRouter, usePathname } from 'next/navigation';

import ExchangeIcon from '../../assets/icons/exchange_icon.svg';
import FriendsIcon from '../../assets/icons/friends_icon.svg';
import ProjectsIcon from '../../assets/icons/projects_icon.svg';
import TasksIcon from '../../assets/icons/tasks_icon.svg';

const links = [
    {
        path: '/tapper',
        label: 'Exchange',
        icon: <ExchangeIcon />,
    },
    {
        path: '/project',
        label: 'Project',
        icon: <FriendsIcon />,
    },
    {
        path: '/friends',
        label: 'Friends',
        icon: <ProjectsIcon />,
    },
    {
        path: '/tasks',
        label: 'Tasks',
        icon: <TasksIcon />,
    },
];

export const NavbarProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <NavbarProviderContainer>
            <NavbarProviderChildrenContainer>
                {children}
            </NavbarProviderChildrenContainer>
            {pathname !== '/' && (
                <NavbarContainer>
                    <Navbar
                        showLabels
                            onChange={(_, newValue) => {
                                router.push(links[newValue].path);
                            }}
                        >
                        {links.map((link, index) => (
                            <BottomNavigationAction
                                sx={{
                                    backgroundColor: '#2E3342',
                                    color: pathname === link.path ? '#7ADA46' : '#999',
                                    borderRadius: index === 0 ? '5px 0 0 5px' : index === links.length - 1 ? '0 5px 5px 0' : 0,
                                    height: 65,
                                }}
                                key={index} label={link.label}
                                icon={React.cloneElement(link.icon, {
                                    style: {filter: pathname === link.path ? 'sepia(0.5) hue-rotate(50deg) saturate(4) brightness(1) contrast(2)' : 'none'}
                                })} />
                        ))}
                    </Navbar>
                </NavbarContainer>)}
        </NavbarProviderContainer>
    )
}