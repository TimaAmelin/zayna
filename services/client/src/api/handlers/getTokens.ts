export const getTokens = async (
    id: number,
) => {
    const response = await fetch(`/api/handlers/get-tokens?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return data
}
