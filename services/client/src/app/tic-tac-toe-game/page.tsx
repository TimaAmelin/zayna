import { TicTacToeGame } from '../../components/TicTacToeGame/TicTacToeGame';

export default function Home(props: any) {
  const { username, id } = props.searchParams;

  return (
    <TicTacToeGame id={id} username={username} />
  );
}
