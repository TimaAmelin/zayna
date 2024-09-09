import { SettingsName } from '@/components/SettingsName/SettingsName';

export default function Home(props: any) {
  const { username, id } = props.searchParams;

  return (
    <SettingsName id={id} username={username} />
  );
}
