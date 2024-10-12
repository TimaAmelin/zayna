export const changeName = async (id: number, name: string) => {
    const response = await fetch(`/api/handlers/change-name/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            name,
        })
    });

    try {
        const data = await response.json();

        return data
    } catch (error) {
        return {}
    }
}
