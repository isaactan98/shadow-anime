<template>
    <div v-if="anime" class="relative">
        <div v-if="animeMeta != null" class="w-full py-5 grid place-items-center h-[30rem]">
            <img :src="animeMeta.image" alt="" class="w-3/4 md:w-72 rounded-xl z-10 relative shadow-lg">
            <div class="w-full">
                <div class="w-full absolute backdrop-blur-md z-[1] top-0 h-[30rem] object-cover left-0 right-0"></div>
                <img :src="animeMeta.cover" alt="" class="w-full absolute top-0 h-[30rem] object-cover left-0 right-0">
            </div>
        </div>
        <div v-else class="w-full py-5 grid place-items-center h-[30rem]">
            <img :src="anime.image" alt="" class="w-3/4 md:w-72 rounded-xl z-10 relative shadow-lg">
            <div class="w-full">
                <div class="w-full absolute backdrop-blur-md z-[1] top-0 h-[30rem] object-cover left-0 right-0"></div>
                <img :src="anime.image" alt="" class="w-full absolute top-0 h-[30rem] object-cover left-0 right-0">
            </div>
        </div>
        <UContainer class="mt-5">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-5">
                <div class=" col-span-3">
                    <h1 class=" text-white text-xl md:text-4xl">{{ anime.title }}</h1>
                    <h5 class="text-zinc-400 md:text-lg">{{ anime.otherName }}</h5>
                    <div class="flex gap-5 items-center mt-3">
                        <p class="text-zinc-300 capitalize">{{ anime.subOrDub }}</p>
                        <UBadge color="gray">{{ anime.status }}</UBadge>
                    </div>
                    <div class="mt-3 h-24 overflow-y-auto">
                        <p v-html="anime.description" class="text-white text-justify text-sm"></p>
                    </div>
                    <div class="mt-5 flex gap-3">
                        <UBadge v-for="g in anime.genres" color="gray">{{ g }}</UBadge>
                    </div>
                    <div v-if="animeMeta != null" class="hidden md:block col-span-3">
                        <h3 class="text-white text-xl mt-5">Characters</h3>
                        <div class="mt-3 grid grid-cols-3 md:grid-cols-4 gap-3">
                            <UCard v-for="(c, i) in animeMeta.characters" class=" text-center"
                                :ui="{ background: ' bg-zinc-800', ring: 'ring-0', body: { padding: 'p-1' } }">
                                <img :src="c.image" alt="" class=" w-28 h-28 rounded-lg object-cover">
                                <div class="mt-3">
                                    <h5 class="text-white mb-2 text-sm">{{ c.name.userPreferred }}</h5>
                                    <UBadge :label="c.role" color="gray" size="sm" />
                                </div>
                            </UCard>
                        </div>
                    </div>
                </div>
                <div class="col-span-1 md:col-span-2">
                    <div class="flex gap-3 items-center">
                        <UButton label="Add to Watchlist" color="gray" />
                    </div>
                    <div class="mt-5 w-full" v-if="animeMeta != null && animeMeta.episodes.length == anime.episodes.length">
                        <h3 class="text-white text-xl">Episodes</h3>
                        <div class="mt-3">
                            <NuxtLink v-for="(e, i) in anime.episodes" :key="i"
                                class="flex gap-3 w-full mb-3 items-center border rounded-lg">
                                <img :src="animeMeta.episodes[i].image" alt="" class=" w-28 h-28 rounded-lg object-cover">
                                <div>
                                    <h5 class="text-white text-sm">{{ animeMeta.episodes[i].title }}</h5>
                                    <h5 class="text-white text-sm">EP{{ e.number }}</h5>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="mt-5 w-full" v-else>
                        <h3 class="text-white text-xl">Episodes</h3>
                        <div class="mt-3 grid grid-cols-3 gap-3 ">
                            <UButton color="gray" v-for="(e, i) in anime.episodes" :key="i">
                                <h5 class=" text-sm">EP{{ e.number }}</h5>
                            </UButton>
                        </div>
                    </div>
                </div>
                <div v-if="animeMeta != null" class="md:hidden col-span-3">
                    <h3 class="text-white text-xl mt-5">Characters</h3>
                    <div class="mt-3 grid grid-cols-3 md:grid-cols-4 gap-3">
                        <UCard v-for="(c, i) in animeMeta.characters"
                            :ui="{ background: ' bg-zinc-800', ring: 'ring-0', body: { padding: 'p-1' } }">
                            <img :src="c.image" alt="" class=" w-28 h-28 rounded-lg object-cover">
                            <div class="mt-3">
                                <h5 class="text-white mb-2 text-sm">{{ c.name.userPreferred }}</h5>
                                <UBadge :label="c.role" color="gray" size="sm" />
                            </div>
                        </UCard>
                    </div>
                </div>
            </div>
            <div v-if="animeMeta" class="mt-5">
                <h3 class="text-white text-xl mb-3">Relations</h3>
                <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
                    <AnimeCard v-for="meta in relations" :id="meta.externalId" :title="meta.title.english"
                        :image="meta.image" :episode="meta.episodes" :external-id="meta.id" />
                </div>
            </div>
            <div v-if="animeMeta" class="mt-5">
                <h3 class="text-white text-xl mb-3">Recommendations</h3>
                <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
                    <AnimeCard v-for="anime in recommendations" :id="anime.externalId" :title="anime.title.english"
                        :image="anime.image" :episode="anime.episodes" :external-id="anime.id" />
                </div>
            </div>
        </UContainer>
    </div>
    <USkeleton v-else class="h-screen" :ui="{ rounded: 'rounded-xl', background: 'bg-zinc-700' }" :loading="true" />
</template>

<script>
export default {
    data() {
        return {
            anime: null,
            loading: false,
            search: '',
            nextPage: false,
            currentPage: 1,
            nextLoading: false,
            animeMeta: null,
            recommendations: null,
            relations: null
        }
    },
    async mounted() {
        console.clear()
        const route = useRoute();
        const config = useRuntimeConfig();
        this.animeMeta = await getAnimeInfo(this.$route.query.externalId)
        await this.getAnime(config, route)
        useHead({
            title: this.anime.title,
            meta: [
                { name: 'description', content: 'Anime' },
            ],
        })
    },
    methods: {
        async getAnime(config, route) {
            var url = ''
            url = config['public'].apiUrl + 'info/' + route.params.anime
            await fetch(url)
                .then(response => response.json())
                .then(async data => {
                    console.log('data', data)
                    this.anime = data
                    if (this.$route.query.externalId == "null") {
                        this.animeMeta = await fetchAnimeMeta(data.title)
                    }
                    if (this.animeMeta != null) {
                        this.recommendations = this.animeMeta.recommendations
                        this.recommendations.forEach(async element => {
                            // element.id = await getAnimeInfo(element.id).mappings
                            let mappings = await getAnimeInfo(element.id)
                            element.externalId = getAnimeId(mappings)
                            // console.log('element', mappings, mappings.mappings)
                        });
                        this.relations = this.animeMeta.relations
                        this.relations.forEach(async element => {
                            // element.id = await getAnimeInfo(element.id).mappings
                            let mappings = await getAnimeInfo(element.id)
                            element.externalId = getAnimeId(mappings)
                            // console.log('element', mappings, mappings.mappings)
                        });
                    }
                })
                .catch(err => {
                    // alert('Something went wrong, please try again later')
                    console.log(err)
                });
        },
    }
}
</script>