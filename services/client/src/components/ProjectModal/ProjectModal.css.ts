import { Box, SwipeableDrawer, ButtonBase, styled, Drawer, Button } from '@mui/material';

export const ProjectModalContainer = styled(Box)(() => ({
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

export const ProjectModalMainText = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 600,
    fontSize: 22,
    textAlign: 'center',
    width: '60%',
    marginTop: 20,
}));

export const ProjectModalSecondaryTextContainer = styled(Box)(() => ({
    minHeight: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const ProjectModalSecondaryText = styled(Box)(() => ({
    color: '#fff',
    fontWeight: 400,
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
}));

export const ProjectModalProfitText = styled(Box)(() => ({
    color: '#CDCDCD',
    fontWeight: 400,
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
}));

export const ProjectModalButton = styled(Button)(() => ({
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

export const ProjectsModalMainContainerMoney = styled(Box)(() => ({
    fontSize: 26,
    color: '#fff',
    fontWeight: 900,
    margin: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
