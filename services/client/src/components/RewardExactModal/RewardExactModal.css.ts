import { Box, SwipeableDrawer, ButtonBase, styled, Drawer, Button } from '@mui/material';

export const RewardExactModalContainer = styled(Box)(() => ({
    backgroundColor: '#191B23',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px 10px 0 0',
    boxShadow: '0px 0px 48.9px 0px #7ADA4699, 0 0 0 2px #7ADA46',
    width: '100%',
    padding: 20,
    boxSizing: 'border-box',
}));

export const RewardExactModalMainText = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 600,
    fontSize: 22,
    textAlign: 'center',
    margin: 20
}));

export const RewardExactModalSecondaryTextContainer = styled(Box)(() => ({
    minHeight: 100,
    display: 'flex',
    justifyContent: 'center',
}));

export const RewardExactModalSecondaryText = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 400,
    fontSize: 12,
    textAlign: 'center',
}));

export const RewardExactModalButton = styled(Button)(() => ({
    borderRadius: 12,
    height: 60,
    width: '90%',
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
    margin: 10,
    zIndex: 3,
}));