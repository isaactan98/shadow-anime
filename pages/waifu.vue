<template>
    <div class="min-h-screen">
        <h1 class="text-center mt-3 text-white text-4xl">
            <button @click="switchToggle()" :class="{ 'text-red-400': selected }">Waifu</button>
        </h1>
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
            showImg: null as any,
            selected: false,
        }
    },
    async mounted() {
        await this.fetchWaifu()
    },
    methods: {
        openModal(url: string) {
            // console.log(url)
            this.showImg = url
            this.isOpen = true
        },
        switchToggle() {
            this.selected = !this.selected
            this.fetchWaifu()
        },
        async fetchWaifu() {

            let setItem = localStorage.getItem('age')

            this.waifu = []
            const apiUrl = 'https://api.waifu.im/search';

            let params = {
                included_tags: ['waifu', 'oppai'],
                limit: 20,
            } as any;

            if (this.selected) {
                let year = setItem == null ? prompt('Please enter the year of your birth') : setItem

                localStorage.setItem('age', year ?? new Date().getFullYear().toString())

                if (year!! >= '2003') {
                    alert('You are not allowed to access this page')
                    this.selected = false
                    return params = {
                        ...params,
                    }
                }

                const decodeString = atob("aGVudGFp")
                params = {
                    included_tags: [decodeString],
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
                    'Content-Type': 'application/json'
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
        }
    }
}
</script>