import { Tasks } from '@/components/Tasks/Tasks';

export default function Home(props: any) {
  const { username, id } = props.searchParams;

  return (
    <Tasks id={id} username={username} />
  );
}
