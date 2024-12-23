<template>
    <div class="min-h-screen">
        <div v-if="checkNull(animeMeta)">
            <div class="grid grid-cols-1 md:grid-cols-5 mx-3 md:mx-8 md:gap-3">
                <div class="col-span-4">
                    <div>
                        <VideoPlayer v-if="episode != null" :title="checkNull(animeMeta.title?.english) ? animeMeta.title?.english : animeMeta.title?.romaji" :poster="animeMeta.image"
                            :src="getAnimeEpisodeSource(episode)" :subtitle="episode.subtitles" />
                        <USkeleton v-else :ui="{ background: 'bg-zinc-800' }" style="aspect-ratio: 16/9;" :loading="true" />
                    </div>
                    <div class="text-zinc-300 text-lg gap-3">
                        <p class="text-purple-500 font-bold w-full text-xl">
                            <NuxtLink :to="`/anime/${$route.query.id}?externalId=${$route.query.externalId}`">
                                {{ checkNull(animeMeta.title?.english) ? animeMeta.title?.english : animeMeta.title?.romaji }}
                            </NuxtLink>
                        </p>
                        <h3 class="font-semibold my-3">
                            EPISODE {{ getAnimeEpisode().number }}
                            <span v-if="animeMeta">
                                - {{ getAnimeEpisodeNumber(tmdbAnime?.episodes ?? animeMeta.episodes,
                                    getAnimeEpisode().number).name
                                    ??
                                    getAnimeEpisodeNumber(tmdbAnime?.episodes ?? animeMeta.episodes,
                                        getAnimeEpisode().number).title ??
                                    '' }}
                            </span>
                        </h3>
                    </div>
                    <div>
                        <span v-if="animeMeta?.nextAiringEpisode" class="text-zinc-300 col-span-2">
                            Next episode {{ animeMeta?.nextAiringEpisode.episode }} -
                            {{
                                getCountDown(animeMeta?.nextAiringEpisode.airingTime)
                            }}
                        </span>
                    </div>
                    <!-- <span class="flex text-zinc-400 mt-3 text-sm">
                        Released on Nov 13, 2018
                    </span> -->
                </div>
                <div class="text-zinc-300 col-span-1">
                    <div class="w-full">
                        <h3 class="text-white text-xl font-bold">Episodes</h3>
                        <div class="mt-3 overflow-y-auto h-screen">
                            <NuxtLink v-for="ep in animeMeta.episodes"
                                :to="`/anime/watch/${ep.id}?id=${$route.query.id}&externalId=${$route.query.externalId}`"
                                class="flex gap-3 w-full mb-3 items-center border rounded-lg"
                                :class="{ 'border-2 border-purple-500': ep.id == $route.params.watch }">
                                <AnimeEpImg v-if="animeMeta"
                                    :src="getAnimeEpisodeNumber(tmdbAnime?.episodes ?? animeMeta.episodes, ep.number).image"
                                    :ep="ep.number" />
                                <div class="w-3/5 md:w-3/4">
                                    <h5 v-if="animeMeta" class="text-white text-sm">
                                        {{ getAnimeEpisodeNumber(tmdbAnime?.episodes ?? animeMeta.episodes, ep.number).name
                                            ??
                                            getAnimeEpisodeNumber(tmdbAnime?.episodes ?? animeMeta.episodes, ep.number).title ??
                                            '' }}
                                    </h5>
                                    <h5 class="text-white text-sm">EP{{ ep.number }}</h5>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { RuntimeConfig } from "nuxt/schema";

export default {
	data() {
		return {
			anime: null as any,
			animeMeta: null as any,
			relations: [],
			recommendations: [],
			episode: null as any,
			tmdbAnime: null as any,
		};
	},
	async mounted() {
		const config = useRuntimeConfig();
		if (this.$route.query.id != null)
			this.animeMeta = await getAnimeInfo(this.$route.query.id.toString());
		const zoro = this.animeMeta?.mappings?.find(
			(mapping: any) => mapping.providerId === "zoro",
		);
		const mapping = this.animeMeta?.mappings?.find(
			(mapping: any) => mapping.providerId === "tmdb",
		);
		// if (zoro) {
		// 	await this.getAnime(config, zoro.id.split("/watch/")[1]);
		// 	console.log(this.anime, zoro.id.split("/watch/")[1]);
		// } else {
		// 	if (checkNull(this.$route.query.externalId)) {
		// 		await this.getAnime(config, this.$route.query.externalId!!.toString());
		// 	}
		// }
		if (mapping) {
			if (!checkNull(tmdb.getData())) {
				this.tmdbAnime = await getTmdbSeasonEpisodes(
					mapping.id.split("/tv/")[1],
					1,
				);
				tmdb.setData(this.tmdbAnime);
				this.tmdbAnime = tmdb.getData();
			} else this.tmdbAnime = tmdb.getData();
			console.log(`TMDB: ${this.tmdbAnime.episodes}`);
		}
		await this.getEpisode(config);
		console.log(this.animeMeta);
		useHead({
			title: `Episode ${this.getAnimeEpisode().number} - ${checkNull(this.animeMeta.title?.english) ? this.animeMeta.title?.english : this.animeMeta.title?.romaji}`,
			meta: [{ name: "description", content: this.anime?.description }],
		});
	},
	methods: {
		async getAnime(config: RuntimeConfig, id: string) {
			const url = `${config.public.api}anime/zoro/info/${id}`;
			const res = await fetch(url);
			const data = await res.json();
			console.log("getAnime: ", data);
			this.anime = data;

			if (this.anime && this.anime.episodes.length > 0) {
				this.anime.episodes = this.anime.episodes.sort(
					(a: any, b: any) => b.number - a.number,
				);
			}
		},
		async getEpisode(config: RuntimeConfig) {
			const id = this.$route.params.watch.toString()
			const replace = id.replace("$episode$", "?ep=").replace("$sub", "");
			// const url = `${config.public.api}anime/zoro/watch/${id}?server=vidstreaming`;
			// "the-healer-who-was-banished-from-his-party-is-in-fact-the-strongest-19345$episode$130774$sub" 
			const url = `https://aniwatch-api2.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${replace}`
			const res = await fetch(url);
			const data = await res.json();
			// console.log(data);
			this.episode = data;
		},
		getAnimeEpisode() {
			return (
				this.animeMeta.episodes.find(
					(ep: any) => ep.id == this.$route.params.watch,
				) ||
				this.anime.episodes.find((ep: any) => ep.id == this.$route.params.watch)
			);
		},
	},
};
</script>