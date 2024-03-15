<template>
    <div v-if="animeMeta != null" class="relative">
        <div v-if="animeMeta != null" class="w-full py-5 grid place-items-center relative h-[30rem]">
            <div class="absolute bottom-10 md:bottom-8 w-full z-10">
                <UContainer class="flex flex-col md:flex-row justify-center md:justify-start items-center">
                    <img :src="animeMeta.image" alt="" class="w-40 md:w-52 rounded-xl relative shadow-lg" />
                    <div class="flex md:self-end text-center md:text-left flex-col p-3 gap-3 text-white">
                        <h1 class="font-bold text-xl md:text-2xl">
                            {{ checkNull(animeMeta.title.english) ? animeMeta.title.english : animeMeta.title.romaji }}
                        </h1>
                        <h1 class="hidden md:block text-zinc-300">
                            {{ animeMeta.title?.native ?? animeMeta.title?.romaji }}
                        </h1>
                        <p class="flex justify-center items-center md:justify-start text-zinc-300">
                            <span class="">{{ ((animeMeta.rating / 100) * 5).toFixed(1) }} / 5 |
                            </span>
                            <span class="ml-1" :class="{ 'text-green-500': animeMeta.status == 'Completed' }">
                                {{ allCaps(animeMeta.status) }}
                            </span>
                        </p>
                        <div class="flex gap-3 items-center justify-center md:justify-normal">
                            <UButton label="Add to Watchlist" color="gray" />
                        </div>
                    </div>
                </UContainer>
            </div>
            <div class="w-full">
                <div
                    class="w-full absolute z-[1] bg-gradient-to-b from-transparent to-zinc-950 top-0 h-[20rem] object-cover left-0 right-0">
                </div>
                <img :src="animeMeta.cover" alt=""
                    class="w-full absolute top-0 h-[20rem] object-cover left-0 right-0" />
            </div>
        </div>
        <div v-else class="w-full py-5 grid place-items-center relative h-[30rem]">
            <div class="absolute bottom-10 md:bottom-8 w-full z-10">
                <UContainer v-if="anime != null"
                    class="flex flex-col md:flex-row justify-center md:justify-start items-center">
                    <img :src="anime.image" alt="" class="w-40 md:w-52 rounded-xl relative shadow-lg" />
                    <div class="flex md:self-end text-center md:text-left flex-col p-3 gap-3">
                        <h1 class="font-bold text-xl md:text-2xl text-white">
                            {{ anime.title }}
                        </h1>
                        <h1 class="hidden md:block text-zinc-300">{{ anime.otherName }}</h1>
                        <p class="flex justify-center md:justify-start text-zinc-300">
                            <UBadge class="ml-1" color="gray" v-if="anime.status != 'Completed'">
                                {{ anime.status }}
                            </UBadge>
                            <UBadge class="ml-1" v-else>{{ anime.status }}</UBadge>
                        </p>
                        <div class="flex gap-3 items-center">
                            <UButton label="Add to Watchlist" color="gray" />
                            <UButton label="Watch Now" color="purple" />
                        </div>
                    </div>
                </UContainer>
            </div>
            <div class="w-full">
                <div
                    class="w-full absolute z-[1] bg-gradient-to-b from-transparent to-zinc-950 top-0 h-[20rem] object-cover left-0 right-0">
                </div>
                <img v-if="anime != null" :src="anime.image" alt=""
                    class="w-full absolute top-0 h-[20rem] object-cover left-0 right-0" />
            </div>
        </div>
        <UContainer class="">
            <!-- Tabs -->
            <UTabs :items="tabs" :ui="{
        list: {
            rounded: 'rounded-none',
            background: 'bg-zinc-900',
            tab: { inactive: 'text-zinc-500' },
        },
    }">
                <template #item="{ item }">
                    <UCard v-if="item.key === 'info'" :ui="{ background: 'bg-zinc-900', ring: 'ring-0' }">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                            <div class="col-span-1 order-last md:order-none">
                                <h5 class="text-white font-semibold md:text-2xl">Info</h5>
                                <div>
                                    <div class="grid grid-cols-3 gap-2 items-center mt-3 font-bold">
                                        <p class="text-zinc-300 col-span-1 capitalize">Airing</p>
                                        <span v-if="animeMeta?.nextAiringEpisode" class="text-zinc-300 col-span-2">
                                            EP{{ animeMeta?.nextAiringEpisode.episode }} -
                                            {{
        getCountDown(animeMeta?.nextAiringEpisode.airingTime)
    }}
                                        </span>
                                        <span v-else class="text-zinc-300 col-span-2">-</span>
                                    </div>
                                    <div class="grid grid-cols-3 gap-2 items-center mt-3">
                                        <p class="text-zinc-300 col-span-1 font-semibold capitalize">
                                            Season
                                        </p>
                                        <span class="text-zinc-300 col-span-2">{{
            animeMeta?.season ?? "-"
        }}</span>
                                    </div>
                                    <div class="grid grid-cols-3 gap-2 items-center mt-3">
                                        <p class="text-zinc-300 col-span-1 font-semibold capitalize">
                                            Sub/Dub
                                        </p>
                                        <span class="text-zinc-300 col-span-2 capitalize">{{
            animeMeta?.subOrDub ?? anime.subOrDub
        }}</span>
                                    </div>
                                    <div class="grid grid-cols-3 gap-2 items-center mt-3">
                                        <p class="text-zinc-300 col-span-1 font-semibold capitalize">
                                            Type
                                        </p>
                                        <span class="text-zinc-300 col-span-2">{{
            animeMeta?.type ?? "-"
        }}</span>
                                    </div>
                                    <div class="grid grid-cols-3 gap-2 items-center mt-3">
                                        <p class="text-zinc-300 col-span-1 font-semibold capitalize">
                                            Episodes
                                        </p>
                                        <span class="text-zinc-300 col-span-2">
                                            {{ animeMeta?.currentEpisode ?? anime.totalEpisodes }} /
                                            {{ animeMeta?.totalEpisodes ?? anime.totalEpisodes }}
                                        </span>
                                    </div>
                                    <div class="grid grid-cols-3 gap-2 items-center mt-3">
                                        <p class="text-zinc-300 col-span-1 font-semibold capitalize">
                                            Aired
                                        </p>
                                        <span v-if="animeMeta?.startDate" class="text-zinc-300 col-span-2">
                                            {{
        getDate(
            animeMeta?.startDate.year,
            animeMeta?.startDate.month,
            animeMeta?.startDate.day
        )
    }}
                                            to
                                            {{
            getDate(
                animeMeta?.endDate.year,
                animeMeta?.endDate.month,
                animeMeta?.endDate.day
            )
        }}
                                        </span>
                                        <span v-else class="text-zinc-300 col-span-2">-</span>
                                    </div>
                                    <div class="grid grid-cols-3 gap-2 items-center mt-3">
                                        <p class="text-zinc-300 col-span-1 font-semibold capitalize">
                                            Genres
                                        </p>
                                        <span class="text-zinc-300 col-span-2">
                                            {{
            animeMeta?.genres.join(", ") ?? anime.genres.join(", ")
        }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-3">
                                <div>
                                    <h5 class="text-white font-semibold md:text-2xl">
                                        Description
                                    </h5>
                                    <div class="mt-3 min-h-36 max-h-48 overflow-y-auto">
                                        <p v-html="animeMeta?.description ?? anime.description"
                                            class="text-zinc-300 text-justify text-sm"></p>
                                    </div>
                                </div>
                                <div v-if="animeMeta">
                                    <UButton label="Watch Trailer " @click="openTrailer = true" color="purple"
                                        class="mt-5" />
                                    <UModal v-model="openTrailer" :ui="{ overlay: { background: 'bg-zinc-900/80' } }">
                                        <div class="p-1">
                                            <iframe width="100%" height="315"
                                                :src="`https://www.youtube.com/embed/${animeMeta.trailer.id}`"
                                                title="YouTube video player" frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                        </div>
                                    </UModal>
                                </div>
                            </div>
                        </div>
                    </UCard>
                    <UCard v-else-if="item.key === 'characters'" :ui="{ background: 'bg-zinc-900', ring: 'ring-0' }">
                        <div v-if="animeMeta != null" class="">
                            <h3 class="text-white text-xl">Characters</h3>
                            <div class="mt-3 grid grid-cols-3 md:grid-cols-5 gap-3">
                                <UCard v-for="(c, i) in animeMeta.characters" class="text-center" :ui="{
        background: ' bg-transparent',
        ring: 'ring-0',
        body: { padding: 'sm:p-1' },
    }">
                                    <img :src="c.image" alt="" class="w-full md:h-[200px] rounded-lg object-cover" />
                                    <div class="mt-3">
                                        <h5 class="text-white mb-2 text-sm">
                                            {{ c.name.userPreferred }}
                                        </h5>
                                        <UBadge :label="c.role" color="gray" size="sm" />
                                    </div>
                                </UCard>
                            </div>
                        </div>
                    </UCard>
                    <UCard v-else-if="item.key === 'relations'" :ui="{ background: 'bg-zinc-900', ring: 'ring-0' }">
                        <div v-if="animeMeta != null" class="">
                            <h3 class="text-white text-xl mb-3">Relations</h3>
                            <div class="flex overflow-x-auto gap-3 w-full snap-x scroll-smooth">
                                <AnimeCard v-for="meta in relations" :id="meta.id" :title="meta.title.english"
                                    :image="meta.image" :episode="meta.episodes" :external-id="meta.id" :data="meta" />
                            </div>
                        </div>
                    </UCard>
                    <UCard v-else-if="item.key === 'artwork'" :ui="{ background: 'bg-zinc-900', ring: 'ring-0' }">
                        <div v-if="animeMeta != null" class="">
                            <h3 class="text-white text-xl mb-3">Artwork</h3>
                            <UCarousel v-if="animeMeta.artwork?.length > 0" v-slot="{ item, index }"
                                :items="animeMeta.artwork.slice(0, 100)" arrows>
                                <UButton class="relative mb-3" @click="openModal(item.img)" color="purple"
                                    variant="ghost">
                                    <img :src="item.img" loading="lazy" alt=""
                                        class="rounded-lg object-cover w-56 h-64" />
                                </UButton>
                            </UCarousel>
                            <div v-else>
                                <UCard :ui="{ background: 'bg-zinc-900', ring: 'ring-0' }" class="text-zinc-300">
                                    No Artwork
                                </UCard>
                            </div>
                            <UModal v-model="isOpen" :ui="{ overlay: { background: 'bg-zinc-900/80' } }">
                                <div class="p-1">
                                    <img :src="showImg" alt="" class="rounded-lg object-cover" />
                                </div>
                            </UModal>
                        </div>
                    </UCard>
                </template>
            </UTabs>
            <div class="">
                <div class="mt-5 w-full" v-if="(tmdbMeta != null || animeMeta != null) && anime != null">
                    <h3 class="text-white text-xl">Episodes</h3>
                    <div class="mt-3 max-h-[70vh] overflow-y-auto scroll-p-0">
                        <NuxtLink v-for="(e, i) in anime.episodes" :key="i"
                            :to="'/anime/watch/' + e.id + '?id=' + $route.params.anime + '&externalId=' + anime.id"
                            class="flex gap-3 w-full mb-3 items-center bg-zinc-900 rounded-lg">
                            <AnimeEpImg
                                :src="getAnimeEpisodeNumber(tmdbMeta?.episodes ?? animeMeta.episodes, e.number).image ?? anime.image"
                                :ep="e.number" />
                            <div class="w-3/5 md:w-3/4">
                                <h5 class="text-white text-md">
                                    {{ getAnimeEpisodeNumber(tmdbMeta?.episodes ?? animeMeta.episodes, e.number).name ??
                                    getAnimeEpisodeNumber(tmdbMeta?.episodes ?? animeMeta.episodes, e.number).title ??
                                    ''
                                    }}
                                </h5>
                                <span v-if="checkNull(tmdbMeta)" class="text-zinc-400 text-sm line-clamp-2">
                                    {{ getAnimeEpisodeNumber(tmdbMeta.episodes, e.number).overview }}
                                </span>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
                <div class="mt-5 w-full" v-else>
                    <h3 class="text-white text-xl">Episodes</h3>
                    <UCard :ui="{ background: 'bg-zinc-900', ring: 'ring-0' }" class="text-zinc-300">
                        No Episodes Found
                    </UCard>
                </div>
            </div>
            <div v-if="animeMeta != null" class="mt-5">
                <h3 class="text-white text-xl mb-3">Recommendations</h3>
                <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
                    <AnimeCard v-for="anime in recommendations" :id="anime.id"
                        :title="anime.title.english ?? anime.title.romaji" :image="anime.image"
                        :episode="anime.episodes" :external-id="null" :data="anime" />
                </div>
            </div>
        </UContainer>
    </div>
    <USkeleton v-else class="h-screen" :ui="{ rounded: 'rounded-none', background: 'bg-zinc-700' }" :loading="true" />
