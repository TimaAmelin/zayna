import { Box, Button, styled } from '@mui/material';

import backgroundImage from '../../assets/background.jpeg';
import { ContentCopy } from '@mui/icons-material';

export const DummyContainer = styled(Box)(() => ({
    backgroundImage: `url(${backgroundImage.src})`,
    height: '100%',
    flex: 1,
    backgroundSize: '200%',
    backgroundPosition: 'center 30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const DummyContentContainer = styled(Box)(() => ({
    boxShadow: '0px 0px 15px 20px rgba(0,0,0,0.7)',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
}));

export const DummyHeader = styled(Box)(() => ({
    color: '#7ADA46',
    fontWeight: 800,
    fontSize: 50,
    margin: 10,
    textAlign: 'center',
    zIndex: 1,
    lineHeight: 1,
    marginBottom: 0,
}));

export const DummySubHeader = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 600,
    fontSize: 22,
    marginBottom: 25,
}));

export const DummyInviteText = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 800,
    fontSize: 50,
    marginBottom: 20,
}));

export const DummyInviteButtonContainer = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
}));

export const DummyInviteButtonText = styled(Button)(() => ({
    borderRadius: 12,
    height: 60,
    width: '70%',
    backgroundColor: '#7ADA46',
    color: '#000',
    fontSize: 16,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    '&:hover': {
        backgroundColor: '#fff',
    },
    textTransform: 'none',
}));

export const DummyInviteButton = styled(Button)(() => ({
    borderRadius: 12,
    height: 60,
    backgroundColor: '#7ADA46',
    width: '18%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
        backgroundColor: '#fff',
    }
}));

export const ContentCopyIcon = styled(ContentCopy)(() => ({
    color: '#000',
    width: '24px',
    height: '24px',
    transform: 'scaleX(-1)',
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