'use client';
import { useEffect, useState } from 'react';
import {
  ProjectsContainer,
  ProjectsMainContainer,
  ProjectsMainContainerCard,
  ProjectsMainContainerCardBottom,
  ProjectsMainContainerCardBottomCost,
  ProjectsMainContainerCardBottomLvl,
  ProjectsMainContainerCardDescription,
  ProjectsMainContainerCardProfit,
  ProjectsMainContainerCardRow,
  ProjectsMainContainerCardTitle,
  ProjectsMainContainerMoney,
  ProjectsMainContainerTypeButton,
  ProjectsMainContainerTypeRow,
  ProjectsStatisticsContainer,
  ProjectsStatistics,
  ProjectsStatisticsCoinContainer,
  ProjectsStatisticsProfitContainer,
  ProjectsStatisticsProfitTitleContainer,
  ProjectsStatisticsProfitAmountContainer,
  ProjectsStatisticsLeft,
  ProjectsStatisticsRight,
  ProjectsStatisticsAvatar,
  ProjectsStatisticsSettingsContainer,
  ProjectsStatisticsSettingsLine,
  ProjectsStatisticsName,
} from './Projects.css';

import { getProjects } from '@/api/handlers/getProjects';
import { getTokens } from '@/api/handlers/getTokens';

import CoinMin from '../../assets/icons/coin_min.svg';
import CoinIcon from '../../assets/icons/coin_big.png';
import IIcon from '../../assets/icons/i.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import CoinMax from '../../assets/icons/coin_max.svg';

import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import { Box } from '@mui/material';
import { ProjectModal } from '../ProjectModal/ProjectModal';

import gymMembership from '../../assets/logos/gymMembership.png';
import peakPromotions from '../../assets/logos/peakPromotions.png';
import tenantDifference from '../../assets/logos/tenantDifference.png';
import businessLunchOrFastFood from '../../assets/logos/businessLunchOrFastFood.png';
import bioenergy from '../../assets/logos/bioenergy.png';
import hospitalChains from '../../assets/logos/hospitalChains.png';
import worldOwner from '../../assets/logos/worldOwner.png';
import renewableEnergyGuru from '../../assets/logos/renewableEnergyGuru.png';
import houseAbroad from '../../assets/logos/houseAbroad.png';
import expensiveHobbies from '../../assets/logos/expensiveHobbies.png';
import creativityLaunch from '../../assets/logos/creativityLaunch.png';
import charismaBoost from '../../assets/logos/charismaBoost.png';
import starRealEstate from '../../assets/logos/starRealEstate.png';
import greenBonds from '../../assets/logos/greenBonds.png';
import greenDeveloper from '../../assets/logos/greenDeveloper.png';
import insiderDeal from '../../assets/logos/insiderDeal.png';
import profitableAI from '../../assets/logos/profitableAI.png';
import marketCorrection from '../../assets/logos/marketCorrection.png';
import pyramidCollapse from '../../assets/logos/pyramidCollapse.png';
import cryptoEnergy from '../../assets/logos/cryptoEnergy.png';
import loftAttic from '../../assets/logos/loftAttic.png';
import morningMagic from '../../assets/logos/morningMagic.png';
import repairMasters from '../../assets/logos/repairMasters.png';
import medicalBreakthrough from '../../assets/logos/medicalBreakthrough.png';
import powerfulComputer from '../../assets/logos/powerfulComputer.png';
import officeInBusinessCenter from '../../assets/logos/officeInBusinessCenter.png';
import plasticRecycling from '../../assets/logos/plasticRecycling.png';
import holidayGifts from '../../assets/logos/holidayGifts.png';
import findZen from '../../assets/logos/findZen.png';
import dreamTrip from '../../assets/logos/dreamTrip.png';
import turnkeyRepair from '../../assets/logos/turnkeyRepair.png';
import toughChoice from '../../assets/logos/toughChoice.png';
import surprisesOfOldHouse from '../../assets/logos/surprisesOfOldHouse.png';
import morningRitual from '../../assets/logos/morningRitual.png';
import financialTurbulence from '../../assets/logos/financialTurbulence.png';
import repairCost from '../../assets/logos/repairCost.png';
import eliteDeveloper from '../../assets/logos/eliteDeveloper.png';
import energyCollapse from '../../assets/logos/energyCollapse.png';
import joyEnergy from '../../assets/logos/joyEnergy.png';


