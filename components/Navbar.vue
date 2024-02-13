<template>
    <div class="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/60 w-full mx-auto">
        <UContainer>
            <div
                class="group relative w-full flex justify-between items-center gap-1.5 px-2 py-3.5 rounded-md font-medium text-sm md:hidden">
                <div class="flex items-center">
                    <UButton label="Open" :padded="false" color="" @click="isOpen = true">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                        </svg>
                    </UButton>
                </div>
                <div class="flex items-center">
                    <UDropdown :items="items" :popper="{ offsetDistance: 15 }" :ui="{
                        background: 'bg-zinc-800', item: {
                            inactive: 'text-white', active: '', hover: 'bg-zinc-900'
                        }
                    }">
                        <UAvatar
                            src="https://s1.zerochan.net/Delta.%28Kage.No.Jitsuryokusha.Ni.Naritakute%29.600.3834699.jpg" />
                    </UDropdown>
                </div>
            </div>
            <UHorizontalNavigation class="hidden md:flex" :links="navLinks"
                :ui="{ active: '!text-purple-500 after:!bg-purple-500', icon: { active: '!text-purple-500' }, before: 'hover:before:bg-transparent' }">
                <template #default="{ link }">
                    <div v-if="link.label == 'Profile'">
                        <UDropdown :items="items" :popper="{ offsetDistance: 15 }" :ui="{
                            background: 'bg-zinc-800', item: {
                                inactive: 'text-white', active: '', hover: 'bg-zinc-900'
                            }
                        }">
                            <UAvatar
                                src="https://s1.zerochan.net/Delta.%28Kage.No.Jitsuryokusha.Ni.Naritakute%29.600.3834699.jpg" />
                        </UDropdown>
                    </div>
                </template>
            </UHorizontalNavigation>
        </UContainer>
    </div>
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
                <UVerticalNavigation :links="mobileLinks" class="mt-3" :ui="{ active: 'text-purple-500' }"
                    @click="isOpen = false" />
            </Placeholder>
        </UCard>
    </USlideover>
</template>

<script lang="ts">
export default {
    data() {
        return {
            isOpen: false,
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
            }], [{
                label: 'Profile',
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
}
</script>