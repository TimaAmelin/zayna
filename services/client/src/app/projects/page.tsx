import { Projects } from '@/components/Projects/Projects';

export default function Home(props: any) {
  const { username, id } = props.searchParams;

  return (
    <Projects id={id} username={username} />
  );
}
