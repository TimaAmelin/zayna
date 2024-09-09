'use client';
import { TasksCard, TasksCardMainText, TasksCardSecondaryText, TasksCardTextsContainer, TasksContainer, TasksMainCardContainer, TasksSecondaryTextContainer } from './Tasks.css';
import { useRouter } from 'next/navigation';

import YTIcon from '../../assets/yt.png';
import TGIcon from '../../assets/tg.png';
import RewardIcon from '../../assets/icons/calendar_new.png';
import GameIcon from '../../assets/icons/game.png';
import Arrow from '../../assets/icons/arrow.svg';
import CoinIcon from '../../assets/icons/coin_min.svg';
import Image from 'next/image';
import { Box } from '@mui/material';

export const Tasks = ({ id, username }: {
    id: number,
    username?: string,
}) => {
    const router = useRouter();
    return (
        <TasksContainer>
            <TasksSecondaryTextContainer>
                Zayna Social (New)
            </TasksSecondaryTextContainer>
            <TasksCard onClick={() => router.push(`/tapper?id=${id}&username=${username}`)}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={YTIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Zayna Social (New)
                        </TasksCardMainText>
                        <TasksCardSecondaryText>
                            <CoinIcon style={{marginRight: 5}} /> +5,000
                        </TasksCardSecondaryText>
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksSecondaryTextContainer>
                Daily tasks
            </TasksSecondaryTextContainer>
            <TasksCard onClick={() => router.push(`/tapper?id=${id}&username=${username}&open_reward=1`)}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={RewardIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Daily tasks
                        </TasksCardMainText>
                        <TasksCardSecondaryText>
                            <CoinIcon style={{marginRight: 5}} /> +5,000
                        </TasksCardSecondaryText>
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksSecondaryTextContainer>
                Mini-app
            </TasksSecondaryTextContainer>
            <TasksCard onClick={() => router.push(`/tic-tac-toe?id=${id}&username=${username}`)}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={GameIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Mini-app
                        </TasksCardMainText>
                        <TasksCardSecondaryText>
                            <CoinIcon style={{marginRight: 5}} /> +5,000
                        </TasksCardSecondaryText>
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksSecondaryTextContainer>
                Task list
            </TasksSecondaryTextContainer>
            <TasksCard onClick={() => router.push(`/tapper?id=${id}&username=${username}`)}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={TGIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Task list
                        </TasksCardMainText>
                        <TasksCardSecondaryText>
                            <CoinIcon style={{marginRight: 5}} /> +5,000
                        </TasksCardSecondaryText>
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
        </TasksContainer>
    )
}