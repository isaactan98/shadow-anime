<template>
    <div class="w-full mx-auto">
        <UContainer>
            <div>
                <UCarousel v-slot="{ item, index }" :items="slides" indicators>
                    <img :src="item.image" class=" w-full h-[20vh]">
                </UCarousel>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            slides: [
                {
                    title: 'Slide 1',
                    description: 'Slide 1 description',
                    image: 'https://picsum.photos/1920/1080?random=1'
                },
                {
                    title: 'Slide 2',
                    description: 'Slide 2 description',
                    image: 'https://picsum.photos/1920/1080?random=2'
                },
                {
                    title: 'Slide 2',
                    description: 'Slide 2 description',
                    image: 'https://picsum.photos/1920/1080?random=3'
                },
                {
                    title: 'Slide 2',
                    description: 'Slide 2 description',
                    image: 'https://picsum.photos/1920/1080?random=1'
                },
                {
                    title: 'Slide 2',
                    description: 'Slide 2 description',
                    image: 'https://picsum.photos/1920/1080?random=1'
                },
                {
                    title: 'Slide 2',
                    description: 'Slide 2 description',
                    image: 'https://picsum.photos/1920/1080?random=1'
                },
                {
                    title: 'Slide 3',
                    description: 'Slide 3 description',
                    image: 'https://picsum.photos/1920/1080?random=1'
                }
            ]
        }
    }
}
</script>