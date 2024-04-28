<template>
    <div class="min-h-screen">
        <h1 class="text-center mt-3 text-white text-4xl">Waifu</h1>
        <div v-if="waifu">
            <UContainer>
                <div class="flex flex-col items-center">
                    <div class="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <UButton v-for="(w, i) in waifu" :key="i" class="relative" @click="openModal(w.url)"
                            color="purple" variant="ghost">
                            <img :src="w.url" loading="lazy" alt="" class="rounded-lg object-cover w-56 h-64">
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
        const apiUrl = 'https://api.waifu.im/search';

        let params = {
            included_tags: ['waifu', 'oppai'],
            limit: 20,
        } as any;

        if (this.$route.query.type != null) {
            params = {
                included_tags: ['waifu', 'oppai'],
                limit: 20,
                is_nsfw: true,
            }
        } else {
            params = {
                ...params,
            }
        }

        const queryParams = new URLSearchParams();

        for (const key in params) {
            if (Array.isArray(params[key])) {
                params[key].forEach(value => {
                    queryParams.append(key, value);
                });
            } else {
                queryParams.set(key, params[key]);
            }
        }
        const requestUrl = `${apiUrl}?${queryParams.toString()}`;

        await fetch(`${requestUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': "NTA0Mjc1NDE1Nzg3ODk2ODU5.MTcwNTY2NTU0MQ--.44b0bd21a",
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log('data', data)
                this.waifu = data.images
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