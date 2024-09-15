import { Tapper } from '@/components/Tapper/Tapper';

export default function Home(props: any) {
  const { from, open_reward, present, avatar } = props.searchParams;

  return (
    <Tapper from={from} openReward={open_reward === '1'} present={present} avatar={avatar} />
  );
}
