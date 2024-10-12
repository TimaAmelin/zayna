export const sendGift = async (
    id: number,
    projectId: number,
    recieverId?: number,
) => {
    const response = await fetch('/api/handlers/send-gift', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, projectId, recieverId }),
    });

    try {
        const data = await response.json();

        return data
    } catch (error) {
        return {}
    }
}
