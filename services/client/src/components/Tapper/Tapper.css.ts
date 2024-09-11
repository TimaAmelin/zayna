import { Box, Button, ButtonBase, styled } from '@mui/material';

import tapper from '../../assets/tapper.png';

export const TapperContainer = styled(Box)(() => ({
    height: '100%',
    flex: 1,
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
}));

export const TapperStatisticsContainer = styled(Box)(() => ({
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const TapperStatistics = styled(Box)(() => ({
    backgroundColor: '#306A11',
    width: '100%',
    height: 36,
    margin: '0 15px',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}));

export const TapperStatisticsLeft = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
}));

export const TapperStatisticsCoinContainer = styled(Box)(() => ({
    margin: 7,
    height: 22,
    width: 22,
}));

export const TapperStatisticsProfitContainer = styled(Box)(() => ({
    marginTop: 7, 
    height: 22,
    color: '#fff',
}));

export const TapperStatisticsProfitTitleContainer = styled(Box)(() => ({
    fontSize: 7,
}));

export const TapperStatisticsProfitAmountContainer = styled(Box)(() => ({
    fontSize: 11,
}));

export const TapperStatisticsRight = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
}));

export const TapperStatisticsAvatar = styled(Box)(() => ({
    height: 20,
    width: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: '50%',
    overflow: 'hidden',
}));

export const TapperStatisticsName = styled(Box)(() => ({
    fontSize: 10,
    color: '#fff',
    fontWeight: 500,
    marginLeft: 5,
    marginRight: 15,
}));

export const TapperStatisticsSettingsLine = styled(Box)(() => ({
    height: 21,
    width: 1,
    backgroundColor: '#C2C5C0',
}));

export const TapperStatisticsSettingsContainer = styled(Box)(() => ({
    margin: 10,
    height: 16,
    width: 16,
}));

export const TapperMainContainer = styled(Box)(() => ({
    backgroundColor: '#1F1F2E',
    height: '85%',
    borderRadius: '10px 10px 0 0',
    boxShadow: '0px 0px 48.9px 0px #7ADA4699, 0 0 0 2px #7ADA46',
}));

export const TapperMainContainerCardContainer = styled(Box)(() => ({
    margin: '0 15px',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 37,
}));

export const TapperMainContainerCard = styled(Box)(() => ({
    backgroundColor: '#2E3342',
    width: '29%',
    height: 82,
    borderRadius: 5,
    padding: 10,
    boxSizing: 'border-box',
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
}));

export const TapperMainContainerCardTop = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
}));

export const TapperMainContainerCardTopTime = styled(Box)(() => ({
    fontSize: 10,
    color: '#ACACAC',
    fontWeight: 400,
}));

export const TapperMainContainerMoney = styled(Box)(() => ({
    fontSize: 26,
    color: '#fff',
    fontWeight: 900,
    marginTop: 37,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const TapperMainContainerTapperContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: 25,
}));

export const TapperMainContainerTapper = styled(Button)(() => ({
    height: 260,
    width: 260,
    backgroundImage: `url(${tapper.src})`,
    backgroundSize: '100%',
    border: '8px solid #fff',
    borderRadius: '50%',
}));