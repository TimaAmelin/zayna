export const putTokenBatch = async (
    id: number,
    tokensPerHalfSecond: number,
) => {
    const response = await fetch('/api/handlers/put-token-batch', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, tokensPerHalfSecond }),
    });

    const data = await response.json();

    return data
}
