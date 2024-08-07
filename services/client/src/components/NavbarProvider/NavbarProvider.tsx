'use client'

import React from 'react';
import { NavbarProviderContainer, NavbarProviderChildrenContainer } from './NavbarProvider.css';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Restore, Favorite, LocationOn } from '@mui/icons-material';

import { useRouter, usePathname } from 'next/navigation'

const links = [
    {
        path: '/',
        label: 'Home',
        icon: <Restore />
    },
    {
        path: '/path1',
        label: 'Path1',
        icon: <Favorite />
    },
    {
        path: '/path2',
        label: 'Path2',
        icon: <LocationOn />
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
            {/* <BottomNavigation
                showLabels
                    onChange={(_, newValue) => {
                        router.push(links[newValue].path);
                    }}
                >
                {links.map((link, index) => (
                    <BottomNavigationAction key={index} label={link.label} icon={React.cloneElement(link.icon, {
                        color: pathname === link.path ? 'error' : 'disabled'
                    })} />
                ))}
            </BottomNavigation> */}
        </NavbarProviderContainer>
    )
}