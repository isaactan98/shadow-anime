<template>
    <NuxtLink :to="'anime/' + animeInfo.id" class="relative">
        <div class="min-w-[150px] lg:min-w-[220px]">
            <img :src="animeInfo.image" loading="lazy" alt=""
                class="rounded-lg object-cover w-56 lg:w-96 h-64 lg:h-[24rem]">
        </div>
        <div class="relative flex justify-between items-center min-w-[150px] lg:min-w-[220px]">
            <div class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            </div>
            <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-3"
                v-if="animeInfo.episode || animeInfo.episodeNumber">
                EP {{ animeInfo.episode ?? animeInfo.episodeNumber }}
            </span>
        </div>
        <div class="mt-3">
            <p class="text-zinc-300 line-clamp-2">{{ animeInfo.title }}</p>
        </div>
    </NuxtLink>
</template>

<script lang="ts">
export default {
    props: {
        animeInfo: null
    }
}
</script>