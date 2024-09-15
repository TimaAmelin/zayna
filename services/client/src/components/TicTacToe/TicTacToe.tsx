'use client'
import { Close } from '@mui/icons-material';
import { TicTacToeButton, TicTacToeClose, TicTacToeContainer, TicTacToeExample, TicTacToeMainText, TicTacToeSecondaryText } from './TicTacToe.css';
import { useRouter } from 'next/navigation';
import { IconButton } from '@mui/material';

export const TicTacToe = () => {
    const router = useRouter();
    return (
        <TicTacToeContainer>
            <TicTacToeClose>
                <IconButton onClick={() => router.push(`/tapper`)}>
                    <Close sx={{color: '#fff'}} />
                </IconButton>
            </TicTacToeClose>
            <TicTacToeMainText>
                Beat tic-tac-toe<br />
                and earn tokens
            </TicTacToeMainText>
            <TicTacToeExample />
            <TicTacToeSecondaryText>
                The game is open <span style={{color: '#7ADA46',}}>once a day</span>
            </TicTacToeSecondaryText>
            <TicTacToeButton onClick={() => router.push(`/tic-tac-toe-game`)}>Play</TicTacToeButton>
        </TicTacToeContainer>
    )
}