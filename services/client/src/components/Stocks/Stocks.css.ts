import { Box, Button, styled } from '@mui/material';

export const StocksContainer = styled(Box)(() => ({
    backgroundColor: '#1F1F2E',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const StocksTitleContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    color: '#fff',
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 30,
}));

export const StocksCardContainer = styled(Box)(() => ({
    width: '90%',
    overflowY: 'auto',
}));

export const StocksCard = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: '#2E3342',
    width: '100%',
    height: 74,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    boxSizing: 'border-box',
}));

export const StocksMainCardContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
}));

export const StocksCardTextsContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
}));

export const StocksCardMainText = styled(Box)(() => ({

}));

export const StocksCardSecondaryText = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
}));

export const StocksSecondaryTextContainer = styled(Box)(() => ({
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    color: '#fff',
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 5,
    marginTop: 30,
}));

export const StocksButton = styled(Button)(() => ({
    borderRadius: 12,
    height: 60,
    width: '90%',
    backgroundColor: '#7ADA46',
    color: '#000',
    fontSize: 16,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    '&:hover': {
        backgroundColor: '#fff',
    },
    textTransform: 'none',
    margin: 40,
    zIndex: 3,
}));