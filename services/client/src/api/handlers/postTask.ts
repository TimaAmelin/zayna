export const postTask = async (
    id: number,
    task: string,
) => {
    const response = await fetch(`/api/handlers/post-task/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, task }),
    });

    const data = await response.json();

    return data
}
