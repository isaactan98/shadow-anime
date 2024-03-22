<template>
    <div class="w-full mx-auto">
        <UCarousel v-if="slides.length > 0" v-slot="{ item, index }" :items="slides" :arrows="!isMobile()" indicators>
            <div class="w-screen object-cover flex justify-center flex-col items-center relative h-[45vh] md:h-[75vh]">
                <div
                    class="absolute top-0 h-full w-full md:h-[75vh] overflow-hidden bg-gradient-to-bl from-transparent to-zinc-950 ">
                </div>
                <img :src="item.cover" width="200" height="200" class="h-full w-full object-cover overflow-hidden">
                <div class="absolute bottom-16 md:bottom-10 left-10 w-3/4 md:w-full drop-shadow-sm text-zinc-300">
                    <UContainer :ui="{ padding: 'p-1 sm:p-1 lg:p-1' }" class="md:hidden">
                        <h1 class="mb-3 text-xl md:text-4xl font-bold leading-normal text-ellipsis text-white">
                            {{ item.title.english ?? item.title.romaji }}</h1>
                        <div class="flex gap-3 items-center text-sm mb-3">
                            <span class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                </svg>
                                {{ item.type }}
                            </span>
                            <span>{{ allCaps(item.status) }}</span>
                            <span>{{ item.releaseDate }}</span>
                        </div>
                        <NuxtLink :to="`/anime/${item.id}?externalId=null`">
                            <UButton icon="i-heroicons-play-circle" color="purple"
                                :ui="{ rounded: 'rounded-full', size: 'sm' }">
                                Watch Now
                            </UButton>
                        </NuxtLink>
                    </UContainer>
                    <UContainer :ui="{ padding: 'p-1 sm:p-1 lg:p-1' }" class="hidden md:block">
                        <h1 class="mb-3 text-xl md:text-4xl font-bold leading-normal text-ellipsis text-white">
                            {{ item.title.english ?? item.title.romaji }}</h1>
                        <p class="w-1/2 text-sm md:text-base line-clamp-3" v-html="item.description"></p>
                        <div class="flex gap-3 items-center text-sm my-3">
                            <span class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                </svg>
                                {{ item.type }}
                            </span>
                            <span>{{ allCaps(item.status) }}</span>
                            <span>{{ item.releaseDate }}</span>
                        </div>
                        <NuxtLink :to="`/anime/${item.id}?externalId=null`">
                            <UButton icon="i-heroicons-play-circle" color="purple"
                                :ui="{ rounded: 'rounded-full', size: 'sm' }">
                                Watch Now
                            </UButton>
                        </NuxtLink>
                    </UContainer>
                </div>
            </div>
        </UCarousel>
        <USkeleton v-else class="h-[45vh] md:h-[75vh]" :ui="{ rounded: 'rounded-none', background: 'bg-zinc-800' }" />
        <UContainer v-if="recentRelease.length > 0" class="relative top-0 mt-10">
            <h1 class="text-2xl font-semibold text-white mb-5">Recent Release</h1>
            <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
                <AnimeCard v-for="anime in recentRelease" :id="anime.id" :image="anime.image" :data="anime"
                    :title="anime.title.english ?? anime.title.romaji" :episode="anime.episodeNumber"
                    :external-id="null" />
            </div>
        </UContainer>
        <UContainer v-if="topAiring.length > 0" class="relative top-0 mt-10">
            <h1 class="text-2xl font-semibold text-white mb-5">Top Airing</h1>
            <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
                <AnimeCard v-for="anime in topAiring" :id="anime.id" :image="anime.image" :data="anime"
                    :title="anime.title.english ?? anime.title.romaji" :episode="anime.episode" :external-id="null" />
            </div>
        </UContainer>
        <UContainer class="relative top-0 mt-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1 class="text-2xl font-semibold text-white mb-5">Aniwatch Streaming</h1>
                    <div class="text-white" v-if="steamingList.length > 0">
                        <div v-for="list in steamingList" class="flex mb-3 justify-between">
                            <div class="w-3/4 flex gap-2">
                                <span>{{ list.time }}</span>
                                <p>{{ list.title }}</p>
                            </div>
                            <span class="flex-1 w-full text-right">{{ list.episode }}</span>
                        </div>
                    </div>
                    <div v-else>
                        <SpiningLoading />
                    </div>
                </div>
                <div>
                    <h1 class="text-2xl font-semibold text-white mb-5">Anitaku Streaming</h1>
                    <div class="text-white" v-if="gogoAnimeRecentRelease.length > 0">
                        <div v-for="list in gogoAnimeRecentRelease" class="flex mb-3 justify-between">
                            <span class="w-3/4">{{ list.title }}</span>
                            <span class="flex-1 w-full text-right">{{ list.episodeNumber }}</span>
                        </div>
                    </div>
                    <div v-else>
                        <SpiningLoading />
                    </div>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            slides: [] as any[],
            recentRelease: [] as any[],
            topAiring: [] as any[],
            steamingList: [] as any[],
            gogoAnimeRecentRelease: [] as any[],
        }
    },
    async mounted() {
        anilistRecentReleases().then((data) => {
            this.recentRelease = data
            // console.log('recentRelease', this.recentRelease)
        })
        anilistAiringSchedule().then((data) => {
            this.topAiring = data
            // console.log('topAiring', this.topAiring)
        })
        // console.log('topAiring', this.topAiring)
        await anilistTrendingSlider().then((data) => {
            this.slides = data
            // console.log('slides', this.slides)
        });
        // this.getRecentRelease(config)
        // this.getTopAiring(config)
        useHead({
            title: 'Home',
            meta: [
                { name: 'description', content: 'Home' },
            ],

        })

        await getTodayStream().then((data) => {
            this.steamingList = data
            // console.log('steamingList', this.steamingList)
        })
        await this.getRecentRelease()
    },
    methods: {
        async getRecentRelease() {
            var url = ''
            const config = useRuntimeConfig();
            url = config['public'].apiUrl + 'recent-episodes'
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.log('data', data)
                    if (data.results.length > 0) {
                        this.gogoAnimeRecentRelease = data.results.slice(0, 5)
                    } else {
                        alert(data.message)
                    }
                })
                .catch(err => {
                    alert('Something went wrong, please try again later')
                    console.log(err)
                });
        },
        isMobile() {
            return window.innerWidth < 768
        },
    }
}
</script>