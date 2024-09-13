import { Stocks } from '@/components/Stocks/Stocks';

export default function Home(props: any) {
  const { username, id } = props.searchParams;

  return (
    <Stocks id={id} username={username} />
  );
}
