import { Box, styled } from '@mui/material';

export const NavbarProviderContainer = styled(Box)(() => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
}));

export const NavbarProviderChildrenContainer = styled(Box)(() => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
