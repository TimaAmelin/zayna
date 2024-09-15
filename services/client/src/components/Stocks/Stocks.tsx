'use client';
import { StocksCard, StocksCardContainer, StocksCardMainText, StocksCardSecondaryText, StocksCardTextsContainer, StocksContainer, StocksMainCardContainer, StocksSecondaryTextContainer, StocksTitleContainer } from './Stocks.css';
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

export const Stocks = () => {
    const router = useRouter();
    return (
        <StocksContainer>
            <StocksTitleContainer>
                Exchange selection
            </StocksTitleContainer>
            <StocksCardContainer>
                <StocksCard>
                    <StocksMainCardContainer>
                        <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image src={BinIcon} alt="" width={32} />
                        </Box>
                        <StocksCardTextsContainer>
                            <StocksCardMainText>
                                Binance
                            </StocksCardMainText>
                        </StocksCardTextsContainer>
                    </StocksMainCardContainer>
                </StocksCard>
                <StocksCard>
                    <StocksMainCardContainer>
                        <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image src={OkxIcon} alt="" width={32} />
                        </Box>
                        <StocksCardTextsContainer>
                            <StocksCardMainText>
                                OKX
                            </StocksCardMainText>
                        </StocksCardTextsContainer>
                    </StocksMainCardContainer>
                </StocksCard>
                <StocksCard>
                    <StocksMainCardContainer>
                        <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image src={CryIcon} alt="" width={32} />
                        </Box>
                        <StocksCardTextsContainer>
                            <StocksCardMainText>
                                Crypto.com
                            </StocksCardMainText>
                        </StocksCardTextsContainer>
                    </StocksMainCardContainer>
                </StocksCard>
                <StocksCard>
                    <StocksMainCardContainer>
                        <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image src={BybIcon} alt="" width={32} />
                        </Box>
                        <StocksCardTextsContainer>
                            <StocksCardMainText>
                                Bybit
                            </StocksCardMainText>
                        </StocksCardTextsContainer>
                    </StocksMainCardContainer>
                </StocksCard>
                <StocksCard>
                    <StocksMainCardContainer>
                        <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image src={MexIcon} alt="" width={32} />
                        </Box>
                        <StocksCardTextsContainer>
                            <StocksCardMainText>
                                MEXC
                            </StocksCardMainText>
                        </StocksCardTextsContainer>
                    </StocksMainCardContainer>
                </StocksCard>
                <StocksCard>
                    <StocksMainCardContainer>
                        <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image src={HtxIcon} alt="" width={32} />
                        </Box>
                        <StocksCardTextsContainer>
                            <StocksCardMainText>
                                HTX
                            </StocksCardMainText>
                        </StocksCardTextsContainer>
                    </StocksMainCardContainer>
                </StocksCard>
                <StocksCard>
                    <StocksMainCardContainer>
                        <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image src={GatIcon} alt="" width={32} />
                        </Box>
                        <StocksCardTextsContainer>
                            <StocksCardMainText>
                                Gate.io
                            </StocksCardMainText>
                        </StocksCardTextsContainer>
                    </StocksMainCardContainer>
                </StocksCard>
                <StocksCard>
                    <StocksMainCardContainer>
                        <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image src={BitIcon} alt="" width={32} />
                        </Box>
                        <StocksCardTextsContainer>
                            <StocksCardMainText>
                                Bitget
                            </StocksCardMainText>
                        </StocksCardTextsContainer>
                    </StocksMainCardContainer>
                </StocksCard>
                <StocksCard>
                    <StocksMainCardContainer>
                        <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image src={KucIcon} alt="" width={32} />
                        </Box>
                        <StocksCardTextsContainer>
                            <StocksCardMainText>
                                Kucoin
                            </StocksCardMainText>
                        </StocksCardTextsContainer>
                    </StocksMainCardContainer>
                </StocksCard>
                <StocksCard>
                    <StocksMainCardContainer>
                        <Box sx={{height: 32, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image src={BinIcon} alt="" height={32} />
                        </Box>
                        <StocksCardTextsContainer>
                            <StocksCardMainText>
                                Binance
                            </StocksCardMainText>
                        </StocksCardTextsContainer>
                    </StocksMainCardContainer>
                </StocksCard>
            </StocksCardContainer>
        </StocksContainer>
    )
}