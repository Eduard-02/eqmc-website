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
  detachViewportGuards()
  document.documentElement.style.overflow = ''
}

function handleEnded() { closeIntro() }

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

function onResize() { updateDeviceFlags(); updateViewportVars() }

/* ---- prevent zoom during intro (mobile) ---- */
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
function preventDefault(e){ e.preventDefault() }
function preventPinch(e){ if (e.touches && e.touches.length > 1) e.preventDefault() }
function preventDoubleTap(e){
  const now = Date.now()
  if (now - lastTouchEnd <= 300) e.preventDefault()
  lastTouchEnd = now
}

/* ---- keep buttons above browser UI using visualViewport + safe areas ---- */
let vvHandlersAttached = false
function updateViewportVars() {
  const vv = window.visualViewport
  if (!vv) return
  const bottom = Math.max(0, window.innerHeight - vv.height - vv.offsetTop)
  const top    = Math.max(0, vv.offsetTop)
  const left   = Math.max(0, vv.offsetLeft)
  const right  = Math.max(0, window.innerWidth - vv.width - vv.offsetLeft)
  const root = document.documentElement.style
  root.setProperty('--vv-bottom', bottom + 'px')
  root.setProperty('--vv-top',    top + 'px')
  root.setProperty('--vv-left',   left + 'px')
  root.setProperty('--vv-right',  right + 'px')
}
function attachViewportGuards() {
  const vv = window.visualViewport
  if (!vv || vvHandlersAttached) return
  vv.addEventListener('resize', updateViewportVars)
  vv.addEventListener('scroll', updateViewportVars)
  vvHandlersAttached = true
  updateViewportVars()
}
function detachViewportGuards() {
  const vv = window.visualViewport
  if (!vv || !vvHandlersAttached) return
  vv.removeEventListener('resize', updateViewportVars)
  vv.removeEventListener('scroll', updateViewportVars)
  vvHandlersAttached = false
}

const skipStyle = computed(() => ({
  top:  `calc(var(--vv-top, 0px)  + env(safe-area-inset-top, 0px) + 16px)`,
  right:`calc(var(--vv-right,0px) + env(safe-area-inset-right,0px) + 16px)`
}))
const muteStyle = computed(() => ({
  bottom:`calc(var(--vv-bottom,0px) + env(safe-area-inset-bottom,0px) + 20px)`,
  right: `calc(var(--vv-right,0px)  + env(safe-area-inset-right,0px)  + 20px)`
}))
const rotateStyle = computed(() => ({
  bottom:`calc(var(--vv-bottom,0px) + env(safe-area-inset-bottom,0px) + 20px)`,
  left:  `calc(var(--vv-left,0px)   + env(safe-area-inset-left,0px)   + 20px)`
}))

onMounted(() => {
  updateDeviceFlags()
  window.addEventListener('resize', onResize)
  window.addEventListener('orientationchange', onResize)

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) { show.value = false; return }

  const v = videoEl.value
  if (v) {
    const attempt = () => v.play().catch(() => {})
    v.addEventListener('loadeddata', attempt, { once: true })
    v.addEventListener('volumechange', () => { isMuted.value = v.muted })
  }

  if (isHandheld.value) {
    attachNoZoomGuards()
    attachViewportGuards()
  }
  document.documentElement.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('orientationchange', onResize)
  detachNoZoomGuards()
  detachViewportGuards()
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
      class="fixed rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white tracking-wide backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/40 z-[10001]"
      :style="skipStyle"
      @click="closeIntro"
      aria-label="Saltar introdução"
    >
      Saltar
    </button>

    <button
      class="fixed grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30 transition hover:bg-white/20 z-[10001]"
      :style="muteStyle"
      :aria-pressed="isMuted"
      :aria-label="isMuted ? 'Ativar som' : 'Silenciar'"
      @click="toggleMute"
    >
      <img v-if="isMuted" :src="volumeOff" alt="Muted" class="h-[22px] w-[22px] invert" />
      <img v-else :src="volumeOn"  alt="UnMuted" class="h-[22px] w-[22px] invert" />
    </button>

    <button
      v-if="isHandheld"
      class="fixed grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30 transition hover:bg-white/20 z-[10001]"
      :style="rotateStyle"
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
  width: 100dvh;
  height: 100dvw;
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  overflow: hidden;
}
</style>
