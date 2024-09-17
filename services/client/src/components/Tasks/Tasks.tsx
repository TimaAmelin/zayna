'use client';
import { TasksCard, TasksCardMainText, TasksCardSecondaryText, TasksCardTextsContainer, TasksContainer, TasksMainCardContainer, TasksSecondaryTextContainer } from './Tasks.css';
import { useRouter } from 'next/navigation';

import YTIcon from '../../assets/yt.png';
import TGIcon from '../../assets/tg.png';
import RewardIcon from '../../assets/icons/calendar_new.png';
import GameIcon from '../../assets/icons/game.png';
import Arrow from '../../assets/icons/arrow.svg';
import CoinIcon from '../../assets/icons/coin_min.svg';
import ZaynaIcon from '../../assets/tapper.png';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ticTacToe } from '@/api/handlers/ticTacToe';
import { getTasks } from '@/api/handlers/getTasks';
import { postTask } from '@/api/handlers/postTask';

export const Tasks = () => {
    const [availableMini, setAvailableMini] = useState(true)
    const [available, setAvailable] = useState({
        YouTube: false,
        X: false,
        FB: false,
        Insta: false,
        LinkedIn: false,
        Pinterest: false,
        TikTok: false,
        TG: false
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const getUserMini = async () => {
                const res = await ticTacToe([[0, 0, 0], [0, 0, 0], [0, 0, 0]], window.Telegram.WebApp.initDataUnsafe.user.id);
                return res
            }
    
            getUserMini().then(data => {
                if (data.response.message === 'User has already played the game') {
                    setAvailableMini(false)
                }
            })
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const getuserTasks = async () => {
                const res = await getTasks(window.Telegram.WebApp.initDataUnsafe.user.id);
                return res
            }
    
            getuserTasks().then(data => {
                setAvailable(data.response.networks)
            })
        }
    }, []);
    const router = useRouter();
    return (
        <TasksContainer>
            <TasksSecondaryTextContainer>
                Zayna Social (New)
            </TasksSecondaryTextContainer>
            <TasksCard onClick={async () => {
                if (typeof window !== 'undefined') {
                    await postTask(window.Telegram.WebApp.initDataUnsafe.user.id, 'Youtube')
                }
                window.open('https://www.youtube.com/@Zaynaclimate', '_blank')
            }}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={YTIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Zayna Social (New)
                        </TasksCardMainText>
                        {!available.YouTube && (
                            <TasksCardSecondaryText>
                                <CoinIcon style={{marginRight: 5}} /> +5,000
                            </TasksCardSecondaryText>
                        )}
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksSecondaryTextContainer>
                Daily tasks
            </TasksSecondaryTextContainer>
            <TasksCard onClick={() => router.push(`/tapper?open_reward=1`)}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={RewardIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Daily tasks
                        </TasksCardMainText>
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksSecondaryTextContainer>
                Mini-app
            </TasksSecondaryTextContainer>
            <TasksCard onClick={() => {
                if (availableMini) {
                    router.push(`/tic-tac-toe`)
                } else {
                    alert('Mini game is not available now. Check out later!')
                }
            }}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={GameIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Mini-app
                        </TasksCardMainText>
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksSecondaryTextContainer>
                Task list
            </TasksSecondaryTextContainer>
            <TasksCard onClick={async () => {
                window.open('https://t.me/zayna_world')
                if (typeof window !== 'undefined') {
                    await postTask(window.Telegram.WebApp.initDataUnsafe.user.id, 'TG')
                }
            }}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={TGIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Join our Telegram
                        </TasksCardMainText>
                        {!available.TG && (
                            <TasksCardSecondaryText>
                                <CoinIcon style={{marginRight: 5}} /> +5,000
                            </TasksCardSecondaryText>
                        )}
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksCard onClick={async () => {
                window.open('https://www.tiktok.com/@zaynaclimate', '_blank')
                if (typeof window !== 'undefined') {
                    await postTask(window.Telegram.WebApp.initDataUnsafe.user.id, 'TikTok')
                }
            }}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={ZaynaIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Join our TikTok
                        </TasksCardMainText>
                        {!available.TikTok && (
                            <TasksCardSecondaryText>
                                <CoinIcon style={{marginRight: 5}} /> +5,000
                            </TasksCardSecondaryText>
                        )}
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksCard onClick={async () => {
                window.open('https://x.com/Zaynaclimate', '_blank')
                if (typeof window !== 'undefined') {
                    await postTask(window.Telegram.WebApp.initDataUnsafe.user.id, 'X')
                }
            }}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={ZaynaIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Join our X (Twitter)
                        </TasksCardMainText>
                        {!available.X && (
                            <TasksCardSecondaryText>
                                <CoinIcon style={{marginRight: 5}} /> +5,000
                            </TasksCardSecondaryText>
                        )}
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksCard onClick={async () => {
                window.open('https://www.facebook.com/share/p/17jmLfLper/', '_blank')
                if (typeof window !== 'undefined') {
                    await postTask(window.Telegram.WebApp.initDataUnsafe.user.id, 'FB')
                }
            }}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={ZaynaIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Join our Facebook
                        </TasksCardMainText>
                        {!available.FB && (
                            <TasksCardSecondaryText>
                                <CoinIcon style={{marginRight: 5}} /> +5,000
                            </TasksCardSecondaryText>
                        )}
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksCard onClick={async () => {
                window.open('https://t.me/zayna_world', '_blank')
                if (typeof window !== 'undefined') {
                    await postTask(window.Telegram.WebApp.initDataUnsafe.user.id, 'Insta')
                }
            }}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={ZaynaIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Join our Instagram
                        </TasksCardMainText>
                        {!available.Insta && (
                            <TasksCardSecondaryText>
                                <CoinIcon style={{marginRight: 5}} /> +5,000
                            </TasksCardSecondaryText>
                        )}
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksCard onClick={async () => {
                window.open('www.linkedin.com/in/zaynaclimate', '_blank')
                if (typeof window !== 'undefined') {
                    await postTask(window.Telegram.WebApp.initDataUnsafe.user.id, 'LinkedIn')
                }
            }}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={ZaynaIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Join our LinkedIn
                        </TasksCardMainText>
                        {!available.LinkedIn && (
                            <TasksCardSecondaryText>
                                <CoinIcon style={{marginRight: 5}} /> +5,000
                            </TasksCardSecondaryText>
                        )}
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
            <TasksCard onClick={async () => {
                window.open('https://www.facebook.com/share/p/17jmLfLper/', '_blank')
                if (typeof window !== 'undefined') {
                    await postTask(window.Telegram.WebApp.initDataUnsafe.user.id, 'Pinterest')
                }
            }}>
                <TasksMainCardContainer>
                    <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src={ZaynaIcon} alt="" height={32} />
                    </Box>
                    <TasksCardTextsContainer>
                        <TasksCardMainText>
                            Join our Pinterest
                        </TasksCardMainText>
                        {!available.Pinterest && (
                            <TasksCardSecondaryText>
                                <CoinIcon style={{marginRight: 5}} /> +5,000
                            </TasksCardSecondaryText>
                        )}
                    </TasksCardTextsContainer>
                </TasksMainCardContainer>
                <Arrow style={{margin: 15}} />
            </TasksCard>
        </TasksContainer>
    )
}