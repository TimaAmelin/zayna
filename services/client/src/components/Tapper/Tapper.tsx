'use client';

import React, { useEffect, useState } from 'react';
import {
  TapperContainer,
  TapperStatisticsContainer,
  TapperMainContainer,
  TapperStatistics,
  TapperStatisticsCoinContainer,
  TapperStatisticsProfitContainer,
  TapperStatisticsProfitTitleContainer,
  TapperStatisticsProfitAmountContainer,
  TapperStatisticsLeft,
  TapperStatisticsRight,
  TapperStatisticsAvatar,
  TapperStatisticsSettingsContainer,
  TapperStatisticsSettingsLine,
  TapperStatisticsName,
  TapperMainContainerCardContainer,
  TapperMainContainerCard,
  TapperMainContainerCardTop,
  TapperMainContainerCardTopTime,
  TapperMainContainerMoney,
  TapperMainContainerTapper,
  TapperMainContainerTapperContainer,
} from './Tapper.css';

import CoinMin from '../../assets/icons/coin_min.svg';
import CoinMax from '../../assets/icons/coin_max.svg';
import CoinIcon from '../../assets/icons/coin_big.png';
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
import { keyframes, styled } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { DummyContainer } from '../Dummy/Dummy.css';
import { getProjects } from '@/api/handlers/getProjects';

const coinAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  10% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateY(-100px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-150px) scale(0.5);
  }
