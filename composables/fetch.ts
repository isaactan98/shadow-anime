export const fetchAnimeMeta = async (animeName: string) => {
    const config = useRuntimeConfig();

    const response = await fetch(`${config['public'].metaApi}search/${animeName}?page=1`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.results.length > 0) {
        const response2 = await fetch(`${config['public'].metaApi}info/${data.results[0].id}?provider=zoro`);
        if (!response2.ok) {
            throw new Error('Network response was not ok');
        }
        const data2 = await response2.json();
        console.log(data2);
        return data2
    }
}

export const getAnimeInfo = async (animeId: string) => {
    const config = useRuntimeConfig();
    const response = await fetch(`${config['public'].metaApi}info/${animeId}?provider=zoro`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data);
    return data;
}

export const aniWatchSlider = async () => {
    const config = useRuntimeConfig();
    const response = await fetch(config['public'].corsApi + 'https://aniwatch.to/home');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const slider = doc.querySelector('.swiper-wrapper');
    const items = slider?.querySelectorAll('.swiper-slide');
    const result = [] as any[];
    items?.forEach((item) => {
        const img = item.querySelector('img')?.getAttribute('data-src');
        const title = item.querySelector('.desi-head-title');
        const link = item.querySelector('a');
        const description = item.querySelector('.desi-description');
        result.push({
            img: img,
            title: title?.textContent,
            link: link?.getAttribute('href')?.split('watch/')[1],
            description: description?.textContent
        });
    });
    console.log(result);
    return result;
}