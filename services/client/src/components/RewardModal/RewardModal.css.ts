import { Box, SwipeableDrawer, ButtonBase, styled, Drawer, Button } from '@mui/material';

export const RewardModalContainer = styled(Box)(() => ({
    height: '87%',
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

export const RewardModalMainText = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 600,
    fontSize: 22,
    textAlign: 'center',
    margin: 20
}));

export const RewardModalSecondaryTextContainer = styled(Box)(() => ({
    minHeight: 100,
    display: 'flex',
    justifyContent: 'center',
}));

export const RewardModalSecondaryText = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 400,
    fontSize: 12,
    textAlign: 'center',
}));

export const RewardModalCardRow = styled(Box)(() => ({
    width: 350,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
}));

export const RewardModalCard = styled(Box)(() => ({
    height: 67,
    width: 64,
    backgroundColor: '#2E3342',
    borderRadius: 6.6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    fontSize: 9,
    fontWeight: 500,
    color: '#fff',
}));

export const RewardModalCardShadow = styled(Box)(() => ({
    height: 67,
    width: 64,
    backgroundColor: '#2E334277',
    borderRadius: 6.6,
    position: 'absolute',
}));

export const RewardModalButton = styled(Button)(() => ({
    position: 'absolute',
    top: '14%',
    right: 0,
    zIndex: 3,
}));