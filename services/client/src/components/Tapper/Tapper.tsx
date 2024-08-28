'use client';

import React, { useEffect, useState } from 'react';
import { TapperContainer, TapperStatisticsContainer, TapperMainContainer, TapperStatistics, TapperStatisticsCoinContainer, TapperStatisticsProfitContainer, TapperStatisticsProfitTitleContainer, TapperStatisticsProfitAmountContainer, TapperStatisticsLeft, TapperStatisticsRight, TapperStatisticsAvatar, TapperStatisticsSettingsContainer, TapperStatisticsSettingsLine, TapperStatisticsName, TapperMainContainerCardContainer, TapperMainContainerCard, TapperMainContainerCardTop, TapperMainContainerCardTopTime, TapperMainContainerMoney, TapperMainContainerTapper, TapperMainContainerTapperContainer } from './Tapper.css';

import CoinMin from '../../assets/icons/coin_min.svg';
import CoinMax from '../../assets/icons/coin_max.svg';
import IIcon from '../../assets/icons/i.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import CalendarIcon from '../../assets/icons/calendar.png';
import Image from 'next/image';

import { getTokens } from '@/api/handlers/getTokens';
import { putTokenBatch } from '@/api/handlers/putTokenBatch';

export const Tapper = ({ id }: { id: string }) => {
    const [money, setMoney] = useState(0);
    const [moneyLast, setMoneyLast] = useState(0);
    const [moneyPerHour, setMoneyPerHour] = useState(0);

    useEffect(() => {
        const getUserTokens = async () => {
            const res = await getTokens(Number(id));
            return res
        }

        getUserTokens().then(data => {
            setMoney(data.response.sum)
            setMoneyLast(data.response.sum)
            setMoneyPerHour(data.response.per_hour ?? 0)
        })
    }, [id]);

    useEffect(() => {
        putTokenBatch(Number(id), money - moneyLast)
        setMoneyLast(money)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [money, id]);

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
                            Ivan Ivanov
                        </TapperStatisticsName>
                        <TapperStatisticsSettingsLine />
                        <TapperStatisticsSettingsContainer>
                            <SettingsIcon />
                        </TapperStatisticsSettingsContainer>
                    </TapperStatisticsRight>
                </TapperStatistics>
            </TapperStatisticsContainer>
            <TapperMainContainer>
                <TapperMainContainerCardContainer>
                    <TapperMainContainerCard>
                        <TapperMainContainerCardTop>
                            <Image alt="" src={CalendarIcon} height={27} width={27} />
                            <TapperMainContainerCardTopTime>
                                {moneyLast}
                            </TapperMainContainerCardTopTime>
                        </TapperMainContainerCardTop>
                        Daily Reward
                    </TapperMainContainerCard>
                    <TapperMainContainerCard>
                        <TapperMainContainerCardTop>
                            <Image alt="" src={CalendarIcon} height={27} width={27} />
                            <TapperMainContainerCardTopTime>
                                {money - moneyLast}
                            </TapperMainContainerCardTopTime>
                        </TapperMainContainerCardTop>
                        Forests
                    </TapperMainContainerCard>
                    <TapperMainContainerCard>
                        <TapperMainContainerCardTop>
                            <Image alt="" src={CalendarIcon} height={27} width={27} />
                            <TapperMainContainerCardTopTime>
                                05:22
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
                        setMoney(money + 1)
                    }} />
                </TapperMainContainerTapperContainer>
            </TapperMainContainer>
        </TapperContainer>
    )
}