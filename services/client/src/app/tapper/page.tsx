import { Tapper } from '@/components/Tapper/Tapper';

export default function Home(props: any) {
  const { id } = props.searchParams;

  return (
    <Tapper id={id} />
  );
}
