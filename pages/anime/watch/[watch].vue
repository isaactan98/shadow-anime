<template>
    <div class="min-h-screen pt-20">
        <div v-if="anime != null">
            <VideoPlayer v-if="episode != null" :title="anime.title" :poster="anime.image"
                :src="getAnimeEpisodeSource(episode)" />
            <USkeleton v-else :ui="{ background: 'bg-zinc-800' }" style="aspect-ratio: 16/9;" :loading="true" />
            <UContainer class="mt-5">
                <div class="grid md:grid-cols-5">
                    <div class="col-span-3">
                        <div class="text-zinc-300 text-lg gap-3">
                            <NuxtLink :to="`/anime/${$route.query.id}?externalId=${$route.query.externalId}`">
                                <h3 class="text-purple-500 font-semibold">{{ anime.title }}</h3>
                            </NuxtLink>
                            <h3 class="font-semibold my-3">
                                EP {{ getAnimeEpisode().number }}
                                <span v-if="animeMeta">
                                    - {{ getAnimeEpisodeNumber(animeMeta.episodes,
                                        getAnimeEpisode().number).title }}
                                </span>
                            </h3>
                        </div>
                        <span class="flex text-zinc-400 mt-3 text-sm">
                            Released on Nov 13, 2018
                        </span>
                    </div>
                    <div class="text-zinc-300 col-span-2">
                        <div class="mt-5 w-full">
                            <h3 class="text-white text-xl">Episodes</h3>
                            <div class="mt-3">
                                <NuxtLink v-for="ep in anime.episodes"
                                    :to="`/anime/watch/${ep.id}?id=${$route.query.id}&externalId=${$route.query.externalId}`"
                                    class="flex gap-3 w-full mb-3 items-center border rounded-lg"
                                    :class="{ 'border-2 border-purple-500': ep.id == $route.params.watch }">
                                    <img v-if="animeMeta" :src="getAnimeEpisodeNumber(animeMeta.episodes, ep.number).image"
                                        alt="" class="w-28 h-28 rounded-lg object-cover">
                                    <div>
                                        <h5 v-if="animeMeta" class="text-white text-sm">
                                            {{ getAnimeEpisodeNumber(animeMeta.episodes, ep.number).title }}
                                        </h5>
                                        <h5 class="text-white text-sm">EP{{ ep.number }}</h5>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </UContainer>
        </div>
    </div>
</template>

<script lang="ts">
import type { RuntimeConfig } from 'nuxt/schema';

export default {
    data() {
        return {
            anime: null as any,
            animeMeta: null as any,
            relations: [],
            recommendations: [],
            episode: null as any
        }
    },
    async mounted() {
        const config = useRuntimeConfig();
        await this.getAnime(config)
        await this.getEpisode(config)
        this.animeMeta = await getAnimeInfo(this.$route.query.externalId!!.toString())
        console.log(this.animeMeta)
    },
    methods: {
        async getAnime(config: RuntimeConfig) {
            const url = config['public'].apiUrl + 'info/' + this.$route.query.id
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            this.anime = data
        },
        async getEpisode(config: RuntimeConfig) {
            const url = config['public'].apiUrl + 'watch/' + this.$route.params.watch
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            this.episode = data
        },
        getAnimeEpisode() {
            return this.anime.episodes.find((ep: any) => ep.id == this.$route.params.watch)
        },
    },

}
</script>