const logos: {[x: string]: StaticImageData} = {
  'Абонемент в спортзал': gymMembership,
  'Акции на пике': peakPromotions,
  'Арендатор арендатору рознь': tenantDifference,
  'Бизнес-ланч или фаст-фуд': businessLunchOrFastFood,
  'Биоэнергетика': bioenergy,
  'Больничные сети': hospitalChains,
  'Владелец мира': worldOwner,
  'Гуру возобновляемой энергии': renewableEnergyGuru,
  'Дом за границей': houseAbroad,
  'Дорогие увлечения': expensiveHobbies,
  'Запуск творчества': creativityLaunch,
  'Заряд харизмы': charismaBoost,
  'Звездная недвижимость': starRealEstate,
  'Зелёные облигации': greenBonds,
  'Зеленый девелопер': greenDeveloper,
  'Инсайдерская cделка': insiderDeal,
  'Искусственный_интеллект_это_выгодно': profitableAI,
  'Коррекция рынка': marketCorrection,
  'Крах пирамиды': pyramidCollapse,
  'Криптоэнергетика': cryptoEnergy,
  'Лофт на чердаке': loftAttic,
  'Магия утра': morningMagic,
  'Мастер ремонта': repairMasters,
  'Медицинский прорыв': medicalBreakthrough,
  'Мощный компьютер': powerfulComputer,
  'Офис в бизнес-центре': officeInBusinessCenter,
  'Переработка пластика': plasticRecycling,
  'Подарки на праздники': holidayGifts,
  'Поймай дзен': findZen,
  'Путешествие мечты': dreamTrip,
  'Ремонт под ключ': turnkeyRepair,
  'Сложный выбор': toughChoice,
  'Сюрпризы старинного дома': surprisesOfOldHouse,
  'Утренний ритуал': morningRitual,
  'Финансовая турбулентность': financialTurbulence,
  'Цена ремонта': repairCost,
  'Элитный застройщик': eliteDeveloper,
  'Энергетический коллапс': energyCollapse,
  'Энергия радости': joyEnergy,
};


