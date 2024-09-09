import { Friends } from '@/components/Friends/Friends';

export default function Home(props: any) {
  const { username, id } = props.searchParams;

  return (
    <Friends id={id} username={username} tgLogin={process.env.TG_LOGIN ?? ''} />
  );
}
