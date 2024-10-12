export const getPresents = async () => {
    const response = await fetch(`/api/handlers/get-presents/`, {
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
