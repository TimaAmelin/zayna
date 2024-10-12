export const putUser = async (
    id: number,
    username?: string,
    from?: number,
    avatar?: string,
) => {
    const response = await fetch('/api/handlers/put-user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, username, from, avatar }),
    });

    try {
        const data = await response.json();

        return data
    } catch (error) {
        return {}
    }
}
