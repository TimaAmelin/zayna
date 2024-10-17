'use client';
import { Close } from '@mui/icons-material';
import {
  TicTacToeButton,
  TicTacToeClose,
  TicTacToeContainer,
  TicTacToeExample,
  TicTacToeMainText,
  TicTacToeSecondaryText,
} from './TicTacToe.css';
import { useRouter } from 'next/navigation';
import { IconButton } from '@mui/material';

export const TicTacToe = () => {
  const router = useRouter();
  return (
    <TicTacToeContainer>
      <TicTacToeClose>
        <IconButton onClick={() => router.push(`/tapper`)}>
          <Close sx={{ color: '#fff' }} />
        </IconButton>
      </TicTacToeClose>
      <TicTacToeMainText>
        Победите Zayna в крестики-нолики
        <br />и заработайте монеты
      </TicTacToeMainText>
      <TicTacToeExample />
      <TicTacToeSecondaryText>
        Игра доступна <span style={{ color: '#7ADA46' }}>один раз в день</span>
      </TicTacToeSecondaryText>
      <TicTacToeButton onClick={() => router.push(`/tic-tac-toe-game`)}>
        Играть
      </TicTacToeButton>
    </TicTacToeContainer>
  );
};
