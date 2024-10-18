'use client';
import {
  StocksCard,
  StocksCardContainer,
  StocksCardMainText,
  StocksCardSecondaryText,
  StocksCardTextsContainer,
  StocksContainer,
  StocksMainCardContainer,
  StocksSecondaryTextContainer,
  StocksTitleContainer,
} from './Stocks.css';
import { useRouter } from 'next/navigation';

import BinIcon from '../../assets/stocks/bin.png';
import BingIcon from '../../assets/stocks/bing.png';
import BitIcon from '../../assets/stocks/bit.png';
import BybIcon from '../../assets/stocks/byb.png';
import CryIcon from '../../assets/stocks/cry.png';
import GatIcon from '../../assets/stocks/gat.png';
import HtxIcon from '../../assets/stocks/htx.png';
import KucIcon from '../../assets/stocks/kuc.png';
import MexIcon from '../../assets/stocks/mex.png';
import OkxIcon from '../../assets/stocks/okx.png';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getStock } from '@/api/handlers/getStock';
import { Check } from '@mui/icons-material';
import { postStock } from '@/api/handlers/postStock';

export const Stocks = () => {
  const [stock, setStock] = useState<string>();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getUserMini = async () => {
        const res = await getStock(
          window.Telegram.WebApp.initDataUnsafe.user.id
        );
        return res;
      };

      getUserMini().then((data) => {
        setStock(data.response.stock);
      });
    }
  }, []);

  return (
    <StocksContainer>
      <StocksTitleContainer>Выбор обмена</StocksTitleContainer>
      <StocksCardContainer>
        <StocksCard
          onClick={async () => {
            if (typeof window !== 'undefined') {
              await postStock(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                'Bin'
              );
            }
            setStock('Bin');
          }}
        >
          <StocksMainCardContainer>
            <Box
              sx={{
                height: 32,
                width: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={BinIcon} alt="" width={32} />
            </Box>
            <StocksCardTextsContainer>
              <StocksCardMainText>Binance</StocksCardMainText>
            </StocksCardTextsContainer>
          </StocksMainCardContainer>
          {stock === 'Bin' && (
            <Box
              sx={{
                backgroundColor: '#85B960',
                height: 25,
                width: 25,
                padding: 0,
                '&:hover': { backgroundColor: '#85B960' },
                marginRight: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <Check sx={{ color: '#fff' }} />
            </Box>
          )}
        </StocksCard>
        <StocksCard
          onClick={async () => {
            if (typeof window !== 'undefined') {
              await postStock(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                'OKX'
              );
            }
            setStock('OKX');
          }}
        >
          <StocksMainCardContainer>
            <Box
              sx={{
                height: 32,
                width: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={OkxIcon} alt="" width={32} />
            </Box>
            <StocksCardTextsContainer>
              <StocksCardMainText>OKX</StocksCardMainText>
            </StocksCardTextsContainer>
          </StocksMainCardContainer>
          {stock === 'OKX' && (
            <Box
              sx={{
                backgroundColor: '#85B960',
                height: 25,
                width: 25,
                padding: 0,
                '&:hover': { backgroundColor: '#85B960' },
                marginRight: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <Check sx={{ color: '#fff' }} />
            </Box>
          )}
        </StocksCard>
        <StocksCard
          onClick={async () => {
            if (typeof window !== 'undefined') {
              await postStock(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                'Cry'
              );
            }
            setStock('Cry');
          }}
        >
          <StocksMainCardContainer>
            <Box
              sx={{
                height: 32,
                width: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={CryIcon} alt="" width={32} />
            </Box>
            <StocksCardTextsContainer>
              <StocksCardMainText>Crypto.com</StocksCardMainText>
            </StocksCardTextsContainer>
          </StocksMainCardContainer>
          {stock === 'Cry' && (
            <Box
              sx={{
                backgroundColor: '#85B960',
                height: 25,
                width: 25,
                padding: 0,
                '&:hover': { backgroundColor: '#85B960' },
                marginRight: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <Check sx={{ color: '#fff' }} />
            </Box>
          )}
        </StocksCard>
        <StocksCard
          onClick={async () => {
            if (typeof window !== 'undefined') {
              await postStock(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                'Byb'
              );
            }
            setStock('Byb');
          }}
        >
          <StocksMainCardContainer>
            <Box
              sx={{
                height: 32,
                width: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={BybIcon} alt="" width={32} />
            </Box>
            <StocksCardTextsContainer>
              <StocksCardMainText>Bybit</StocksCardMainText>
            </StocksCardTextsContainer>
          </StocksMainCardContainer>
          {stock === 'Byb' && (
            <Box
              sx={{
                backgroundColor: '#85B960',
                height: 25,
                width: 25,
                padding: 0,
                '&:hover': { backgroundColor: '#85B960' },
                marginRight: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <Check sx={{ color: '#fff' }} />
            </Box>
          )}
        </StocksCard>
        <StocksCard
          onClick={async () => {
            if (typeof window !== 'undefined') {
              await postStock(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                'MEX'
              );
            }
            setStock('MEX');
          }}
        >
          <StocksMainCardContainer>
            <Box
              sx={{
                height: 32,
                width: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={MexIcon} alt="" width={32} />
            </Box>
            <StocksCardTextsContainer>
              <StocksCardMainText>MEXC</StocksCardMainText>
            </StocksCardTextsContainer>
          </StocksMainCardContainer>
          {stock === 'MEX' && (
            <Box
              sx={{
                backgroundColor: '#85B960',
                height: 25,
                width: 25,
                padding: 0,
                '&:hover': { backgroundColor: '#85B960' },
                marginRight: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <Check sx={{ color: '#fff' }} />
            </Box>
          )}
        </StocksCard>
        <StocksCard
          onClick={async () => {
            if (typeof window !== 'undefined') {
              await postStock(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                'HTX'
              );
            }
            setStock('HTX');
          }}
        >
          <StocksMainCardContainer>
            <Box
              sx={{
                height: 32,
                width: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={HtxIcon} alt="" width={32} />
            </Box>
            <StocksCardTextsContainer>
              <StocksCardMainText>HTX</StocksCardMainText>
            </StocksCardTextsContainer>
          </StocksMainCardContainer>
          {stock === 'HTX' && (
            <Box
              sx={{
                backgroundColor: '#85B960',
                height: 25,
                width: 25,
                padding: 0,
                '&:hover': { backgroundColor: '#85B960' },
                marginRight: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <Check sx={{ color: '#fff' }} />
            </Box>
          )}
        </StocksCard>
        <StocksCard
          onClick={async () => {
            if (typeof window !== 'undefined') {
              await postStock(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                'Gat'
              );
            }
            setStock('Gat');
          }}
        >
          <StocksMainCardContainer>
            <Box
              sx={{
                height: 32,
                width: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={GatIcon} alt="" width={32} />
            </Box>
            <StocksCardTextsContainer>
              <StocksCardMainText>Gate.io</StocksCardMainText>
            </StocksCardTextsContainer>
          </StocksMainCardContainer>
          {stock === 'Gat' && (
            <Box
              sx={{
                backgroundColor: '#85B960',
                height: 25,
                width: 25,
                padding: 0,
                '&:hover': { backgroundColor: '#85B960' },
                marginRight: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <Check sx={{ color: '#fff' }} />
            </Box>
          )}
        </StocksCard>
        <StocksCard
          onClick={async () => {
            if (typeof window !== 'undefined') {
              await postStock(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                'Bit'
              );
            }
            setStock('Bit');
          }}
        >
          <StocksMainCardContainer>
            <Box
              sx={{
                height: 32,
                width: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={BitIcon} alt="" width={32} />
            </Box>
            <StocksCardTextsContainer>
              <StocksCardMainText>Bitget</StocksCardMainText>
            </StocksCardTextsContainer>
          </StocksMainCardContainer>
          {stock === 'Bit' && (
            <Box
              sx={{
                backgroundColor: '#85B960',
                height: 25,
                width: 25,
                padding: 0,
                '&:hover': { backgroundColor: '#85B960' },
                marginRight: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <Check sx={{ color: '#fff' }} />
            </Box>
          )}
        </StocksCard>
        <StocksCard
          onClick={async () => {
            if (typeof window !== 'undefined') {
              await postStock(
                window.Telegram.WebApp.initDataUnsafe.user.id,
                'Kuc'
              );
            }
            setStock('Kuc');
          }}
        >
          <StocksMainCardContainer>
            <Box
              sx={{
                height: 32,
                width: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={KucIcon} alt="" width={32} />
            </Box>
            <StocksCardTextsContainer>
              <StocksCardMainText>Kucoin</StocksCardMainText>
            </StocksCardTextsContainer>
          </StocksMainCardContainer>
          {stock === 'Kuc' && (
            <Box
              sx={{
                backgroundColor: '#85B960',
                height: 25,
                width: 25,
                padding: 0,
                '&:hover': { backgroundColor: '#85B960' },
                marginRight: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <Check sx={{ color: '#fff' }} />
            </Box>
          )}
        </StocksCard>
      </StocksCardContainer>
    </StocksContainer>
  );
};