</template>

<script>

export default {
    data() {
        return {
            anime: null,
            loading: false,
            search: "",
            nextPage: false,
            currentPage: 1,
            nextLoading: false,
            animeMeta: null,
            recommendations: null,
            relations: null,
            isOpen: false,
            openTrailer: false,
            tabs: [
                { key: "info", label: "Info" },
                { key: "characters", label: "Characters" },
                { key: "relations", label: "Relations" },
                { key: "artwork", label: "Artwork" },
            ],
            tmdbMeta: null,
        };
    },
    async mounted() {
        // console.clear();
        const config = useRuntimeConfig();
        await getAnimeInfo(this.$route.params.anime).then((d) => {
            this.animeMeta = d;
        }).catch(() => {
            alert("Anime not found");
            this.$router.push("/");
        });
        this.recommendations = this.animeMeta.recommendations;
        this.relations = this.animeMeta.relations;
        const mapping = this.animeMeta.mappings?.find((mapping) => mapping.providerId === 'tmdb');
        const gogoAnime = this.animeMeta.mappings?.find((mapping) => mapping.providerId === 'gogoanime');
        if (gogoAnime == null) {
            await searchGogoanime(this.animeMeta.title.romaji).then(async (d) => {
                if (d.results.length > 0) {
                    this.anime = await this.getAnime(config, d.results[0].id);
                }
            });
        }
        // console.log('gogoAnime', gogoAnime);
        if (mapping) {
            this.tmdbMeta = await getTmdbSeasonEpisodes(mapping.id.split('/tv/')[1], 1);
            // console.log('tmdbMeta::', this.tmdbMeta);
            tmdb.setData(this.tmdbMeta);
            // console.log(`tmdbAnime:: ${tmdb.getData()}`);
        }
        if (checkNull(gogoAnime)) {
            this.anime = await this.getAnime(config, gogoAnime.id.split("/category/")[1]);
        }
        // console.log("animeMeta", this.animeMeta);
        useHead({
            title: this.animeMeta.title.english ?? this.animeMeta.title.romaji,
            meta: [{ name: "description", content: "Anime" }],
        });
    },
    methods: {
        async getAnime(config, route) {
            var url = "";
            url = config["public"].apiUrl + "info/" + route;
            const res = await fetch(url)
                .then((response) => response.json())
                .catch((err) => {
                    console.log(err);
                });
            return res;
        },
        openModal(url) {
            // console.log(url)
            this.showImg = url;
            this.isOpen = true;
        },
    },
};
</script>
