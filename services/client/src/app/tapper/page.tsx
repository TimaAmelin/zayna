import { Tapper } from '@/components/Tapper/Tapper';

export default function Home(props: any) {
  const { username, id, from, open_reward, present } = props.searchParams;

  return (
    <Tapper id={id} username={username} from={from} openReward={open_reward === '1'} present={present} />
  );
}
