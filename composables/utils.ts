export const getAnimeId = (anime: any) => {
    let result = '';
    // check if anime has mappings key 
    if (anime.mappings) {
        // check if mappings has gogoanime key
        const gogoanime = anime.mappings.find((mapping: any) => mapping.providerId === 'gogoanime');
        // console.log("is gogoanime ", gogoanime);
        if (gogoanime) {
            // return the gogoanime id
            result = gogoanime.id.split('category/')[1];
        }
    }
    // if no gogoanime id is found, check for episode mappings
    else if (anime.episodes) {
        // check if episodes has gogoanime key
        if (anime.episodes.length > 0) {
            const gogoanime = anime.episodes[0].id.split('-episode')[0]
            if (gogoanime) {
                // return the gogoanime id
                result = gogoanime
            }
        }
    }

    return result;
}

export const getAnimeEpisodeSource = (data: any) => {
    const episode = data.sources.find((episode: any) => episode.quality == "default");
    // console.log(episode);
    if (episode) {
        return episode.url;
    }
    return '';
}

export const getAnimeEpisodeId = (data: any, id: string) => {
    const episode = data.episodes.find((episode: any) => episode.id == id);
    if (episode) {
        return episode;
    }
    return '';
}

export const getAnimeEpisodeNumber = (data: any, number: number) => {
    const episode = data.find((episode: any) => {
        if (episode.episode_number != undefined) {
            return episode.episode_number === number;
        } else if (episode.number != undefined) {
            return episode.number === number;
        } else {
            return null;
        }
    });
    if (episode) {
        return episode;
    }
    return '';
}

export const getIdFromEpisode = (episodes: any) => {
    return episodes.map((episode: any) => {
        return episode.id.split('-episode')[0];
    });
}

export const getDate = (year: string, month: string, date: string) => {
    let monthInt = parseInt(month) - 1;
    return new Date(parseInt(year), monthInt, parseInt(date)).toUTCString().split(' ').slice(0, 4).join(' ');
}

export const getCountDown = (date: string) => {
    let parNumDate = parseInt(date) * 1000;
    const countDownDate = new Date(parNumDate).getTime();
    const now = new Date().getTime();

    // Check if the countdown date is in the future
    if (countDownDate > now) {
        const distance = countDownDate - now;

        // Calculate days, hours, minutes
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        // Return the time difference in the format "days, hours, minutes"
        return `${days}d ${hours}h ${minutes}m`;
    } else {
        return "Countdown date is in the past";
    }
}

export const allCaps = (str: string) => {
    return str.toUpperCase();
}

export const imageProxy = (url: string) => {
    return `https://image-proxy-amber.vercel.app//image-proxy?url=${encodeURIComponent(url)}&headers=${encodeURIComponent(JSON.stringify({ Referer: "https://mangadex.org" }))}`;
}

export const checkNull = (value: any) => {
    // console.log(`is null? ${value} ${value != null && value != undefined && value != '' && value != 'null' && value != 'undefined'}`);
    return value != null && value != undefined && value != '' && value != 'null' && value != 'undefined';
}