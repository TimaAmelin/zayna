import { TicTacToe } from '../../components/TicTacToe/TicTacToe';

export default function Home(props: any) {
  const { username, id } = props.searchParams;

  return (
    <TicTacToe id={id} username={username} />
  );
}
