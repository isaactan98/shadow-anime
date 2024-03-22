<template>
  <div class="relative">
    <NuxtLoadingIndicator color="#c084fc" />
    <div class="relative min-h-screen bg-zinc-950">
      <Navbar />
      <NuxtLayout>
        <NuxtPage class="" />
      </NuxtLayout>
      <footer class="p-5 bg-zinc-950">
        <!-- This is an example component -->
        <div class=" bg-zinc-950 rounded-lg mx-auto">
          <div class="max-w-2xl mx-auto text-white py-5 ">
            <div class="mt-10 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
              <p class="order-2 md:order-1 mt-8 md:mt-0"> &copy; Shadow Anime <span id="year"></span> </p>
              <div class="order-1 md:order-2">
                <NuxtLink to="/about"><span class="px-2">About us</span></NuxtLink>
                <span class="px-2 border-l">Contact us</span>
                <span class="px-2 border-l">Privacy Policy</span>
              </div>
            </div>
          </div>
          <div class="text-xs text-zinc-400 container mx-auto py-5 px-5 text-center">
            This project is a non-profit project. All the content is provided by the third party. We do not own any
            of the content.
          </div>
        </div>
      </footer>
    </div>
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
    document.getElementById('year')!!.innerHTML = new Date().getFullYear().toString();
    document.querySelector('html')?.classList.remove('dark')
    // document.querySelector('html')?.classList.add('light')
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

<style>
/* width */
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #09090b;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #202020;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
