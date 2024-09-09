import { Box, Button, styled } from '@mui/material';

import backgroundImage from '../../assets/background.jpeg';
import ticTacToeImage from '../../assets/tic-tac-toe.png';

export const TicTacToeContainer = styled(Box)(() => ({
    backgroundImage: `url(${backgroundImage.src})`,
    height: '100%',
    flex: 1,
    backgroundSize: '200%',
    backgroundPosition: 'center 60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Затемняющий слой
        zIndex: 1,
    },
    zIndex: 2,
}));

export const TicTacToeClose = styled(Box)(() => ({
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 3,
}));

export const TicTacToeMainText = styled(Box)(() => ({
    fontSize: 24,
    color: '#fff',
    fontWeight: 600,
    zIndex: 3,
}));

export const TicTacToeExample = styled(Box)(() => ({
    backgroundImage: `url(${ticTacToeImage.src})`,
    height: 150,
    width: 150,
    backgroundSize: '100%',
    zIndex: 3,
    margin: 10,
}));

export const TicTacToeSecondaryText = styled(Box)(() => ({
    fontSize: 14,
    color: '#fff',
    fontWeight: 400,
    zIndex: 3,
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