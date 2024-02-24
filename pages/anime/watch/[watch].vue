<template>
    <div class="min-h-screen pt-20">
        <div v-if="anime != null">
            <div class="grid grid-cols-1 md:grid-cols-5 mx-3 md:mx-8 md:gap-3">
                <div class="col-span-4">
                    <div>
                        <VideoPlayer v-if="episode != null" :title="anime.title" :poster="anime.image"
                            :src="getAnimeEpisodeSource(episode)" />
                        <USkeleton v-else :ui="{ background: 'bg-zinc-800' }" style="aspect-ratio: 16/9;" :loading="true" />
                    </div>
                    <div class="text-zinc-300 text-lg gap-3">
                        <NuxtLink :to="`/anime/${$route.query.id}?externalId=${$route.query.externalId}`">
                            <h3 class="text-purple-500 font-bold">{{ animeMeta.title?.english ?? anime.title }}</h3>
                        </NuxtLink>
                        <h3 class="font-semibold my-3">
                            EP {{ getAnimeEpisode().number }}
                            <span v-if="animeMeta">
                                - {{ getAnimeEpisodeNumber(animeMeta.episodes,
                                    getAnimeEpisode().number).title }}
                            </span>
                        </h3>
                    </div>
                    <!-- <span class="flex text-zinc-400 mt-3 text-sm">
                        Released on Nov 13, 2018
                    </span> -->
                </div>
                <div class="text-zinc-300 col-span-1">
                    <div class="w-full">
                        <h3 class="text-white text-xl font-bold">Episodes</h3>
                        <div class="mt-3 overflow-y-auto h-screen">
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
        if (this.$route.query.id != null) this.animeMeta = await getAnimeInfo(this.$route.query.id.toString())
        const gogoAnime = this.animeMeta.mappings.find((mapping: any) => mapping.providerId === 'gogoanime');
        if (gogoAnime) {
            await this.getAnime(config, gogoAnime.id.split("/category/")[1])
            console.log(this.anime, gogoAnime.id.split("/category/")[1])
        }
        await this.getEpisode(config)
        console.log(this.animeMeta)
        useHead({
            title: `Episode ${this.getAnimeEpisode().number} - ${this.anime?.title}`,
            meta: [
                { name: 'description', content: this.anime?.description },
            ],
        })
    },
    methods: {
        async getAnime(config: RuntimeConfig, id: string) {
            const url = config['public'].apiUrl + 'info/' + id
            const res = await fetch(url)
            const data = await res.json()
            console.log("getAnime: ",data)
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
            return this.animeMeta.episodes.find((ep: any) => ep.id == this.$route.params.watch)
        },
    },

}
</script>