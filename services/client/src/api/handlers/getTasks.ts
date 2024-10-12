export const getTasks = async (id: number) => {
    const response = await fetch(`/api/handlers/get-tasks/?id=${id}`, {
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
