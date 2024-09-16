'use client'
import { Close } from '@mui/icons-material';
import { TicTacToeButton, TicTacToeClose, TicTacToeContainer, TicTacToeField } from './TicTacToeGame.css';
import { useRouter } from 'next/navigation';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';

import CrossImage from '../../assets/mini-app/cross.png';
import CircleImage from '../../assets/mini-app/circle.png';
import Image from 'next/image';
import { ticTacToe } from '@/api/handlers/ticTacToe';

export const TicTacToeGame = () => {
    const router = useRouter();
    const [turn, setTurn] = useState(true);
    const [gameState, setGameState] = useState(
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ],
    );
    const [result, setResult] = useState('in_progress');
    const [buttonText, setButtonText] = useState('Playing...');
    return (
        <TicTacToeContainer>
            <TicTacToeClose>
                <IconButton onClick={() => router.push(`/tapper`)}>
                    <Close sx={{color: '#fff'}} />
                </IconButton>
            </TicTacToeClose>
            <TicTacToeField>
                {
                    gameState.map((row, indexY) => row.map((cell, indexX) => cell === 1 ? (
                        <Image key={indexX} alt="" src={CrossImage} height={78} style={{position: 'absolute', top: 13 + 108 * indexY, left: 13 + 108 * indexX}} />
                    ) : cell === -1 ? (
                        <Image key={indexX} alt="" src={CircleImage} height={78} style={{position: 'absolute', top: 13 + 108 * indexY, left: 13 + 108 * indexX}} />
                    ) : (
                        <Box
                            key={indexX}
                            onClick={async () => {
                                if (!turn || result !== 'in_progress') {
                                    return
                                }
                                setTurn(false);
                                const newGameState = gameState.map((r, iY) => iY === indexY ? row.map((c, iX) => iX === indexX ? 1 : c) : r);
                                setGameState(newGameState);
                                const {response} = await ticTacToe(newGameState, window.Telegram.WebApp.initDataUnsafe.user.id);
                                await new Promise(r => setTimeout(r, 500));

                                const {field, result: newResult} = response;

                                setResult(newResult);
                                if (field) {
                                    setGameState(field);
                                }
                                setTurn(true);

                                if (newResult === 'player_win') {
                                    setButtonText('Take your prize');
                                } else if (newResult === 'bot_win' || newResult === 'draw') {
                                    setButtonText('Return later');
                                }
                            }}
                            sx={{width: 78, height: 78, position: 'absolute', top: 13 + 108 * indexY, left: 13 + 108 * indexX}} />
                    )))
                }
                {
                    gameState[0][0] + gameState[1][0] + gameState[2][0] === 3 && (
                        <Box sx={{height: '300px', width: '10px', position: 'absolute', backgroundColor: '#81DC50', top: 10, left: 48, borderRadius: 5}} />
                    )
                }
                {
                    gameState[0][1] + gameState[1][1] + gameState[2][1] === 3 && (
                        <Box sx={{height: '300px', width: '10px', position: 'absolute', backgroundColor: '#81DC50', top: 10, left: 156, borderRadius: 5}} />
                    )
                }
                {
                    gameState[0][2] + gameState[1][2] + gameState[2][2] === 3 && (
                        <Box sx={{height: '300px', width: '10px', position: 'absolute', backgroundColor: '#81DC50', top: 10, left: 264, borderRadius: 5}} />
                    )
                }
                {
                    gameState[0][0] + gameState[0][1] + gameState[0][2] === 3 && (
                        <Box sx={{height: '10px', width: '300px', position: 'absolute', backgroundColor: '#81DC50', top: 48, left: 10, borderRadius: 5}} />
                    )
                }
                {
                    gameState[1][0] + gameState[1][1] + gameState[1][2] === 3 && (
                        <Box sx={{height: '10px', width: '300px', position: 'absolute', backgroundColor: '#81DC50', top: 156, left: 10, borderRadius: 5}} />
                    )
                }
                {
                    gameState[2][0] + gameState[2][1] + gameState[2][2] === 3 && (
                        <Box sx={{height: '10px', width: '300px', position: 'absolute', backgroundColor: '#81DC50', top: 264, left: 10, borderRadius: 5}} />
                    )
                }
                {
                    gameState[0][0] + gameState[1][1] + gameState[2][2] === 3 && (
                        <Box sx={{height: '10px', width: '300px', position: 'absolute', backgroundColor: '#81DC50', top: 156, left: 10, borderRadius: 5, transform: 'rotate(-45deg)'}} />
                    )
                }
                {
                    gameState[2][0] + gameState[1][1] + gameState[0][2] === 3 && (
                        <Box sx={{height: '10px', width: '300px', position: 'absolute', backgroundColor: '#81DC50', top: 156, left: 10, borderRadius: 5, transform: 'rotate(45deg)'}} />
                    )
                }
                {
                    gameState[0][0] + gameState[1][0] + gameState[2][0] === -3 && (
                        <Box sx={{height: '300px', width: '10px', position: 'absolute', backgroundColor: '#FD3F36', top: 10, left: 48, borderRadius: 5}} />
                    )
                }
                {
                    gameState[0][1] + gameState[1][1] + gameState[2][1] === -3 && (
                        <Box sx={{height: '300px', width: '10px', position: 'absolute', backgroundColor: '#FD3F36', top: 10, left: 156, borderRadius: 5}} />
                    )
                }
                {
                    gameState[0][2] + gameState[1][2] + gameState[2][2] === -3 && (
                        <Box sx={{height: '300px', width: '10px', position: 'absolute', backgroundColor: '#FD3F36', top: 10, left: 264, borderRadius: 5}} />
                    )
                }
                {
                    gameState[0][0] + gameState[0][1] + gameState[0][2] === -3 && (
                        <Box sx={{height: '10px', width: '300px', position: 'absolute', backgroundColor: '#FD3F36', top: 48, left: 10, borderRadius: 5}} />
                    )
                }
                {
                    gameState[1][0] + gameState[1][1] + gameState[1][2] === -3 && (
                        <Box sx={{height: '10px', width: '300px', position: 'absolute', backgroundColor: '#FD3F36', top: 156, left: 10, borderRadius: 5}} />
                    )
                }
                {
                    gameState[2][0] + gameState[2][1] + gameState[2][2] === -3 && (
                        <Box sx={{height: '10px', width: '300px', position: 'absolute', backgroundColor: '#FD3F36', top: 264, left: 10, borderRadius: 5}} />
                    )
                }
                {
                    gameState[0][0] + gameState[1][1] + gameState[2][2] === -3 && (
                        <Box sx={{height: '10px', width: '300px', position: 'absolute', backgroundColor: '#FD3F36', top: 156, left: 10, borderRadius: 5, transform: 'rotate(-45deg)'}} />
                    )
                }
                {
                    gameState[2][0] + gameState[1][1] + gameState[0][2] === -3 && (
                        <Box sx={{height: '10px', width: '300px', position: 'absolute', backgroundColor: '#FD3F36', top: 156, left: 10, borderRadius: 5, transform: 'rotate(45deg)'}} />
                    )
                }
            </TicTacToeField>
            <TicTacToeButton onClick={() => router.push(`/tapper`)} disabled={result === 'in_progress'}>{buttonText}</TicTacToeButton>
        </TicTacToeContainer>
    )
}