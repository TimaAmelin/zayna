import { Box, Button, styled } from '@mui/material';

export const ProjectsFriendsContainer = styled(Box)(() => ({
    backgroundColor: '#1F1F2E',
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const ProjectsFriendsMainContainer = styled(Box)(() => ({
    backgroundColor: '#1F1F2E',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const ProjectsFriendsTitleContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    color: '#fff',
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 10,
}));

export const ProjectsFriendsMainContainerTypeRow = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
}));

export const ProjectsFriendsMainContainerTypeButton = styled(Button)(() => ({
    border: '1px solid #306A11',
    height: 23,
    color: '#fff',
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#306A11'
    }
}));

export const ProjectsFriendsMainContainerCardRow = styled(Box)(() => ({
    height: '40%',
    width: '100%',
    borderRadius: 5,
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    margin: '20px 0',
    overflowY: 'auto',
}));

export const ProjectsFriendsMainContainerCard = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#2E3342',
    width: '90%',
    height: 88,
    borderRadius: 17,
    boxSizing: 'border-box',
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    marginLeft: '5%',
    float: 'left',
    marginTop: 10,
}));

export const ProjectsFriendsMainContainerCardLeft = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
}));

export const ProjectsFriendsMainContainerCardTitle = styled(Box)(() => ({
    fontSize: 12,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 20,
}));

export const ProjectsFriendsMainContainerCardDescription = styled(Box)(() => ({
    fontSize: 10,
    fontWeight: 500,
    color: '#fff',
    marginBottom: 3,
}));

export const ProjectsFriendsMainContainerCardBottomLvl = styled(Box)(() => ({
    fontSize: 10,
    fontWeight: 500,
    color: '#CDCDCD',
}));

export const ProjectsFriendsMainContainerCardRight = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
}));

export const ProjectsFriendsMainContainerCardBottom = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

export const ProjectsFriendsMainContainerCardBottomCost = styled(Box)(() => ({
    fontSize: 10,
    fontWeight: 500,
    color: '#fff',
    marginBottom: 30,
}));

export const ProjectsFriendsButton = styled(Button)(() => ({
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
    margin: 20,
    zIndex: 3,
}));

export const ProjectsFriendsClose = styled(Box)(() => ({
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 3,
}));
