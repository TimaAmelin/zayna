import { Box, Button, styled } from '@mui/material';

export const ProjectsContainer = styled(Box)(() => ({
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
}));

export const ProjectsStatisticsContainer = styled(Box)(() => ({
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const ProjectsStatistics = styled(Box)(() => ({
    backgroundColor: '#306A11',
    width: '100%',
    height: 36,
    margin: '0 15px',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}));

export const ProjectsStatisticsLeft = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
}));

export const ProjectsStatisticsCoinContainer = styled(Box)(() => ({
    margin: 7,
    height: 22,
    width: 22,
}));

export const ProjectsStatisticsProfitContainer = styled(Box)(() => ({
    marginTop: 7, 
    height: 22,
    color: '#fff',
}));

export const ProjectsStatisticsProfitTitleContainer = styled(Box)(() => ({
    fontSize: 7,
}));

export const ProjectsStatisticsProfitAmountContainer = styled(Box)(() => ({
    fontSize: 11,
}));

export const ProjectsStatisticsRight = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
}));

export const ProjectsStatisticsAvatar = styled(Box)(() => ({
    height: 20,
    width: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: '50%',
}));

export const ProjectsStatisticsName = styled(Box)(() => ({
    fontSize: 10,
    color: '#fff',
    fontWeight: 500,
    marginLeft: 5,
    marginRight: 15,
}));

export const ProjectsStatisticsSettingsLine = styled(Box)(() => ({
    height: 21,
    width: 1,
    backgroundColor: '#C2C5C0',
}));

export const ProjectsStatisticsSettingsContainer = styled(Box)(() => ({
    margin: 10,
    height: 16,
    width: 16,
}));

export const ProjectsMainContainer = styled(Box)(() => ({
    backgroundColor: '#1F1F2E',
    width: '100%',
    height: '85%',
    borderRadius: '10px 10px 0 0',
    boxShadow: '0px 0px 48.9px 0px #7ADA4699, 0 0 0 2px #7ADA46',
}));

export const ProjectsMainContainerMoney = styled(Box)(() => ({
    fontSize: 26,
    color: '#fff',
    fontWeight: 900,
    marginTop: 37,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const ProjectsMainContainerTypeRow = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 20,
}));

export const ProjectsMainContainerTypeButton = styled(Button)(() => ({
    border: '1px solid #306A11',
    height: 23,
    color: '#fff',
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#306A11'
    }
}));

export const ProjectsMainContainerCardRow = styled(Box)(() => ({
    height: '70%',
    borderRadius: 5,
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    margin: '20px 0',
    overflowY: 'auto',
    marginBottom: 100,
    width: '100%',
}));

export const ProjectsMainContainerCard = styled(Box)(() => ({
    backgroundColor: '#2E3342',
    width: '45%',
    height: 167,
    borderRadius: 17,
    padding: 10,
    boxSizing: 'border-box',
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    marginLeft: '3.33%',
    float: 'left',
    marginTop: 10,
}));

export const ProjectsMainContainerCardTitle = styled(Box)(() => ({
    fontSize: 12,
    fontWeight: 700,
    color: '#fff',
    height: 30,
}));

export const ProjectsMainContainerCardDescription = styled(Box)(() => ({
    fontSize: 10,
    fontWeight: 500,
    color: '#fff',
    marginBottom: 10,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}));

export const ProjectsMainContainerCardProfit = styled(Box)(() => ({
    fontSize: 9,
    fontWeight: 400,
    color: '#CDCDCD',
    marginBottom: 10,
}));

export const ProjectsMainContainerCardBottom = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

export const ProjectsMainContainerCardBottomLvl = styled(Box)(() => ({
    fontSize: 10,
    fontWeight: 500,
    color: '#CDCDCD',
}));

export const ProjectsMainContainerCardBottomCost = styled(Box)(() => ({
    fontSize: 10,
    fontWeight: 500,
    color: '#fff',
}));
