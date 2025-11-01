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
const videoBoxEl = ref(null)
const isMuted = ref(true)

const ua = navigator.userAgent
const isIpadUA = /iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
const isAndroidTabletUA = /Android/i.test(ua) && !/Mobile/i.test(ua)
const isPhoneUA = /Mobi|iPhone|iPod/i.test(ua)

const landscapeActive = ref(false)
const isHandheld = ref(false)

function updateDeviceFlags() {
  const touch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window
  const shortSide = Math.min(window.innerWidth, window.innerHeight)
  const uaMobileish = isPhoneUA || isIpadUA || isAndroidTabletUA
  isHandheld.value = !!(touch && (uaMobileish || shortSide <= 1024))
}

function layoutVideoBox() {
  if (isHandheld.value) return
  const box = videoBoxEl.value
  const v = videoEl.value
  if (!box || !v || !v.videoWidth || !v.videoHeight) return
  const ar = v.videoWidth / v.videoHeight
  const w = window.innerWidth
  const h = window.innerHeight
  if (w / h > ar) {
    const hh = Math.min(h, window.innerHeight)
    const ww = hh * ar
    box.style.width = `${ww}px`
    box.style.height = `${hh}px`
  } else {
    const ww = Math.min(w, window.innerWidth)
    const hh = ww / ar
    box.style.width = `${ww}px`
    box.style.height = `${hh}px`
  }
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

function onResize() {
  updateDeviceFlags()
  updateViewportVars()
  layoutVideoBox()
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
function preventDefault(e){ e.preventDefault() }
function preventPinch(e){ if (e.touches && e.touches.length > 1) e.preventDefault() }
function preventDoubleTap(e){
  const now = Date.now()
  if (now - lastTouchEnd <= 300) e.preventDefault()
  lastTouchEnd = now
}

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
    v.addEventListener('loadedmetadata', () => { attempt(); layoutVideoBox() }, { once: true })
    v.addEventListener('volumechange', () => { isMuted.value = v.muted })
  }

  if (isHandheld.value) {
    attachNoZoomGuards()
    attachViewportGuards()
  }
  document.documentElement.style.overflow = 'hidden'
  layoutVideoBox()
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
    class="fixed left-0 top-0 z-[9999] w-[100dvw] h-[100dvh] grid place-items-center bg-black overflow-hidden"
    :style="isHandheld ? 'touch-action:none' : ''"
    role="dialog"
    aria-label="Website intro"
  >
    <div ref="videoBoxEl" id="videoBox" class="relative flex items-center justify-center w-[100dvw] h-[100dvh]">
      <video
        ref="videoEl"
        id="introVideo"
        class="block w-full h-full object-contain bg-black"
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
        v-if="!isHandheld"
        class="absolute right-4 top-4 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white tracking-wide backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/40 z-[10001]"
        @click="closeIntro"
        aria-label="Saltar introdução"
      >
        Saltar
      </button>

      <button
        v-if="!isHandheld"
        class="absolute right-5 bottom-5 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30 transition hover:bg-white/20 z-[10001]"
        :aria-pressed="isMuted"
        :aria-label="isMuted ? 'Ativar som' : 'Silenciar'"
        @click="toggleMute"
      >
        <img v-if="isMuted" :src="volumeOff" alt="Muted" class="h-[22px] w-[22px] invert" />
        <img v-else :src="volumeOn" alt="UnMuted" class="h-[22px] w-[22px] invert" />
      </button>
    </div>

    <button
      v-if="isHandheld"
      class="fixed rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white tracking-wide backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/40 z-[10001]"
      :style="skipStyle"
      @click="closeIntro"
      aria-label="Saltar introdução"
    >
      Saltar
    </button>

    <button
      v-if="isHandheld"
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

.simulate-landscape #videoBox {
  width: 100%;
  height: 100%;
}

.simulate-landscape #introVideo {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}
</style>
