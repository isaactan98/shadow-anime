<template>
  <div class="sticky w-full top-0 z-50">
    <nav class="backdrop-blur-sm bg-black/20 w-full mx-auto">
      <UContainer>
        <!-- mobile -->
        <div
            class="relative w-full flex justify-between items-center gap-1.5 p-2 rounded-md font-medium text-sm md:hidden">
          <div class="flex items-center">
            <UButton label="Open" :padded="false" color="black" variant="ghost" @click="isOpen = true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"/>
              </svg>
            </UButton>
          </div>
          <div class="flex items-center">
            <UButton color="gray" variant="ghost" @click="openSearch = true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
              </svg>
            </UButton>
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
              </svg>
            </UButton>
            <UDropdown v-if="user.isLoggedIn" :items="items" :popper="{ offsetDistance: 15 }"
                       :ui="{ ring: 'ring-0', background: 'bg-zinc-800', item: { inactive: 'text-white', active: '', hover: 'bg-zinc-900' }}">
              <UAvatar
                  src="https://s1.zerochan.net/Delta.%28Kage.No.Jitsuryokusha.Ni.Naritakute%29.600.3834699.jpg"/>
            </UDropdown>
            <UButton v-if="!user.isLoggedIn" label="Login" color="purple" variant="ghost"
                     @click="openLoginSignUp = true"/>
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
                     @click="isOpen = false"/>
          </div>
        </template>
        <Placeholder class="h-full">
          <UVerticalNavigation :links="mobileLinks" class="mt-3"
                               :ui="{ padding: '!py-2.5', active: 'text-purple-500', size: 'text-base' }"
                               @click="isOpen = false"/>
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
    <UModal v-model="openLoginSignUp"
            :ui="{ container: 'items-center', background: 'bg-zinc-900', overlay: { background: 'bg-black/80' } }">
      <UCard :ui="{background:'bg-zinc-900', ring: 'ring-0', divide: 'divide-y-0' }">
        <template #header>
          <h5 class="text-base font-semibold leading-6 text-white divide-">
            {{ loginOrSignUp ? 'Sign Up' : 'Login' }}
          </h5>
        </template>
        <form class="text-center text-white" @submit.prevent="submitLoginSignUp()">
          <UInput class="pb-3" variant="none" placeholder="email" v-model="email"/>
          <UInput class="pb-3" type="password" color="gray" variant="none" placeholder="password" v-model="password"/>
          <UButton :loading="isLoading" type="submit" class="bg-purple-500 px-3 py-2 text-xs rounded">
            {{ loginOrSignUp ? 'Sign Up' : 'Login' }}
          </UButton>
        </form>
        <template #footer>
          <div class="text-center">
            <div class="text-white" v-if="!loginOrSignUp">Don't have a account?
              <button class="text-purple-500" @click="loginOrSignUp = true">Sign up here</button>
            </div>
            <div class="text-white" v-if="loginOrSignUp">Already have an account?
              <button class="text-purple-500" @click="loginOrSignUp = false">Login here</button>
            </div>
          </div>
          <div v-if="errorMessage" class="w-full text-center text-red-500 mt-4 text-sm">
            {{ errorMessage }}
          </div>
          <div v-if="signUpDetails.hasSignUp" class="w-full text-center text-green-500 mt-4 text-sm">
            {{ signUpDetails.message }}
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts">
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut
} from "@firebase/auth";
import {getAuth} from "firebase/auth";
import {setAuth} from "~/composables/firebase-utils";

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
      mobileLinks: [[{
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
      }], [
        {
          label: 'Login',
          icon: 'i-heroicons-command-line',
          click: () => this.openLoginSignUp = true
        }
      ]],
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
            // console.log('Edit')
          }
        }, {
          label: 'Duplicate',
          icon: 'i-heroicons-document-duplicate-20-solid',
          shortcuts: ['D'],
          disabled: true
        }], [{
          label: 'Logout',
          icon: 'i-heroicons-trash-20-solid',
          click: () => {
            // console.log('logout')
            this.logoutFunc()
          }
        }]
      ],
      openLoginSignUp: false,
      loginOrSignUp: false,
      email: "",
      password: "",
      errorMessage: "",
      isLoading: false,
      user: {
        isLoggedIn: false,
        details: null
      },
      signUpDetails: {
        hasSignUp: false,
        message: ""
      }
    }
  },
  async mounted() {
    await setAuth()
    if (getAuth().currentUser?.emailVerified) {
      this.user.isLoggedIn = isLoggedIn
      this.user.details = getAuth().currentUser
    }
    // console.log(this.user.details)
  },
  methods: {
    searchAnime() {
      // console.log(this.searchAnimeName)

      if (this.searchAnimeName == "routoon") {
        window.location.href = "https://routoon.vercel.app";
        return
      }

      // console.log('search')
      this.openSearch = false
      this.searchAnimeName = this.searchAnimeName.replace(/\s/g, '-')
      window.location.href = `/search?q=${this.searchAnimeName}`
      // this.$router.push(`/search?q=${this.searchAnimeName}`)
    },
    submitLoginSignUp() {
      this.isLoading = true
      if (this.loginOrSignUp) {
        //   sign up
        this.signUpFunction()
      } else if (!this.loginOrSignUp) {
        //   login
        this.loginFunction()
      } else {
        //   do nothing
      }
    },
    loginFunction() {
      // console.log('login')
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            if (userCredential.user.emailVerified) {
              const user = userCredential.user;
              // console.log(user)
              sessionStorage.setItem('userId', user.uid)
              window.location.href = '/'
            } else {
              this.errorMessage = "Your email address has not been verified. Please check your inbox for the verification email and follow the instructions to verify your email."
              signOut(auth)
            }
          })
          .catch((error) => {
            // console.log('error: ', error)
            const errorCode = error.code;
            const errorMessage = error.message;

            this.errorMessage = errorMessage

            // console.log(errorCode, errorMessage)

          }).finally(() => {
        this.isLoading = false
      });
    },
    signUpFunction() {
      // console.log('sign up', this.email, this.password)
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(async (userCredential) => {
            this.signUpDetails.hasSignUp = true
            await sendEmailVerification(userCredential.user).then(() => {
              this.signUpDetails.message = "A verification email has been sent to your registered email address. Please check your email and follow the instructions to verify your account before logging in.";
              setTimeout(() => {
                this.signUpDetails.hasSignUp = false
              }, 5000)
            })

            // Signed in
            // const user = userCredential.user;
            // // console.log(user)
            // sessionStorage.setItem('userId', user.uid)
            // window.location.href = '/'

          })
          .catch((error) => {
            // console.log('error sign up: ', error)
            const errorCode = error.code;
            // console.log(errorCode, errorMessage)
            this.errorMessage = error.message
          }).finally(() => {
        this.isLoading = false
      });
    },
    logoutFunc() {
      const auth = getAuth();
      signOut(auth).then(() => {
        sessionStorage.removeItem('userId')
        window.location.href = '/'
      }).catch((error) => {
        // console.log(error)
      });
    }
  }
}
</script>