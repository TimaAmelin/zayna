export const ticTacToe = async (
    board: number[][],
    id: number,
) => {
    const response = await fetch('/api/handlers/tic-tac-toe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board, id }),
    });

    try {
        const data = await response.json();

        return data
    } catch (error) {
        return {}
    }
}
