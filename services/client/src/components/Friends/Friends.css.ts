import { ContentCopy } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';

export const FriendsContainer = styled(Box)(() => ({
    backgroundColor: '#1F1F2E',
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const FriendsTitleContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    color: '#fff',
    fontSize: 26,
    fontWeight: 700,
}));

export const FriendsSubTitleContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 30,
}));

export const FriendsCard = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: '#2E3342',
    width: '90%',
    height: 74,
    borderRadius: 10,
    marginTop: 10,
}));

export const FriendsCardTextContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
}));

export const FriendsCardText = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
}));

export const FriendsSecondaryTextContainer = styled(Box)(() => ({
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    color: '#fff',
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 5,
    marginTop: 30,
}));

export const FriendsFriendCard = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: 500,
    backgroundColor: '#2E3342',
    width: '90%',
    height: 52,
    borderRadius: 10,
    marginTop: 10,
    color: '#fff',
    paddingLeft: 15,
    boxSizing: 'border-box',
}));

export const FriendsInviteButtonContainer = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
}));

export const FriendsInviteButtonText = styled(Button)(() => ({
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
    marginTop: 20,
    textTransform: 'none',
}));

export const FriendsInviteButton = styled(Button)(() => ({
    borderRadius: 12,
    height: 60,
    backgroundColor: '#7ADA46',
    width: '18%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
}));

export const ContentCopyIcon = styled(ContentCopy)(() => ({
    color: '#000',
    width: '24px',
    height: '24px',
    transform: 'scaleX(-1)',
}));