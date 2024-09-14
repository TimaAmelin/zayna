export const getPresents = async () => {
    const response = await fetch(`/api/handlers/get-presents/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return data
}
