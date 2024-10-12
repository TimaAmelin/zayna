export const postStock = async (
    id: number,
    stock: string,
) => {
    const response = await fetch(`/api/handlers/post-stock/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, stock }),
    });

    try {
        const data = await response.json();

        return data
    } catch (error) {
        return {}
    }
}
