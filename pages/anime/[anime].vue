<template>
    <div v-if="anime" class="relative">
        <div class="w-full py-5 grid place-items-center h-[30rem]">
            <img :src="anime.image" alt="" class="w-64 rounded-xl z-10 relative shadow-lg">
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
                <div class="col-span-1 md:col-span-2">
                    <div class="flex gap-3 items-center">
                        <UButton label="Add to Watchlist" color="gray" />
                    </div>
                    <div class="mt-5 w-full" v-if="animeMeta != null && animeMeta.episodes.length > 0">
                        <h3 class="text-white text-xl">Episodes</h3>
                        <div class="mt-3">
                            <NuxtLink v-for="(   e, i   ) in    anime.episodes   " :key="i"
                                class="flex gap-3 w-full mb-3 items-center border rounded-lg border-purple-500">
                                <img :src="animeMeta.episodes[i].image" alt="" class=" w-28 h-28 rounded-lg object-cover">
                                <div>
                                    <h5 class="text-white text-sm">{{ animeMeta.episodes[i].title }}</h5>
                                    <h5 class="text-white text-sm">EP{{ e.number }}</h5>
                                </div>
                            </NuxtLink>
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
        </UContainer>
    </div>
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
            animeMeta: null
        }
    },
    async mounted() {
        console.clear()
        const route = useRoute();
        const config = useRuntimeConfig();
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
                    this.animeMeta = await fetchAnimeMeta(this.anime.title)

                })
                .catch(err => {
                    alert('Something went wrong, please try again later')
                    console.log(err)
                });
        },
    }
}
</script>