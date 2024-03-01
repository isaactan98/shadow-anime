<template>
    <div class="relative w-2/5 md:w-1/4">
        <img :src="src" alt="" class="h-28 w-full object-cover rounded-lg">
        <span class="absolute bottom-1 left-1 text-white text-sm bg-black bg-opacity-50 px-1 rounded-md">
            EP {{ ep }}
        </span>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        src: {
            type: String,
            required: true
        },
        ep: {
            type: Number,
            required: true
        }
    }
}
</script>