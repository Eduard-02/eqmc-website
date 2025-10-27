<script setup>
	import { ref, onMounted, onBeforeUnmount } from 'vue';

	const base = import.meta.env.BASE_URL.endsWith('/')
		? import.meta.env.BASE_URL
		: `${import.meta.env.BASE_URL}/`
	const asset = (file) => `${base}assets/${file}`
	const introVideo = asset('intro.mp4')
	const volumeOff = asset('volume-off.png')
	const volumeOn = asset('volume-on.png')

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

		if (!isMuted.value) video.play().catch(() => {})
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
			v.addEventListener("volumechange", () => {
				isMuted.value = v.muted
			})
		}

		document.documentElement.style.overflow = "hidden"
	})

	onBeforeUnmount(() => {
		document.documentElement.style.overflow = ""
	})
</script>

<template>
	<div
		v-if="show"
		class="fixed inset-0 z-[9999] grid place-items-center bg-[#2A2936]"
		role="dialog"
		aria-label="Website intro"
	>
		<video 
			ref="videoEl"
			class="h-screen w-screen object-contain object-center md:object-cover"
			autoplay
			muted
			playsinline
			preload="auto"
			@ended="handleEnded"
		>
			<source :src="introVideo" type="video/mp4"/>
			<!-- Fallback text -->
			Your browser does not support the video tag.
		</video>

		<button
			class="absolute right-5 top-5 rounded-xl border border-white/20 bg-gradient-to-r from-accent to-accent2 px-4 py-2 font-semibold text-[#2A2936] transition hover:opacity-90 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
			@click="closeIntro"
			aria-label="Saltar introdução"
		>
			Saltar
		</button>
		<button 
			class="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30 transition hover:bg-white/20"
			:aria-pressed="isMuted"
			:aria-label="isMuted ? 'Ativar som' : 'Silenciar'"
			@click="toggleMute"
		>
			<img
				v-if="isMuted"
				:src="volumeOff" 
				alt="Muted"
				class="h-[22px] w-[22px] invert"
			/>
			<img
				v-else
				:src="volumeOn" 
				alt="UnMuted"
				class="h-[22px] w-[22px] invert"
			/>
		</button>
	</div>
</template>
