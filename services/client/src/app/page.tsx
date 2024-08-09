// import { Dummy } from '@/components/Dummy/Dummy';
import { DummyWithInvite } from '@/components/DummyWithInvite/DummyWithInvite';

export default function Home(props: any) {
  const {username, id, from} = props.searchParams;

  return (
    <DummyWithInvite username={username} id={id} from={from} tgLogin={process.env.TG_LOGIN ?? ''} />
  );
}
