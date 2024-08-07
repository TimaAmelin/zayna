import { Box, styled } from '@mui/material';

import backgroundImage from '../../assets/background.jpeg';

export const DummyContainer = styled(Box)(() => ({
    backgroundImage: `url(${backgroundImage.src})`,
    height: '100%',
    flex: 1,
    backgroundSize: '200%',
    backgroundPosition: 'center 60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
}));

export const DummyContentContainer = styled(Box)(() => ({
    boxShadow: '0px 0px 15px 20px rgba(0,0,0,0.7)',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const DummyHeader = styled(Box)(() => ({
    color: '#7ADA46',
    fontWeight: 800,
    fontSize: 50,
    margin: 10,
}));

export const DummySubHeader = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 600,
    fontSize: 22,
    marginBottom: 25,
}));

export const DummyText = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 400,
    fontSize: 14,
}));

export const DummySocialContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 40,
}));

export const DummySocial = styled(Box)(() => ({
    width: 36,
    height: 36,
    margin: 7.5,
}));