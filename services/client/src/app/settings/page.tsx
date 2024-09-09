import { Settings } from '@/components/Settings/Settings';

export default function Home(props: any) {
  const { username, id } = props.searchParams;

  return (
    <Settings id={id} username={username} />
  );
}
