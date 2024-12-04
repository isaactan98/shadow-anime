<template>
    <media-player :title="title" :poster="poster" :src="src" aspect-ratio="16/9" crossorigin>
        <media-outlet>
			<track v-for="s in subtitle" :src="s.url" 
				kind="subtitles"
				:label="s.lang"
				data-type="vtt" />
		</media-outlet>
        <media-community-skin></media-community-skin>
		<media-captions></media-captions>
    </media-player>
</template>

<script>
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";

import { defineCustomElements } from "vidstack/elements";

export default {
	props: {
		src: null,
		title: null,
		poster: null,
		subtitle: null,
	},
	mounted() {
		defineCustomElements();
	},
};
</script>
