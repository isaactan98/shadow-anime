<template>
    <div class="min-h-screen">
        <UContainer>
            <div v-if="!finishSearch && animeList.length > 0">
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <NuxtLink v-for="anime in animeList" :to="`/anime/${anime.id}`" :key="anime.id"
                        class="rounded-xl shadow-lg">
                        <div class="relative">
                            <img :src="anime.image" :alt="anime.title" class="rounded-xl w-full h-60 object-cover">
                            <div class="absolute top-0 right-0 bg-purple-500 text-white px-2 py-1 rounded-tr-xl">
                                <p>{{ anime.type }}</p>
                            </div>
                        </div>
                        <div class="p-4 text-zinc-300 text-center">
                            <h1 class="text-sm font-bold line-clamp-2">
                                {{ checkNull(anime.title.english) ? anime.title.english : anime.title.userPreferred }}
                            </h1>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <div v-else-if="!finishSearch && animeList.length == 0" class="w-full flex justify-center mt-5">
                <h1 class="text-2xl text-white">No Anime Found</h1>
            </div>
            <div v-else class="w-full flex justify-center mt-5">
                <SpiningLoading></SpiningLoading>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            searchAnimeName: '',
            animeList: [] as any[],
            finishSearch: false
        }
    },
    async mounted() {
        this.searchAnime()
    },
    methods: {
        searchAnime() {
            this.finishSearch = true
            const config = useRuntimeConfig();
            const url = `${config['public'].metaApi}search/${this.$route.query.q}`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.animeList = data.results
                }).finally(() => {
                    this.finishSearch = false
                })
        }
    }
}
</script>