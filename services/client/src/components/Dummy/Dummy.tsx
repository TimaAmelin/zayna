import React from 'react';
import { DummyContainer, DummyContentContainer, DummyHeader, DummySocial, DummySocialContainer, DummySubHeader, DummyText } from './Dummy.css';
import Image from 'next/image';
import insta from '../../assets/social/insta.png';
import tg from '../../assets/social/tg.png';
import tiktok from '../../assets/social/tiktok.png';
import x from '../../assets/social/x.png';
import yt from '../../assets/social/yt.png';

export const Dummy = () => {
    return (
        <DummyContainer>
            <DummyContentContainer>
                <DummyHeader>
                    Zayna Token
                </DummyHeader>
                <DummySubHeader>
                    will be launched Soon
                </DummySubHeader>
                <DummyText>
                    Stay tuned
                </DummyText>
                <DummyText>
                    More info in official channels
                </DummyText>
                <DummySocialContainer>
                    <DummySocial>
                        <Image alt="Instagrm" src={insta} width={36} height={36} />
                    </DummySocial>
                    <DummySocial>
                        <Image alt="Telegram" src={tg} width={36} height={36} />
                    </DummySocial>
                    <DummySocial>
                        <Image alt="TikTok" src={tiktok} width={36} height={36} />
                    </DummySocial>
                    <DummySocial>
                        <Image alt="X" src={x} width={36} height={36} />
                    </DummySocial>
                    <DummySocial>
                        <Image alt="YouTube" src={yt} width={36} height={36} />
                    </DummySocial>
                </DummySocialContainer>
            </DummyContentContainer>
        </DummyContainer>
    )
}