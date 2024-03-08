<template>
    <UContainer>
        <div class="relative">
            <div v-if="chapter">
                <img v-for="c in chapter" :key="c" :src="imageProxy(c.img)" alt="" class="w-full">
            </div>
            <div v-else class="w-full min-h-screen flex justify-center mt-5">
                <SpiningLoading></SpiningLoading>
            </div>
            <div class="w-full text-base flex gap-3 justify-center mt-5" v-if="manga != null">
                <NuxtLink class="text-white px-4 py-2 bg-zinc-500 hover:bg-zinc-700 rounded-full"
                    :to="`/manga/${manga.id}`">
                    Main
                </NuxtLink>
                <NuxtLink v-if="nextChapter" class="text-white px-4 py-2 bg-zinc-500 hover:bg-zinc-700 rounded-full"
                    :to="'/manga/' + $route.params.manga + '/' + goNextInfo.id">
                    Next: <span class="font-bold">{{ goNextInfo.title }}</span>
                </NuxtLink>
            </div>
        </div>
    </UContainer>
    <div v-if="manga" class="fixed bottom-0 w-full text-center">
        <div class="p-1 text-sm bg-white">{{ getCurrentChapterInfo().title }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chapter: null,
            loading: true,
            thisChapter: null,
            nextChapter: null,
            manga: null,
            mangaApi: "",
            goNextInfo: null
        }
    },
    mounted() {
        const config = useRuntimeConfig();
        this.mangaApi = config['public'].mangaApi
        this.getMangaInfo()
        this.getChapter()
    },
    methods: {
        async getMangaInfo() {
            await fetch(`${this.mangaApi}info/${this.$route.params.manga}?provider=mangadex`)
                .then(res => res.json())
                .then(data => {
                    // console.log("info", data, this.$route.params)
                    this.manga = data
                    this.thisChapter = data.chapters.findIndex(x => x.id === this.$route.params.volume)
                    this.nextChapter = this.hasNextChapter(data.chapters, this.thisChapter)
                    // console.log("next chapter", this.nextChapter)
                    this.goNextInfo = data.chapters[this.thisChapter - 1]
                })
        },
        async getChapter() {
            await fetch(`${this.mangaApi}read/${this.$route.params.volume}?provider=mangadex`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    this.chapter = data
                    this.loading = false
                })
        },
        filterFilter(arr, expression) {
            return arr.filter(function (item) {
                return item[Object.keys(expression)[0]] == Object.values(expression)[0];
            });
        },
        hasNextChapter(chapters, chapterIndex) {
            const nextChapter = chapters[chapterIndex - 1];

            if (nextChapter) {
                return true;
            } else {
                return false;
            }
        },
        getCurrentChapterInfo() {
            return this.manga.chapters.find(x => x.id === this.$route.params.volume)
        }
    },
}
</script>

<style></style>