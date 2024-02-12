<template>
    <div class="w-full mx-auto">
        <UCarousel v-if="slides.length > 0" v-slot="{ item, index }" :items="slides" arrows>
            <div class="w-screen object-cover flex justify-end items-center overflow-hidden relative h-[55vh] md:h-screen">
                <!-- <div class=" absolute left-0 bg-gradient-to-r from-zinc-900 to-zinc-700/20 h-full w-2/5">
                </div> -->
                <img :src="item.image" class="h-full md:h-[100vh] w-full object-cover"
                    style="mask-image: linear-gradient(270deg,transparent 0,rgb(36,36,40) 10%,rgb(36,36,40) 50%,transparent);">
                <h1 class="absolute top-3/4 md:top-1/2 left-10 font-semibold drop-shadow-sm text-md md:text-5xl text-white">
                    {{ item.name }}</h1>
            </div>
        </UCarousel>
        <USkeleton v-else class="h-[55vh] md:h-[100vh]" :ui="{ rounded: 'rounded-none', background: 'bg-zinc-700' }" />
        <UContainer v-if="recentRelease.length > 0" class="relative top-0 mt-10 md:-top-36">
            <h1 class="text-2xl font-semibold text-white mb-5">Recent Release</h1>
            <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
                <AnimeCard v-for="anime in recentRelease" :animeInfo="anime" />
            </div>
        </UContainer>
        <UContainer v-if="topAiring.length > 0" class="relative top-0 mt-10 md:-top-36">
            <h1 class="text-2xl font-semibold text-white mb-5">Top Airing</h1>
            <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
                <AnimeCard v-for="anime in topAiring" :animeInfo="anime" />
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            slides: [],
            recentRelease: [],
            topAiring: []
        }
    },
    mounted() {
        const config = useRuntimeConfig();
        this.fetchZoroTopAnime();
        this.getRecentRelease(config)
        this.getTopAiring(config)
    },
    methods: {
        async fetchZoroTopAnime() {
            console.log("fetch")
            const response = await fetch('https://api-aniwatch.onrender.com/anime/home');
            this.slides = await response.json().then(data => {
                return data.spotlightAnimes.map((anime: any) => {
                    return {
                        image: anime.poster,
                        name: anime.name,
                        id: anime.id
                    }
                })
            });
        },
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