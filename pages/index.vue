<template>
    <div class="w-full mx-auto">
        <UCarousel v-if="slides.length > 0" v-slot="{ item, index }" :items="slides" indicators>
            <div class="w-screen object-cover flex justify-end items-center overflow-hidden relative h-[35vh] md:h-[50vh]">
                <div class=" absolute left-0 bg-gradient-to-r from-zinc-900 to-zinc-700/20 h-full w-2/5">
                </div>
                <img :src="item.image" class="h-full md:h-[80vh] w-full object-cover"
                    style="mask-image: linear-gradient(270deg,transparent 0,rgb(36,36,40) 10%,rgb(36,36,40) 50%,transparent);">
                <h1 class="absolute top-3/4 md:top-1/2 left-10 font-semibold drop-shadow-sm text-md md:text-5xl text-white">
                    {{ item.name }}</h1>
            </div>
        </UCarousel>
        <USkeleton v-else class="h-[35vh] md:h-[50vh]" :ui="{ rounded: 'rounded-none', background: 'bg-zinc-700' }" />
        <UContainer class="min-h-screen">
            <div>

            </div>
        </UContainer>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            slides: []
        }
    },
    mounted() {
        this.fetchZoroTopAnime();
    },
    methods: {
        async fetchZoroTopAnime() {
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
        }
    }
}
</script>