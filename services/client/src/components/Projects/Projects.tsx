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
import Image from 'next/image';
import { Box } from '@mui/material';
import { ProjectModal } from '../ProjectModal/ProjectModal';

import Ekstrennyenovosti1 from '../../assets/logos/ekstrennyenovosti1.svg';
import Kitenok from '../../assets/logos/kitenok.svg';
import Klimaticheskiyfond from '../../assets/logos/klimaticheskiyfond.svg';
import Lesnik from '../../assets/logos/lesnik.svg';
import Marsianskiykolonist from '../../assets/logos/marsianskiykolonist.svg';
import Meditsinskayamissiya from '../../assets/logos/meditsinskayamissiya.svg';
import Mirnoenastroenie from '../../assets/logos/mirnoenastroenie.svg';
import Mevidimyyzashchitnik from '../../assets/logos/nevidimyyzashchitnik.svg';
import Pandapatrul from '../../assets/logos/pandapatrul.svg';
import Planetaschastya from '../../assets/logos/planetaschastya.svg';
import Povelitelbur from '../../assets/logos/povelitelbur.svg';
import Poymaydzen from '../../assets/logos/poymaydzen.svg';
import Skorayapomoshch from '../../assets/logos/skorayapomoshch.svg';
import Solnechnayabatareya from '../../assets/logos/solnechnayabatareya.svg';
import Sportsportsport from '../../assets/logos/sportsportsport.svg';
import Terapiyadobra from '../../assets/logos/terapiyadobra.svg';
import Zaryadiakkumulyatory from '../../assets/logos/zaryadiakkumulyatory.svg';
import Zelenyydrug from '../../assets/logos/zelenyydrug.svg';
import Zelenyydzheday from '../../assets/logos/zelenyydzheday.svg';

// const logosObj = {
//   ekstrennyenovosti1,
//   kitenok,
//   klimaticheskiyfond,
//   lesnik,
//   marsianskiykolonist,
//   meditsinskayamissiya,
//   mirnoenastroenie,
//   nevidimyyzashchitnik,
//   pandapatrul,
//   planetaschastya,
//   povelitelbur,
//   poymaydzen,
//   skorayapomoshch,
//   solnechnayabatareya,
//   sportsportsport,
//   terapiyadobra,
//   zaryadiakkumulyatory,
//   zelenyydrug,
//   zelenyydzheday,
// }

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
                <Kitenok style={{height: 38}} />
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
