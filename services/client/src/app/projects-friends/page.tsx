import { ProjectsFriends } from '@/components/ProjectsFriends/ProjectsFriends';

export default function Home(props: any) {
  const { username, id } = props.searchParams;

  return (
    <ProjectsFriends id={id} username={username} />
  );
}
