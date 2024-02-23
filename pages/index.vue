<template>
    <div class="w-full mx-auto">
        <UCarousel v-if="slides.length > 0" v-slot="{ item, index }" :items="slides" arrows>
            <div class="w-screen object-cover flex justify-end items-center overflow-hidden relative h-[55vh] md:h-[85vh]">
                <img :src="item.img" class="h-full md:h-[85vh] w-full object-cover"
                    style="mask-image: linear-gradient(270deg,transparent 0,rgb(36,36,40) 10%,rgb(36,36,40) 50%,transparent);">
                <div
                    class="absolute top-3/4 md:top-1/2 left-10 w-full font-semibold drop-shadow-sm text-md md:text-5xl text-white">
                    <UContainer>
                        <h1 class="mb-3">
                            {{ item.title }}</h1>
                        <div class="w-1/2 text-sm md:text-base line-clamp-3 text-white" v-html="item.description"></div>
                    </UContainer>
                </div>
            </div>
        </UCarousel>
        <USkeleton v-else class="h-[55vh] md:h-[100vh]" :ui="{ rounded: 'rounded-none', background: 'bg-zinc-800' }" />
        <UContainer v-if="recentRelease.length > 0" class="relative top-0 mt-10 md:-top-36">
            <h1 class="text-2xl font-semibold text-white mb-5">Recent Release</h1>
            <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
                <AnimeCard v-for="anime in recentRelease" :id="anime.id" :image="anime.image" :title="anime.title"
                    :episode="anime.episodeNumber" :external-id="null" />
            </div>
        </UContainer>
        <UContainer v-if="topAiring.length > 0" class="relative top-0 mt-10 md:-top-36">
            <h1 class="text-2xl font-semibold text-white mb-5">Top Airing</h1>
            <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
                <AnimeCard v-for="anime in topAiring" :id="anime.id" :image="anime.image" :title="anime.title"
                    :episode="anime.episodeNumber" :external-id="null" />
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
            steamingList: []
        }
    },
    async mounted() {
        const config = useRuntimeConfig();
        this.slides = await aniWatchSlider();
        this.getRecentRelease(config)
        this.getTopAiring(config)
        useHead({
            title: 'Home',
            meta: [
                { name: 'description', content: 'Home' },
            ],

        })
    },
    methods: {
        async getRecentRelease(config: any) {
            var url = ''
            url = config['public'].apiUrl + 'recent-episodes'
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log('data', data)
                    if (data.results.length > 0) {
                        this.recentRelease = data.results
                    } else {
                        alert(data.message)
                    }
                })
                .catch(err => {
                    alert('Something went wrong, please try again later')
                    console.log(err)
                });
        },
        async getTopAiring(config: any) {
            var url = ''
            url = config['public'].apiUrl + 'top-airing'
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    if (data.results.length > 0) {
                        this.topAiring = data.results
                    } else {
                        alert(data.message)
                    }
                })
                .catch(err => {
                    alert('Something went wrong, please try again later')
                    // console.log(err)
                });
        },
    }
}
</script>