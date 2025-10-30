<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
const asset = (f) => `${base}assets/${f}`

const introVideo = asset('intro.mp4')
const volumeOff = asset('volume-off.png')
const volumeOn  = asset('volume-on.png')
const rotatePNG = asset('rotate.png')

const show = ref(true)
const videoEl = ref(null)
const isMuted = ref(true)

const ua = navigator.userAgent
const isIpadUA = /iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
const isAndroidTabletUA = /Android/i.test(ua) && !/Mobile/i.test(ua)
const isPhoneUA = /Mobi|iPhone|iPod/i.test(ua)

const landscapeActive = ref(false)
const isHandheld = ref(false)

const videoClass = computed(() => {
  return isHandheld.value
    ? 'w-full h-full object-contain'
    : 'w-full h-full object-contain md:object-cover'
})

function updateDeviceFlags() {
  const touch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window
  const shortSide = Math.min(window.innerWidth, window.innerHeight)
  const uaMobileish = isPhoneUA || isIpadUA || isAndroidTabletUA
  isHandheld.value = !!(touch && (uaMobileish || shortSide <= 1024))
}

function closeIntro() {
  const container = document.getElementById('introContainer')
  container?.classList.remove('simulate-landscape')
  show.value = false
  detachNoZoomGuards()
  document.documentElement.style.overflow = ''
}

function handleEnded() {
  closeIntro()
}

function toggleMute() {
  const v = videoEl.value
  if (!v) return
  isMuted.value = !isMuted.value
  v.muted = isMuted.value
  if (!isMuted.value) v.play().catch(() => {})
}

function toggleOrientation() {
  const container = document.getElementById('introContainer')
  if (!container) return
  landscapeActive.value = !landscapeActive.value
  container.classList.toggle('simulate-landscape', landscapeActive.value)
}

function onResize() {
  updateDeviceFlags()
}

let lastTouchEnd = 0
function attachNoZoomGuards() {
  const opts = { passive: false }
  document.addEventListener('gesturestart', preventDefault, opts)
  document.addEventListener('gesturechange', preventDefault, opts)
  document.addEventListener('gestureend', preventDefault, opts)
  document.addEventListener('touchmove', preventPinch, opts)
  document.addEventListener('touchend', preventDoubleTap, opts)
}
function detachNoZoomGuards() {
  document.removeEventListener('gesturestart', preventDefault)
  document.removeEventListener('gesturechange', preventDefault)
  document.removeEventListener('gestureend', preventDefault)
  document.removeEventListener('touchmove', preventPinch)
  document.removeEventListener('touchend', preventDoubleTap)
}
function preventDefault(e) { e.preventDefault() }
function preventPinch(e) { if (e.touches && e.touches.length > 1) e.preventDefault() }
function preventDoubleTap(e) {
  const now = Date.now()
  if (now - lastTouchEnd <= 300) e.preventDefault()
  lastTouchEnd = now
}

onMounted(() => {
  updateDeviceFlags()
  window.addEventListener('resize', onResize)
  window.addEventListener('orientationchange', onResize)

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    show.value = false
    return
  }

  const v = videoEl.value
  if (v) {
    const attempt = () => v.play().catch(() => {})
    v.addEventListener('loadeddata', attempt, { once: true })
    v.addEventListener('volumechange', () => { isMuted.value = v.muted })
  }

  if (isHandheld.value) attachNoZoomGuards()
  document.documentElement.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('orientationchange', onResize)
  detachNoZoomGuards()
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <div
    v-if="show"
    id="introContainer"
    class="fixed inset-0 z-[9999] grid place-items-center bg-black overflow-hidden"
    :style="isHandheld ? 'touch-action:none' : ''"
    role="dialog"
    aria-label="Website intro"
  >
    <video
      ref="videoEl"
      id="introVideo"
      :class="videoClass"
      autoplay
      muted
      playsinline
      preload="auto"
      @ended="handleEnded"
    >
      <source :src="introVideo" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <button
      class="absolute right-4 top-4 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white tracking-wide backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/40"
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
      <img v-if="isMuted" :src="volumeOff" alt="Muted" class="h-[22px] w-[22px] invert" />
      <img v-else :src="volumeOn"  alt="UnMuted" class="h-[22px] w-[22px] invert" />
    </button>

    <button
      v-if="isHandheld"
      class="fixed bottom-5 left-5 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30 transition hover:bg-white/20"
      @click="toggleOrientation"
      :aria-pressed="landscapeActive"
      :aria-label="landscapeActive ? 'Voltar a vertical' : 'Ver em horizontal'"
      :title="landscapeActive ? 'Voltar a vertical' : 'Melhor experiência na horizontal'"
    >
      <img :src="rotatePNG" alt="" class="h-[22px] w-[22px] invert" />
    </button>
  </div>
</template>

<style scoped>
.simulate-landscape {
  transform: rotate(90deg);
  transform-origin: center center;
  width: 100vh;
  height: 100vw;
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  overflow: hidden;
}
</style>