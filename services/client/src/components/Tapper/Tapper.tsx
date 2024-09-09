'use client';

import React, { useEffect, useState } from 'react';
import { TapperContainer, TapperStatisticsContainer, TapperMainContainer, TapperStatistics, TapperStatisticsCoinContainer, TapperStatisticsProfitContainer, TapperStatisticsProfitTitleContainer, TapperStatisticsProfitAmountContainer, TapperStatisticsLeft, TapperStatisticsRight, TapperStatisticsAvatar, TapperStatisticsSettingsContainer, TapperStatisticsSettingsLine, TapperStatisticsName, TapperMainContainerCardContainer, TapperMainContainerCard, TapperMainContainerCardTop, TapperMainContainerCardTopTime, TapperMainContainerMoney, TapperMainContainerTapper, TapperMainContainerTapperContainer } from './Tapper.css';

import CoinMin from '../../assets/icons/coin_min.svg';
import CoinMax from '../../assets/icons/coin_max.svg';
import IIcon from '../../assets/icons/i.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import GameIcon from '../../assets/icons/game.png';
import CalendarNewIcon from '../../assets/icons/calendar_new.png';
import ForestIcon from '../../assets/icons/forest.png';

import { getTokens } from '@/api/handlers/getTokens';
import { putTokenBatch } from '@/api/handlers/putTokenBatch';
import { putUser } from '@/api/handlers/putUser';
import { useRouter } from 'next/navigation';
import { GiftModal } from '../GiftModal/GiftModal';

import Image from 'next/image';
import { RewardModal } from '../RewardModal/RewardModal';
import { getDaily } from '@/api/handlers/getDaily';
import { ticTacToe } from '@/api/handlers/ticTacToe';
import { recieveGift } from '@/api/handlers/recieveGift';

function dateDiff(date1: Date, date2: Date) {
    const diff: number = date2.getTime() - date1.getTime();
    
    const hours: number = Math.floor(diff / (1000 * 60 * 60));
    const minutes: number = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes }
}

function timeUntilTomorrow() {
    const tomorrow: Date = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    return timeUntilDate(tomorrow)
}

function timeUntilDate(date: Date) {
    const now: Date = new Date();
    
    return dateDiff(now, date)
}

