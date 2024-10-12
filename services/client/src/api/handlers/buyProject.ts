export const buyProject = async (
    id: number,
    projectId: number,
) => {
    const response = await fetch('/api/handlers/buy-project', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, projectId }),
    });

    try {
        const data = await response.json();

        return data
    } catch (error) {
        return {}
    }
}
