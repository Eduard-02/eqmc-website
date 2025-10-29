<script setup>
const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const homeUrl = basePath ? `${basePath}/` : '/'

const resetUrl = () => {
  if (window.location.pathname !== basePath || window.location.hash) {
    window.history.replaceState(null, '', homeUrl)
  }
}

const goHome = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  resetUrl()
}

const scrollToSection = (hash) => {
  const target = document.querySelector(hash)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  resetUrl()
}
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-white/10 bg-black/30 backdrop-blur-md backdrop-saturate-150">
    <div class="container">
      <div class="flex w-full flex-col items-start gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <a href="/" @click.prevent="goHome" class="text-left text-[20px] font-extrabold tracking-[0.02em] text-highlight ">
          Estórias Que Me Contaram
        </a>
        <nav class="flex items-center gap-3">
          <a href="#sobre-livro" @click.prevent="scrollToSection('#sobre-livro')" class="btn">Sobre</a>
					<a href="#sobre-autora" @click.prevent="scrollToSection('#sobre-autora')" class="btn">Autora</a>
          <a href="#contact" @click.prevent="scrollToSection('#contact')" class="btn primary">Contacto</a>
        </nav>
      </div>
    </div>
  </header>
</template>
