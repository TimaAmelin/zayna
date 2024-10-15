import { Friends } from '@/components/Friends/Friends';

export default function Home(props: any) {
  return (
    <Friends tgLogin={process.env.TG_LOGIN ?? 'zayna_eco_bot'} />
  );
}
