import { Tapper } from '@/components/Tapper/Tapper';

export default function Home(props: any) {
  const { username, id, from, first_time } = props.searchParams;

  return (
    <Tapper id={id} username={username} from={from} />
  );
}
