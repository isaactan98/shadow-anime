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
    console.log(episode);
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
    const episode = data.find((episode: any) => episode.number == number);
    if (episode) {
        return episode;
    }
    return '';
}