export const Projects = () => {
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

  const [money, setMoney] = useState(0);
  const [moneyPerHour, setMoneyPerHour] = useState(0);

  const [type, setType] = useState('Рынок');

  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(projects[0]);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getUserProjects = async () => {
        const res = await getProjects(
          window.Telegram.WebApp.initDataUnsafe.user.id
        );
        return res;
      };

      getUserProjects().then((data) => {
        setProjects(data.response.projects);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getUserTokens = async () => {
        const res = await getTokens(
          Number(window.Telegram.WebApp.initDataUnsafe.user.id)
        );
        return res;
      };

      getUserTokens().then((data) => {
        setMoney(data.response.sum);
        setMoneyPerHour(data.response.income ?? 0);
      });
    }
  }, []);

  async function updateProjects() {
    if (typeof window !== 'undefined') {
      const data = await getProjects(
        window.Telegram.WebApp.initDataUnsafe.user.id
      );
      setProjects(data.response.projects);
    }
  }

  return (
    <ProjectsContainer>
      <ProjectsStatisticsContainer>
        <ProjectsStatistics>
          <ProjectsStatisticsLeft>
            <ProjectsStatisticsCoinContainer>
              <CoinMin />
            </ProjectsStatisticsCoinContainer>
            <ProjectsStatisticsProfitContainer>
              <ProjectsStatisticsProfitTitleContainer>
                Прибыль в час
              </ProjectsStatisticsProfitTitleContainer>
              <ProjectsStatisticsProfitAmountContainer>
                +{moneyPerHour} <IIcon />
              </ProjectsStatisticsProfitAmountContainer>
            </ProjectsStatisticsProfitContainer>
          </ProjectsStatisticsLeft>
          <ProjectsStatisticsRight>
            <ProjectsStatisticsAvatar />
            {typeof window !== 'undefined' && (
              <ProjectsStatisticsName>
                {window.Telegram.WebApp.initDataUnsafe.user.username}
              </ProjectsStatisticsName>
            )}
            <ProjectsStatisticsSettingsLine />
            <ProjectsStatisticsSettingsContainer
              onClick={() => router.push(`/settings`)}
            >
              <SettingsIcon />
            </ProjectsStatisticsSettingsContainer>
          </ProjectsStatisticsRight>
        </ProjectsStatistics>
      </ProjectsStatisticsContainer>
      <ProjectsMainContainer>
        <ProjectsMainContainerMoney>
          <CoinMax style={{ marginRight: 10 }} />{' '}
          {money.toLocaleString('ru-RU')}
        </ProjectsMainContainerMoney>
        <ProjectsMainContainerTypeRow>
          <ProjectsMainContainerTypeButton
            sx={{ backgroundColor: type === 'Рынок' ? '#306A11' : 'none' }}
            onClick={() => setType('Рынок')}
          >
            Рынок
          </ProjectsMainContainerTypeButton>
          <ProjectsMainContainerTypeButton
            sx={{ backgroundColor: type === 'Недвижимость' ? '#306A11' : 'none' }}
            onClick={() => setType('Недвижимость')}
          >
            Недвижимость
          </ProjectsMainContainerTypeButton>
          <ProjectsMainContainerTypeButton
            sx={{ backgroundColor: type === 'Энергия' ? '#306A11' : 'none' }}
            onClick={() => setType('Энергия')}
          >
            Энергия
          </ProjectsMainContainerTypeButton>
          <ProjectsMainContainerTypeButton
            sx={{ backgroundColor: type === 'Затраты' ? '#306A11' : 'none' }}
            onClick={() => setType('Затраты')}
          >
            Затраты
          </ProjectsMainContainerTypeButton>
        </ProjectsMainContainerTypeRow>
        <ProjectsMainContainerCardRow>
          {projects
            .filter((project) => project.mode === type)
            .map((project, index) => (
              <ProjectsMainContainerCard
                key={index}
                onClick={() => {
                  setProject(project);
                  setOpen(true);
                }}
              >
                <Image alt="" src={logos[project.logo[0].toUpperCase() + project.logo.slice(1).toLowerCase()]} style={{height: 38, maxWidth: 38}} />
                <ProjectsMainContainerCardTitle>
                  {project.name}
                </ProjectsMainContainerCardTitle>
                <ProjectsMainContainerCardDescription>
                  {project.description}
                </ProjectsMainContainerCardDescription>
                <ProjectsMainContainerCardProfit>
                  Прибыль в час
                  <br />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={CoinIcon}
                      alt=""
                      height={12}
                      style={{ marginRight: 3 }}
                    />{' '}
                    + {project.profit}
                  </Box>
                </ProjectsMainContainerCardProfit>
                <ProjectsMainContainerCardBottom>
                  <ProjectsMainContainerCardBottomLvl>
                    уровень {project.level}
                  </ProjectsMainContainerCardBottomLvl>
                  <ProjectsMainContainerCardBottomCost>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Image
                        src={CoinIcon}
                        alt=""
                        height={15}
                        style={{ marginRight: 3 }}
                      />{' '}
                      {project.cost}
                    </Box>
                  </ProjectsMainContainerCardBottomCost>
                </ProjectsMainContainerCardBottom>
              </ProjectsMainContainerCard>
            ))}
        </ProjectsMainContainerCardRow>
      </ProjectsMainContainer>
      {typeof window !== 'undefined' && (
        <ProjectModal
          id={window.Telegram.WebApp.initDataUnsafe.user.id}
          project={project}
          open={open}
          toggleDrawer={setOpen}
          currentMoney={money}
          setCurrentMoney={setMoney}
          setMoneyPerHour={setMoneyPerHour}
          updateProjects={updateProjects}
        />
      )}
    </ProjectsContainer>
  );
};
