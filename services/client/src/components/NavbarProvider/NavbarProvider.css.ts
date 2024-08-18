import { BottomNavigation, Box, styled } from '@mui/material';

export const NavbarProviderContainer = styled(Box)(() => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#1F1F2E',
}));

export const NavbarProviderChildrenContainer = styled(Box)(() => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
}));

export const NavbarContainer = styled(Box)(() => ({
    margin: 15,
    marginBottom: 25,
    zIndex: 10,
    height: 65,
}));

export const Navbar = styled(BottomNavigation)(() => ({
    backgroundColor: '#2E3342',
    borderRadius: 5,
    height: 65,
}))
