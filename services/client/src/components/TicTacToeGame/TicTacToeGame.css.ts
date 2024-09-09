import { Box, Button, styled } from '@mui/material';

import ticTacToeFeildImage from '../../assets/tic-tac-toe-field.png';

export const TicTacToeContainer = styled(Box)(() => ({
    height: '100%',
    flex: 1,
    backgroundSize: '200%',
    backgroundPosition: 'center 60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
}));

export const TicTacToeClose = styled(Box)(() => ({
    position: 'absolute',
    top: 20,
    right: 20,
}));

export const TicTacToeField = styled(Box)(() => ({
    backgroundImage: `url(${ticTacToeFeildImage.src})`,
    height: 320,
    width: 320,
    backgroundSize: '100%',
    zIndex: 3,
    margin: 10,
    position: 'relative',
}));

export const TicTacToeButton = styled(Button)(() => ({
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