export const getFriends = async (id: number) => {
    const response = await fetch(`/api/handlers/get-friends?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    try {
        const data = await response.json();

        return data
    } catch (error) {
        return {}
    }
}
