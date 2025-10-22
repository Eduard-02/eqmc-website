<script setup>
	import { onMounted } from 'vue'
	import IntroOverlay from './components/IntroOverlay.vue'
	import Header from './components/Header.vue'
	import About from './sections/About.vue'
	import Contact from './sections/Contact.vue'
	import Footer from './components/Footer.vue'

	if ("scrollRestoration" in history) history.scrollRestoration = "manual"
	onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <div id="top">
		<IntroOverlay />
    <Header />
    <main>
      <About />
      <Contact />
    </main>
    <Footer />
  </div>
</template>
