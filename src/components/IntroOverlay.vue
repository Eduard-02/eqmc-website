<script setup>
	import { ref, onMounted, onBeforeUnmount } from 'vue';

	const show = ref(true)
	const videoEl = ref(null)
	const isMuted = ref(true)

	function closeIntro() {
		show.value = false
		document.documentElement.style.overflow = ""
	}

	function handleEnded() {
		closeIntro()
	}

	function toggleMute() {
		const video = videoEl.value
		if (!video) return

		isMuted.value = !isMuted.value
		video.muted = isMuted.value

		if (!isMuted.value) videoEl.play().catch(() => {})
	}

	onMounted(() => {
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

		if (prefersReduced) {
			show.value = false
			return
		}

		const v = videoEl.value
		if (v) {
			const attempt = () => v.play().catch(() => {/* ignore */})
			v.addEventListener("loadeddata", attempt, { once: true })
			v.addEventListener("volumechange", isMuted = v.value.muted)
		}

		document.documentElement.style.overflow = "hidden"
	})

	onBeforeUnmount(() => {
		document.documentElement.style.overflow = ""
	})
</script>

<template>
	<div v-if="show" class="intro-overlay" role="dialog" aria-label="Website intro">
		<video 
			ref="videoEl"
			class="intro-video"
			autoplay
			muted
			playsinline
			preload="auto"
			@ended="handleEnded"
		>
			<source src="/src/assets/intro.mp4" type="video/mp4"/>
			<!-- Fallback text -->
			Your browser does not support the video tag.
		</video>

		<button class="skip" @click="closeIntro" aria-label="Saltar introdução">Saltar</button>
		<button 
			class="audio" 
			:aria-pressed="isMuted"
			:aria-label="isMuted ? 'Ativar som' : 'Silenciar'"
			@click="toggleMute"
		>
			<img
				v-if="isMuted"
				src="/src/assets/volume-off.png" 
				alt="Muted"
			/>
			<img
				v-else
				src="/src/assets/volume-on.png" 
				alt="UnMuted"
			/>
		</button>
	</div>
</template>

<style scoped>
	.intro-overlay {
		position: fixed; inset: 0;
		z-index: 9999;
		background: #2A2936;
		display: grid;
		place-items: center;
	}
	.intro-video {
		width: 100vw;
		height: 100vh;
		object-fit: cover;
	}

	/* Skip button */
	.skip {
		position: absolute; right: 20px; top: 20 px;
		padding: 10px 14px;
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, .2);
		background: linear-gradient(90deg, var(--accent), var(--accent-2));
		color: #2A2936;
		font-weight: 700;
		cursor: pointer;
	}
	.skip:focus { outline: 2px solid white; outline-offset: 2px; }
	.audio {
		position: absolute;
		right: 20px;
		bottom: 20px;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.3);
		background: rgba(0, 0, 0, 0.3);
		display: grid;
		place-items: center;
		cursor: pointer;
		z-index: 2;
	}
	.audio img {
		width: 22px;
		height: 22px;
		filter: brightness(1.6);
	}
	.audio:hover {
		background: rgba(255, 255, 255, 0.2);
	}
</style>