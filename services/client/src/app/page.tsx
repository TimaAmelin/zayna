import { DummyWithInvite } from '@/components/DummyWithInvite/DummyWithInvite';

export default function Home(props: any) {
  const { username, id, from, first_time } = props.searchParams;

  return (
    <DummyWithInvite username={username} id={id} from={from} tgLogin={process.env.TG_LOGIN ?? ''} firstTime={first_time} />
  );
}
