export const getProjects = async () => {
    const response = await fetch(`/api/handlers/get-projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return data
}
