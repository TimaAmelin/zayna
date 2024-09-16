import { Box, Button, styled } from '@mui/material';

export const TasksContainer = styled(Box)(() => ({
    backgroundColor: '#1F1F2E',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
}));

export const TasksCard = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: '#2E3342',
    width: '90%',
    height: 74,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    boxSizing: 'border-box',
    marginLeft: '5%',
}));

export const TasksMainCardContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
}));

export const TasksCardTextsContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
}));

export const TasksCardMainText = styled(Box)(() => ({

}));

export const TasksCardSecondaryText = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
}));

export const TasksSecondaryTextContainer = styled(Box)(() => ({
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    color: '#fff',
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 5,
    marginTop: 30,
    marginLeft: '5%',
}));

export const TasksButton = styled(Button)(() => ({
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
    margin: 40,
    zIndex: 3,
}));