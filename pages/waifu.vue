<template>
    <div class="min-h-screen">
        <h1 class="text-center mt-3 text-white text-4xl">Waifu</h1>
        <div v-if="waifu">
            <UContainer>
                <div class="flex flex-col items-center">
                    <div class="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <UButton v-for="(w, i) in waifu.files" :key="i" class="relative" @click="openModal(w)"
                            color="purple" variant="ghost">
                            <img :src="w" loading="lazy" alt="" class="rounded-lg object-cover w-56 h-64">
                        </UButton>
                    </div>
                </div>
            </UContainer>
            <UModal v-model="isOpen" :ui="{ overlay: { background: 'bg-zinc-800/80' } }">
                <div class="p-1">
                    <img :src="showImg" alt="" class="rounded-lg object-cover">
                </div>
            </UModal>
        </div>
        <div v-else class="w-full flex justify-center mt-5">
            <SpiningLoading></SpiningLoading>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            waifu: null as any,
            loading: false,
            isOpen: false,
            showImg: null as any
        }
    },
    async mounted() {
        const params = this.$route.query.type ?? 'sfw'
        await fetch(`https://api.waifu.pics/many/${params}/waifu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: [
                    "https://i.waifu.pics/qUY7BBo.jpg"
                ]
            }),
        })
            .then(response => response.json())
            .then(data => {
                // console.log('data', data)
                this.waifu = data
            })
            .catch(err => {
                console.log(err)
            });
    },
    methods: {
        openModal(url: string) {
            // console.log(url)
            this.showImg = url
            this.isOpen = true
        }
    }
}
</script>