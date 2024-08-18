'use client';

import React, { useState } from 'react';
import { TapperContainer, TapperStatisticsContainer, TapperMainContainer, TapperStatistics, TapperStatisticsCoinContainer, TapperStatisticsProfitContainer, TapperStatisticsProfitTitleContainer, TapperStatisticsProfitAmountContainer, TapperStatisticsLeft, TapperStatisticsRight, TapperStatisticsAvatar, TapperStatisticsSettingsContainer, TapperStatisticsSettingsLine, TapperStatisticsName, TapperMainContainerCardContainer, TapperMainContainerCard, TapperMainContainerCardTop, TapperMainContainerCardTopTime, TapperMainContainerMoney, TapperMainContainerTapper, TapperMainContainerTapperContainer } from './Tapper.css';

import CoinMin from '../../assets/icons/coin_min.svg';
import CoinMax from '../../assets/icons/coin_max.svg';
import IIcon from '../../assets/icons/i.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import CalendarIcon from '../../assets/icons/calendar.png';
import Image from 'next/image';

export const Tapper = ({ id }: { id: string }) => {
    const [money, setMoney] = useState(7000000);

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
                                +2,42M <IIcon />
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
                                05:22
                            </TapperMainContainerCardTopTime>
                        </TapperMainContainerCardTop>
                        Daily Reward
                    </TapperMainContainerCard>
                    <TapperMainContainerCard>
                        <TapperMainContainerCardTop>
                            <Image alt="" src={CalendarIcon} height={27} width={27} />
                            <TapperMainContainerCardTopTime>
                                05:22
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
                    <TapperMainContainerTapper onClick={() => setMoney(money + 1)} />
                </TapperMainContainerTapperContainer>
            </TapperMainContainer>
        </TapperContainer>
    )
}