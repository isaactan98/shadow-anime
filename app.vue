<template>
  <div class="min-h-screen" style="background-color: #15151d;">
    <div class="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/60 w-full mx-auto">
      <UContainer>
        <UHorizontalNavigation :links="navLinks"
          :ui="{ active: 'text-purple-500 after:bg-purple-500', icon: { active: 'text-purple-500' }, before: 'hover:before:bg-transparent' }">
          <template #default="{ link }">
            <div v-if="link.label == 'Profile'">
              <UDropdown :items="items" :popper="{ offsetDistance: 15 }">
                <UAvatar src="https://s1.zerochan.net/Delta.%28Kage.No.Jitsuryokusha.Ni.Naritakute%29.600.3834699.jpg" />
              </UDropdown>
            </div>
          </template>
        </UHorizontalNavigation>
      </UContainer>
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
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
      }], [{
        label: 'Profile',
      }]],
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
    useHead({
      title: 'Home',
      meta: [
        {
          name: 'description',
          content: 'Home page description'
        }
      ]
    })
  },
}
</script>