export const getStock = async (id: number) => {
    const response = await fetch(`/api/handlers/get-stock/?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return data
}
