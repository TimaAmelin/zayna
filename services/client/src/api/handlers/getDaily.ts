export const getDaily = async (id: number) => {
    const response = await fetch(`/api/handlers/get-daily?id=${id}`, {
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
