export const fetchAnimeMeta = async (animeName: string) => {
    const config = useRuntimeConfig();

    const response = await fetch(`${config['public'].metaApi}search/${animeName}?page=1`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.results.length > 0) {
        const response2 = await fetch(`${config['public'].metaApi}info/${data.results[0].id}?provider=gogoanime`);
        if (!response2.ok) {
            throw new Error('Network response was not ok');
        }
        const data2 = await response2.json();
        // console.log(data2);
        return data2
    }
}

export const getAnimeInfo = async (animeId: string) => {
    const config = useRuntimeConfig();
    const response = await fetch(`${config['public'].metaApi}info/${animeId}?provider=gogoanime`);
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
    // console.log(result);
    return result;
}

export const anilistTrendingSlider = async () => {
    const config = useRuntimeConfig();
    const response = await fetch(config['public'].metaApi + 'trending');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data);
    return data.results;
}

export const anilistRecentReleases = async () => {
    const config = useRuntimeConfig();
    const response = await fetch(config['public'].metaApi + 'recent-episodes');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data);
    return data.results;
}

// airing-schedule
export const anilistAiringSchedule = async () => {
    const config = useRuntimeConfig();
    const response = await fetch(config['public'].metaApi + 'airing-schedule');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data);
    return data.results;
}

export const findAnilistTmdb = async (data: any) => {
    const mapping = data.mappings.find((mapping: any) => mapping.providerId === 'tmdb');
    // console.log(mapping, mapping.id.split('/tv/')[1]);
    if (mapping == null) return null;

    const config = useRuntimeConfig();
    const res = await fetch(`${config['public'].tmdbApi}info/${mapping.id.split('/tv/')[1]}?type=tv`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
    })

    return res;
}

const imgPath = "https://image.tmdb.org/t/p/original" as string;

export const getTmdbSeasonEpisodes = async (id: string, season: number) => {
    const config = useRuntimeConfig();
    let response = await fetch(`${config['public'].tmdbApi}season/${id}/${season}?type=tv`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
    if (response) {
        response = response;
        response.episodes.forEach((episode: any) => {
            episode.image = `${imgPath}${episode.still_path}`;
        });
    }
    return response;
}

export const getTodayStream = async () => {
    let lists = [] as any[]
    const date = {} as any;
    let fullDate = new Date();

    var today = new Date();
    fullDate = today;
    var dd = date.day = String(today.getDate()).padStart(2, '0');
    var mm = date.month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.year = today.getFullYear();

    date.month = fullDate.toLocaleString('default', { month: 'long' })
    let config = useRuntimeConfig();

    // let testUrl = "https://aniwatch.to/ajax/schedule/list?tzOffset=-480&date=2023-07-06"
    let testUrl = "https://aniwatch.to/ajax/schedule/list?tzOffset=-480&date=" + yyyy + '-' + mm + '-' + dd

    await fetch(config['public'].corsApi + testUrl)
        .then((res) => res.json()).then((html) => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html.html, "text/html");
            var result = doc.querySelectorAll(".tsl-link");
            result.forEach((item: any, index) => {
                // console.log("item", item);
                if (lists[index] === undefined) {
                    lists[index] = {};
                }
                lists[index].title = item.querySelector(".dynamic-name").innerText;
                lists[index].time = item.querySelector(".time")?.innerText;
                lists[index].episode = item.querySelector(".btn-play")?.innerText;
            });
            // console.log("lists", lists);
        }).catch((err) => {
            console.log("Error: ", err);
        })

    return lists;
}

export const searchGogoanime = async (query: string) => {
    const config = useRuntimeConfig();
    const response = await fetch(`${config['public'].apiUrl}search/${query}?page=1`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}