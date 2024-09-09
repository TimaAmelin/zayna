import { Box, SwipeableDrawer, ButtonBase, styled, Drawer, Button } from '@mui/material';

export const GiftModalContainer = styled(Box)(() => ({
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

export const GiftModalMainText = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 600,
    fontSize: 22,
    textAlign: 'center',
}));

export const GiftModalSecondaryTextContainer = styled(Box)(() => ({
    minHeight: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const GiftModalSecondaryText = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 700,
    fontSize: 12,
    textAlign: 'center',
}));

export const GiftModalButton = styled(Button)(() => ({
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