<template>
    <div class="container p-4 mx-auto min-h-screen">
        <div v-if="manga != null" class="">
            <div>
                <img :src="imageProxy(manga.image)" alt="" class="rounded-2xl w-full">
            </div>
            <div class="text-white mt-3">
                <h1 class="font-bold text-xl">
                    {{ checkNull(manga.title.english) ? manga.title.english : manga.title.romaji }}
                </h1>
                <div class="md:w-full mx-auto py-3 my-3 px-5 text-white bg-slate-800 rounded-xl" v-if="manga.genres">
                    <div class="font-bold">Genres:</div>
                    <div v-for="g in manga.genres" :key="g" class="inline-block mr-2 text-sm" :id="g"
                        :style="'color:' + randomColor(g)">
                        {{ g }}
                    </div>
                </div>
                <div v-if="manga.status">
                    <span>Status:</span><span class="ml-2">{{ manga.status }}</span>
                </div>
                <p class="max-h-56 overflow-y-auto mt-3 text-zinc-400 text-justify text-sm">
                    {{ manga.description.en ? manga.description.en : manga.description }}
                </p>
            </div>

            <div class="text-white my-3">
                <h1 class=" font-bold">Chapters:</h1>
                <div class="grid grid-cols-3 gap-2 mt-2">
                    <!-- <NuxtLink v-for="chp in manga.chapters" :key="chp" :to="'/manga/' + manga.id + '/' + chp.id" -->
                    <NuxtLink v-for="chp in manga.chapters" :key="chp" :to="'/manga/' + $route.params.info + '/' + chp.id"
                        class=" bg-zinc-500 py-3 px-4 rounded-md text-sm">
                        {{ chp.title ? chp.title : "No Title" }}
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div v-else class="w-full flex justify-center mt-5">
            <SpiningLoading></SpiningLoading>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            manga: null,
            id: null,
            loading: true,
        }
    },
    mounted() {
        this.id = this.$route.params.info
        this.getMangaInfo(this.id)
    },
    methods: {
        async getMangaInfo(id) {
            const config = useRuntimeConfig();
            const mangaApi = config['public'].mangaApi
            await fetch(`${mangaApi}info/${id}?provider=mangadex`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    this.manga = data
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                })
        },
        randomColor() {
            var letters = 'BCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
            // return '#' + Math.floor(Math.random() * 16777215).toString(16);
        },
    },
}
</script>

<style></style>