<script setup>
const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const homeUrl = basePath ? `${basePath}/` : '/'

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  if (window.location.pathname !== basePath || window.location.hash) {
    window.history.replaceState(null, '', homeUrl)
  }
}
</script>

<template>
	<footer class="border-t border-border !text-white pb-[calc(14px+env(safe-area-inset-bottom))]">
			<div class="container">
				<div class="flex flex-col gap-2 py-6 text-base sm:flex-row sm:items-center sm:justify-between">
					<span class="!text-white">© {{ new Date().getFullYear() }} Eduardo Cebola. Todos os direitos reservados.</span>
					<span>
						<button
							type="button"
							class="!text-white appearance-none border-none bg-transparent p-0 transition-opacity duration-150 hover:opacity-80"
							@click="scrollTop"
						>
							Topo ↑
						</button>
					</span>
				</div>
			</div>
	</footer>
</template>
