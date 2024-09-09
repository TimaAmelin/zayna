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

    const data = await response.json();

    return data
}
