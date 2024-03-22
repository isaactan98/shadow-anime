<template>
    <NuxtLink v-if="data.type == 'TV' || data.type == 'MOVIE' || data.type == 'OVA' || data.type == 'ONA' || data.type == 'SPECIAL' || data.type == 'MUSIC'"
        :to="'/anime/' + id + '?externalId=' + externalId" class="relative snap-start mb-3">
        <div class="w-[150px] lg:w-[220px]">
            <img :src="image" loading="lazy" alt="" class="rounded-lg object-cover w-56 lg:w-96 h-64 lg:h-[24rem]">
        </div>
        <div class="relative flex justify-between items-center w-[150px] lg:w-[220px]">
            <div class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            </div>
            <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-3" v-if="episode">
                EP {{ episode }}
            </span>
        </div>
        <div class="mt-3 w-[150px] lg:w-[220px]">
            <title class="text-zinc-300 line-clamp-2">{{ title }}</title>
        </div>
    </NuxtLink>
    <NuxtLink v-else-if="data.type == 'MANGA'" class="relative snap-start mb-3" :to="'/manga/' + externalId">
        <div class="w-[150px] lg:w-[220px]">
            <img :src="image" loading="lazy" alt="" class="rounded-lg object-cover w-56 lg:w-96 h-64 lg:h-[24rem]">
        </div>
        <div class="relative flex justify-between items-center w-[150px] lg:w-[220px]">
            <div class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            </div>
        </div>
        <div class="mt-3 w-[150px] lg:w-[220px]">
            <title class="text-zinc-300 line-clamp-2">{{ title }}</title>
        </div>
    </NuxtLink>
    <div v-else class="relative snap-start mb-3">
        <div class="w-[150px] lg:w-[220px]">
            <img :src="image" loading="lazy" alt="" class="rounded-lg object-cover w-56 lg:w-96 h-64 lg:h-[24rem]">
        </div>
        <div class="relative flex justify-between items-center w-[150px] lg:w-[220px]">
            <div class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            </div>
            <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-3" v-if="episode">
                EP {{ episode }}
            </span>
        </div>
        <div class="mt-3 w-[150px] lg:w-[220px]">
            <title class="text-zinc-300 line-clamp-2">{{ title }}</title>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        id: null,
        image: null,
        episode: null,
        title: null,
        externalId: null,
        data: null
    }
}
</script>