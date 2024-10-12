export const deleteAccount = async (id: number) => {
    const response = await fetch(`/api/handlers/delete-account?id=${id}`, {
        method: 'DELETE',
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
