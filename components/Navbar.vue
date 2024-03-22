<template>
    <div class="sticky w-full top-0 z-50">
        <nav class="backdrop-blur-sm bg-black/20 w-full mx-auto">
            <UContainer>
                <!-- mobile -->
                <div
                    class="relative w-full flex justify-between items-center gap-1.5 px-2 py-3.5 rounded-md font-medium text-sm md:hidden">
                    <div class="flex items-center">
                        <UButton label="Open" :padded="false" color="black" variant="ghost" @click="isOpen = true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                            </svg>
                        </UButton>
                    </div>
                    <div class="flex items-center">
                        <UButton color="gray" variant="ghost" @click="openSearch = true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </UButton>
                        <!-- <UDropdown :items="items" :popper="{ offsetDistance: 15 }"
                        :ui="{ ring: 'ring-0', background: 'bg-zinc-800', item: { inactive: 'text-white', active: '', hover: 'bg-zinc-900' } }">
                        <UAvatar
                            src="https://s1.zerochan.net/Delta.%28Kage.No.Jitsuryokusha.Ni.Naritakute%29.600.3834699.jpg" />
                    </UDropdown> -->
                    </div>
                </div>
                <!-- PC -->
                <div class="hidden md:flex justify-between">
                    <UHorizontalNavigation class="hidden md:flex" :links="navLinks"
                        :ui="{ active: '!text-purple-500 after:!bg-purple-500', inactive: 'text-zinc-200 hover:text-purple-500', icon: { inactive: 'text-zinc-200 group-hover:text-purple-500', active: '!text-purple-500' }, before: 'hover:before:bg-transparent' }">
                    </UHorizontalNavigation>
                    <div class="flex items-center gap-3">
                        <UButton color="gray" variant="ghost" @click="openSearch = true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </UButton>
                        <!-- <UDropdown :items="items" :popper="{ offsetDistance: 15 }" :ui="{
                        ring: 'ring-0',
                        background: 'bg-zinc-800', item: {
                            inactive: 'text-white', active: '', hover: 'bg-zinc-900'
                        }
                    }">
                        <UAvatar
                            src="https://s1.zerochan.net/Delta.%28Kage.No.Jitsuryokusha.Ni.Naritakute%29.600.3834699.jpg" />
                    </UDropdown> -->
                    </div>
                </div>
            </UContainer>
        </nav>
        <USlideover v-model="isOpen" side="left">
            <UCard class="flex flex-col flex-1 bg-zinc-900 rounded-none"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-white">
                            Navigation
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>
                <Placeholder class="h-full">
                    <UVerticalNavigation :links="mobileLinks" class="mt-3"
                        :ui="{ padding: '!py-2.5', active: 'text-purple-500', size: 'text-base' }"
                        @click="isOpen = false" />
                </Placeholder>
            </UCard>
        </USlideover>
        <UModal v-model="openSearch"
            :ui="{ container: 'items-center', background: 'bg-zinc-900', overlay: { background: 'bg-black/80' } }">
            <div class="p-5">
                <form class="flex items-center gap-3" @submit.prevent="searchAnime()">
                    <input type="text" name="" id="" v-model="searchAnimeName" placeholder="Search Anime..."
                        class="p-2 bg-transparent w-full text-zinc-200">
                    <button type="submit" class="hidden"></button>
                </form>
            </div>
        </UModal>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            isOpen: false,
            openSearch: false,
            searchAnimeName: '',
            navLinks: [[{
                label: 'Home',
                icon: 'i-heroicons-home',
                to: '/'
            }, {
                label: 'About',
                icon: 'i-heroicons-chart-bar',
                to: '/about'
            }, {
                label: 'Manga',
                icon: 'i-heroicons-command-line',
                to: '/manga'
            }, {
                label: 'News',
                icon: 'i-heroicons-command-line',
                to: '/news'
            }, {
                label: 'Waifu',
                icon: 'i-heroicons-command-line',
                to: '/waifu'
            }]],
            mobileLinks: [{
                label: 'Home',
                icon: 'i-heroicons-home',
                to: '/'
            }, {
                label: 'About',
                icon: 'i-heroicons-chart-bar',
                to: '/about'
            }, {
                label: 'Manga',
                icon: 'i-heroicons-command-line',
                to: '/manga'
            }, {
                label: 'News',
                icon: 'i-heroicons-command-line',
                to: '/news'
            }, {
                label: 'Waifu',
                icon: 'i-heroicons-command-line',
                to: '/waifu'
            }],
            items: [
                [{
                    label: 'Profile',
                    avatar: {
                        src: 'https://s1.zerochan.net/Delta.%28Kage.No.Jitsuryokusha.Ni.Naritakute%29.600.3834699.jpg'
                    }
                }], [{
                    label: 'Edit',
                    icon: 'i-heroicons-pencil-square-20-solid',
                    shortcuts: ['E'],
                    click: () => {
                        console.log('Edit')
                    }
                }, {
                    label: 'Duplicate',
                    icon: 'i-heroicons-document-duplicate-20-solid',
                    shortcuts: ['D'],
                    disabled: true
                }], [{
                    label: 'Archive',
                    icon: 'i-heroicons-archive-box-20-solid'
                }, {
                    label: 'Move',
                    icon: 'i-heroicons-arrow-right-circle-20-solid'
                }], [{
                    label: 'Delete',
                    icon: 'i-heroicons-trash-20-solid',
                    shortcuts: ['⌘', 'D']
                }]
            ]
        }
    },
    mounted() {

    },
    methods: {
        searchAnime() {
            console.log('search')
            this.openSearch = false
            window.location.href = `/search?q=${this.searchAnimeName}`
            // this.$router.push(`/search?q=${this.searchAnimeName}`)
        }
    }
}
</script>