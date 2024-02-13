export const fetchAnimeMeta = async (animeName: string) => {
    const config = useRuntimeConfig();

    const response = await fetch(`${config['public'].metaApi}${animeName}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.results.length > 0) {
        const response2 = await fetch(`${config['public'].metaApi}info/${data.results[0].id}`);
        if (!response2.ok) {
            throw new Error('Network response was not ok');
        }
        const data2 = await response2.json();
        console.log(data2);
        return data2
    }
}