export const Tapper = ({ id, username, from, openReward, present }: {
    id: number,
    username?: string,
    from?: number,
    openReward?: boolean,
    present?: string
}) => {
    const [money, setMoney] = useState(0);
    const [moneyLast, setMoneyLast] = useState(0);
    const [moneyPerHour, setMoneyPerHour] = useState(0);
    const [giftModalOpen, setGiftModalOpen] = useState(false);
    const [dailyModalOpen, setDailyModalOpen] = useState(openReward ?? false);
    const [gifts, setGifts] = useState<{
        project__id: number;
        project__name: string;
        project__price: number;
        project__income: number;
        project__level: number;
        project__mode: string;
        project__description: string;
        project__logo: string;
        sender__username: string;
    }[]>([]);

    const [giftN, setGiftN] = useState(0);

    const [available, setAvailable] = useState(false);
    const [combo, setCombo] = useState(0);
    const [nextMini, setNextMini] = useState<Date>();
    const [timeToNextMini, setTimeToNextMini] = useState({hours: 0, minutes: 0});

    const [timeToDaily, setTimeToDaily] = useState(timeUntilTomorrow());

    const router = useRouter();
    
    const toggleDrawer = async (b: boolean) => {
        if (!b) {
            if (giftN + 1 === gifts.length) {
                setGiftModalOpen(false);
                return
            }
            setGiftModalOpen(false);
            setGiftN(giftN + 1);
            await new Promise(r => setTimeout(r, 500));
            setGiftModalOpen(true);
            return
        }
        setGiftModalOpen(false);
        return
    }

    useEffect(() => {
        const getUserTokens = async () => {
            await putUser(id, username, from);
            if (present) {
                await recieveGift(id, Number(present));
            }
            const res = await getTokens(Number(id));
            return res
        }

        getUserTokens().then(data => {
            setMoney(data.response.sum);
            setMoneyLast(data.response.sum);
            setMoneyPerHour(data.response.per_hour ?? 0);
            setGifts(data.response.presents);
            if (data.response.presents.length) {
                setGiftModalOpen(true);
            }
        })
    }, [id, username, from]);

    useEffect(() => {
        const getUserDaily = async () => {
            const res = await getDaily(Number(id));
            return res
        }

        getUserDaily().then(data => {
            setAvailable(data.response.reward);
            setCombo(data.response.combo);
        })
    }, [id, username, from]);

    useEffect(() => {
        const getUserMini = async () => {
            const res = await ticTacToe([[0, 0, 0], [0, 0, 0], [0, 0, 0]], id);
            return res
        }

        getUserMini().then(data => {
            if (data.response.message === 'User has already played the game') {
                setNextMini(new Date(data.response.next));
                setTimeToNextMini(timeUntilDate(new Date(data.response.next)));
            }
        })
    }, [id, username, from]);

    useEffect(() => {
        putTokenBatch(Number(id), money - moneyLast)
        setMoneyLast(money)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [money, id]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeToDaily(timeUntilTomorrow);
            if (nextMini) {
                setTimeToNextMini(timeUntilDate(new Date(nextMini)));
            }
        }, 1000);
 
        return () => clearInterval(interval);
    }, [timeToDaily]);

    return (
        <TapperContainer>
            <TapperStatisticsContainer>
                <TapperStatistics>
                    <TapperStatisticsLeft>
                        <TapperStatisticsCoinContainer>
                            <CoinMin />
                        </TapperStatisticsCoinContainer>
                        <TapperStatisticsProfitContainer>
                            <TapperStatisticsProfitTitleContainer>
                                Profit per hour
                            </TapperStatisticsProfitTitleContainer>
                            <TapperStatisticsProfitAmountContainer>
                                +{moneyPerHour} <IIcon />
                            </TapperStatisticsProfitAmountContainer>
                        </TapperStatisticsProfitContainer>
                    </TapperStatisticsLeft>
                    <TapperStatisticsRight>
                        <TapperStatisticsAvatar />
                        <TapperStatisticsName>
                            {username}
                        </TapperStatisticsName>
                        <TapperStatisticsSettingsLine />
                        <TapperStatisticsSettingsContainer
                            onClick={() => router.push(`/settings?id=${id}&username=${username}`)}>
                            <SettingsIcon />
                        </TapperStatisticsSettingsContainer>
                    </TapperStatisticsRight>
                </TapperStatistics>
            </TapperStatisticsContainer>
            <TapperMainContainer>
                <TapperMainContainerCardContainer>
                    <TapperMainContainerCard>
                        <TapperMainContainerCardTop onClick={() => setDailyModalOpen(true)}>
                            <div style={{height: 35}}>
                                <Image src={CalendarNewIcon} height={27} alt="" />
                            </div>
                            {timeToDaily && (
                                <TapperMainContainerCardTopTime>
                                    {timeToDaily.hours}h{timeToDaily.minutes}m
                                </TapperMainContainerCardTopTime>
                            )}
                        </TapperMainContainerCardTop>
                        Daily Reward
                    </TapperMainContainerCard>
                    <TapperMainContainerCard onClick={() => router.push(`/projects?id=${id}&username=${username}`)}>
                        <TapperMainContainerCardTop>
                            <div style={{height: 35}}>
                                <Image src={ForestIcon} height={35} alt="" />
                            </div>
                        </TapperMainContainerCardTop>
                        Forests
                    </TapperMainContainerCard>
                    <TapperMainContainerCard onClick={() => router.push(`/tic-tac-toe?id=${id}&username=${username}`)}>
                        <TapperMainContainerCardTop>
                            <div style={{height: 35}}>
                                <Image src={GameIcon} height={27} alt="" />
                            </div>
                            <TapperMainContainerCardTopTime>
                                {(timeToNextMini.hours || timeToNextMini.minutes) && (
                                    <TapperMainContainerCardTopTime>
                                        {timeToNextMini.hours}h{timeToNextMini.minutes}m
                                    </TapperMainContainerCardTopTime>
                                )}
                            </TapperMainContainerCardTopTime>
                        </TapperMainContainerCardTop>
                        Mini-app
                    </TapperMainContainerCard>
                </TapperMainContainerCardContainer>
                <TapperMainContainerMoney>
                    <CoinMax style={{marginRight: 10}} /> {money.toLocaleString('ru-RU')}
                </TapperMainContainerMoney>
                <TapperMainContainerTapperContainer>
                    <TapperMainContainerTapper onClick={() => {
                        setMoney(money + money.toString().length)
                    }} />
                </TapperMainContainerTapperContainer>
            </TapperMainContainer>
            <GiftModal toggleDrawer={toggleDrawer} open={giftModalOpen} id={id} gift={gifts[giftN]} />
            <RewardModal
                toggleDrawer={setDailyModalOpen}
                open={dailyModalOpen}
                id={id} combo={combo}
                available={available}
                setMoney={setMoney}
                setAvailable={setAvailable}
                money={money} />
        </TapperContainer>
    )
}