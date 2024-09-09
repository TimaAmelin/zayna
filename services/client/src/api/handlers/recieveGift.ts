export const recieveGift = async (id: number, giftId: number) => {
    const response = await fetch(`/api/handlers/recieve-gift/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            giftId,
        })
    });

    const data = await response.json();

    return data
}