`;

// Стилизованный компонент монетки
const Coin = styled(Image)(() => ({
  position: 'absolute',
  width: '40px',
  height: '40px',
  backgroundColor: 'gold',
  borderRadius: '50%',
  animation: `${coinAnimation} 1s ease-out forwards`,
  display: 'inline-block',
  zIndex: 1000,
}));

function dateDiff(date1: Date, date2: Date) {
  const diff: number = date2.getTime() - date1.getTime();

  const hours: number = Math.floor(diff / (1000 * 60 * 60));
  const minutes: number = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
}

function timeUntilTomorrow() {
  const tomorrow: Date = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return timeUntilDate(tomorrow);
}

function timeUntilDate(date: Date) {
  const now: Date = new Date();

  return dateDiff(now, date);
}

export const Tapper = ({
  from,
  openReward,
  present,
  avatar,
}: {
  from?: number;
  openReward?: boolean;
  present?: string;
  avatar?: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [money, setMoney] = useState(0);
  const [projects, setProjects] = useState<
    {
      id: number;
      name: string;
      cost: number;
      profit: number;
      description: string;
      mode: string;
      level: number;
      logo: string;
    }[]
  >([]);
  const [moneyLast, setMoneyLast] = useState(0);
  const [moneyPerHour, setMoneyPerHour] = useState(0);
  const [moneyPerHourDiff, setMoneyPerHourDiff] = useState(0);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [dailyModalOpen, setDailyModalOpen] = useState(openReward ?? false);
  const [ava, setAva] = useState(avatar);
  const [gifts, setGifts] = useState<
    {
      id: number;
      project__id: number;
      project__name: string;
      project__price: number;
      project__income: number;
      project__level: number;
      project__mode: string;
      project__description: string;
      project__logo: string;
      sender__username: string;
    }[]
  >([]);

  const [giftN, setGiftN] = useState(0);

  const [available, setAvailable] = useState(false);
  const [combo, setCombo] = useState(0);
  const [nextMini, setNextMini] = useState<Date>();
  const [timeToNextMini, setTimeToNextMini] = useState({
    hours: 0,
    minutes: 0,
  });

  const [timeToDaily, setTimeToDaily] = useState(timeUntilTomorrow());
  const [coins, setCoins] = useState<{ id: string; x: number; y: number }[]>(
    []
  );

  async function refetch() {
    try {
      if (typeof window !== 'undefined' && window.Telegram) {
        const data = await getTokens(
          Number(window.Telegram?.WebApp?.initDataUnsafe?.user?.id)
        );

        setMoneyLast(data.response.sum);
        setMoney(data.response.sum);
        setMoneyPerHour(data.response.per_hour ?? 0);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = (e: React.Touch) => {
    try {
      setMoney(money + 2);
      // if (navigator.vibrate) {
      //     navigator.vibrate(50);
      // } else {
      //     console.log("Вибрация не поддерживается на этом устройстве.");
      // }
      if (typeof window !== 'undefined' && window.Telegram) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');
      }

      const x = e.clientX + Math.random() * 200 - 100;
      const y = e.clientY + Math.random() * 200 - 100;

      setCoins((prevCoins) => [...prevCoins, { id: uuidv4(), x, y }]);

      setTimeout(() => {
        setCoins((prevCoins) =>
          prevCoins.filter((coin) => coin.id !== prevCoins[0].id)
        );
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  const toggleDrawer = async (b: boolean) => {
    if (!b) {
      if (giftN + 1 === gifts.length) {
        setGiftModalOpen(false);
        return;
      }
      setGiftModalOpen(false);
      setGiftN(giftN + 1);
      await new Promise((r) => setTimeout(r, 500));
      setGiftModalOpen(true);
      return;
    }
    setGiftModalOpen(false);
    return;
  };

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.Telegram) {
        const getUser = async () => {
          const user = await putUser(
            window.Telegram?.WebApp?.initDataUnsafe?.user?.id,
            window.Telegram?.WebApp?.initDataUnsafe?.user?.username,
            from,
            avatar
          );
          // if (present) {
          //     try {
          //         await recieveGift(window.Telegram?.WebApp?.initDataUnsafe?.user?.id, Number(present));
          //     } catch (error) {

          //     }
          // }
          const tokens = await getTokens(
            Number(window.Telegram?.WebApp?.initDataUnsafe?.user?.id)
          );
          const daily = await getDaily(
            Number(window.Telegram?.WebApp?.initDataUnsafe?.user?.id)
          );
          const tictactoe = await ticTacToe(
            [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0],
            ],
            window.Telegram?.WebApp?.initDataUnsafe?.user?.id
          );
          const projects = await getProjects(
            window.Telegram?.WebApp?.initDataUnsafe?.user?.id
          );
          return { tokens, user, daily, tictactoe, projects };
        };

        getUser().then(({ tokens, user, daily, tictactoe, projects }) => {
          setMoney(tokens?.response?.sum ?? 0);
          setMoneyLast(tokens?.response?.sum ?? 0);
          setMoneyPerHour(tokens?.response?.income ?? 0);
          setGifts([
            ...tokens?.response?.presents,
            ...(user.response?.presents?.[0]?.sender__username
              ? user?.response?.presents
              : []),
          ]);
          setAvailable(daily.response.reward);
          setCombo(daily.response.combo);
          if (tokens?.response?.photo) {
            setAva(tokens.response.photo);
          }
          if (
            (tokens?.response?.presents.length ?? 0) +
              user?.response?.presents.length >
              0 &&
            user.response?.presents?.[0]?.sender__username
          ) {
            setGiftModalOpen(true);
          }
          setLoading(false);
          if (
            tictactoe.response.message === 'User has already played the game'
          ) {
            setNextMini(new Date(tictactoe.response.next));
            setTimeToNextMini(timeUntilDate(new Date(tictactoe.response.next)));
          }
          setProjects(projects.response.projects);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram) {
      window.Telegram.WebApp.expand();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const interval = setInterval(() => {
        if (!available) {
          setTimeToDaily(timeUntilTomorrow);
        } else {
          setTimeToDaily({ hours: 0, minutes: 0 });
        }
        if (nextMini) {
          setTimeToNextMini(timeUntilDate(new Date(nextMini)));
        }
        if (!loading) {
          let diff = money - moneyLast < 1000 ? money - moneyLast : 0;
          if (moneyPerHourDiff + moneyPerHour / 3600 >= 1) {
            diff += Math.floor(moneyPerHourDiff + moneyPerHour / 3600);
          }
          setMoneyPerHourDiff(
            moneyPerHourDiff +
              moneyPerHour / 3600 -
              Math.floor(moneyPerHourDiff + moneyPerHour / 3600)
          );

          if (typeof window !== 'undefined' && window.Telegram) {
            if (diff !== 0) {
              putTokenBatch(
                Number(window.Telegram?.WebApp?.initDataUnsafe?.user?.id),
                diff
              );
            }
          }
          setMoney((money) => money + moneyPerHour / 3600);
          setMoneyLast(money + moneyPerHour / 3600);
        }
      }, 1000);

      return () => clearInterval(interval);
    } catch (error) {
      console.log(error);
    }
  }, [timeToDaily]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touches = e.touches;

    // Перебираем все касания и обрабатываем каждое
    for (let i = 0; i < touches.length; i++) {
      handleClick(touches[i]);
      // Здесь вы можете добавить свою логику обработки касаний
    }
  };

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.Telegram) {
        const platform = window.Telegram.WebApp.platform;

        if (!['ios', 'android'].includes(platform)) {
          alert('Mini app is not available on desktop');
          window.Telegram.WebApp.close();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return <DummyContainer></DummyContainer>;
  }

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
                Прибыль в час
              </TapperStatisticsProfitTitleContainer>
              <TapperStatisticsProfitAmountContainer>
                +{moneyPerHour} <IIcon />
              </TapperStatisticsProfitAmountContainer>
            </TapperStatisticsProfitContainer>
          </TapperStatisticsLeft>
          <TapperStatisticsRight>
            <TapperStatisticsAvatar>
              {ava && <Image src={ava} alt="" height={20} width={20} />}
            </TapperStatisticsAvatar>
            {typeof window !== 'undefined' && window.Telegram && (
              <TapperStatisticsName>
                {window.Telegram?.WebApp?.initDataUnsafe?.user?.username}
              </TapperStatisticsName>
            )}
            <TapperStatisticsSettingsLine />
            <TapperStatisticsSettingsContainer
              onClick={() => router.push(`/settings`)}
            >
              <SettingsIcon />
            </TapperStatisticsSettingsContainer>
          </TapperStatisticsRight>
        </TapperStatistics>
      </TapperStatisticsContainer>
      <TapperMainContainer>
        <TapperMainContainerCardContainer>
          <TapperMainContainerCard>
            <TapperMainContainerCardTop onClick={() => setDailyModalOpen(true)}>
              <div style={{ height: 35 }}>
                <Image src={CalendarNewIcon} height={27} alt="" />
              </div>
              {timeToDaily.hours && timeToDaily.minutes ? (
                <TapperMainContainerCardTopTime>
                  {timeToDaily.hours}h{timeToDaily.minutes}m
                </TapperMainContainerCardTopTime>
              ) : (
                <TapperMainContainerCardTopTime></TapperMainContainerCardTopTime>
              )}
            </TapperMainContainerCardTop>
            Ежедневная награда
          </TapperMainContainerCard>
          <TapperMainContainerCard onClick={() => router.push(`/projects`)}>
            <TapperMainContainerCardTop>
              <div style={{ height: 35 }}>
                <Image src={ForestIcon} height={35} alt="" />
              </div>
            </TapperMainContainerCardTop>
            Рынок
          </TapperMainContainerCard>
          <TapperMainContainerCard
            onClick={() => {
              if (timeToNextMini.hours || timeToNextMini.minutes) {
                alert('Mini game is not available now. Check out later!');
                return;
              }
              router.push(`/tic-tac-toe`);
            }}
          >
            <TapperMainContainerCardTop>
              <div style={{ height: 35 }}>
                <Image src={GameIcon} height={27} alt="" />
              </div>
              <TapperMainContainerCardTopTime>
                {timeToNextMini.hours || timeToNextMini.minutes ? (
                  <TapperMainContainerCardTopTime>
                    {timeToNextMini.hours}h{timeToNextMini.minutes}m
                  </TapperMainContainerCardTopTime>
                ) : (
                  <TapperMainContainerCardTopTime></TapperMainContainerCardTopTime>
                )}
              </TapperMainContainerCardTopTime>
            </TapperMainContainerCardTop>
            Мини игра
          </TapperMainContainerCard>
        </TapperMainContainerCardContainer>
        <TapperMainContainerMoney>
          <CoinMax style={{ marginRight: 10 }} />{' '}
          {Math.floor(money).toLocaleString('ru-RU')}
        </TapperMainContainerMoney>
        <TapperMainContainerTapperContainer
          onTouchStart={(e) => handleTouchStart(e)}
        >
          <TapperMainContainerTapper />
          {coins.map((coin) => (
            <Coin
              alt=""
              height={32}
              src={CoinIcon}
              key={coin.id}
              style={{
                top: coin.y,
                left: coin.x,
              }}
            />
          ))}
        </TapperMainContainerTapperContainer>
      </TapperMainContainer>
      {typeof window !== 'undefined' && window.Telegram && (
        <GiftModal
          toggleDrawer={toggleDrawer}
          open={giftModalOpen}
          id={window.Telegram?.WebApp?.initDataUnsafe?.user?.id}
          gift={gifts[giftN]}
          refetch={refetch}
        />
      )}
      {typeof window !== 'undefined' && window.Telegram && (
        <RewardModal
          toggleDrawer={setDailyModalOpen}
          open={dailyModalOpen}
          id={window.Telegram?.WebApp?.initDataUnsafe?.user?.id}
          combo={combo}
          available={available}
          setMoney={setMoney}
          setAvailable={setAvailable}
          money={money}
          projects={projects}
        />
      )}
    </TapperContainer>
  );
};
