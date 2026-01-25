<script setup>
import { reactive, ref, watch } from 'vue'

const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const defaultEndpoint = '/api/contact'
const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT?.replace(/\/$/, '') || defaultEndpoint
const instaImg = `${basePath}/assets/insta.png`
const instaLogo = `${basePath}/assets/insta-logo.png`
const facebookLogo = `${basePath}/assets/facebook-logo.png`

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const status = ref('idle')

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}

watch(
  () => [form.name, form.email, form.subject, form.message],
  () => {
    if (status.value === 'error') {
      status.value = 'idle'
    }
  },
)

const handleSubmit = async () => {
  if (status.value === 'pending') return
  status.value = 'pending'

  const payload = {
    name: form.name.trim(),
    email: form.email.trim(),
    subject: form.subject.trim() || form.name.trim(),
    message: form.message.trim(),
  }

  if (!payload.name || !payload.email || !payload.message) {
    status.value = 'error'
    return
  }

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    status.value = 'success'
    resetForm()
    setTimeout(() => {
      if (status.value === 'success') {
        status.value = 'idle'
      }
    }, 6000)
  } catch (error) {
    console.error(error)
    status.value = 'error'
  }
}
</script>

<template>
	<section id="contact" class="py-6">
		<div class="container">
			<div class="grid items-start gap-8 md:grid-cols-2 lg:gap-12">

				<div
					class="w-full rounded-2xl p-5 sm:p-7 lg:p-8"
				>
					<div class="space-y-5 text-center">
						<h2 class="font-script text-[46px] text-highlight">Contacto</h2>
						<p class="mx-auto max-w-[70ch] text-[18px] text-[#d7dbf2]">
							Para mais informações e outros assuntos, preencha o formulário abaixo.
						</p>
					</div>

					<form
						@submit.prevent="handleSubmit"
						class="mx-auto mt-6 flex w-full max-w-[640px] flex-col gap-3 text-left"
					>
						<label class="grid gap-1.5">
							<span>Nome</span>
							<input
								type="text"
								name="name"
								v-model="form.name"
								required
								class="w-full rounded-xl border border-border bg-card px-3 py-2 text-text"
							/>
						</label>

						<label class="grid gap-1.5">
							<span>Email</span>
							<input
								type="email"
								name="email"
								v-model="form.email"
								required
								class="w-full rounded-xl border border-border bg-card px-3 py-2 text-text"
							/>
						</label>

						<label class="grid gap-1.5">
							<span>Assunto</span>
							<input
								type="text"
								name="subject"
								v-model="form.subject"
								placeholder="Motivo do contacto"
								class="w-full rounded-xl border border-border bg-card px-3 py-2 text-text"
							/>
						</label>

						<label class="grid gap-1.5">
							<span>Mensagem</span>
							<textarea
								name="message"
								rows="5"
								v-model="form.message"
								required
								class="w-full rounded-xl border border-border bg-card px-3 py-2 text-text"
							/>
						</label>

						<button type="submit" class="btn primary" :disabled="status === 'pending'">
							<span v-if="status === 'pending'">A enviar...</span>
							<span v-else>Enviar</span>
						</button>

						<p v-if="status === 'success'" class="text-sm text-green-300">
							Obrigado! A sua mensagem foi enviada com sucesso.
						</p>
						<p v-else-if="status === 'error'" class="text-sm text-red-300">
							Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.
						</p>
					</form>
				</div>

				<!-- RIGHT: SOCIALS CARD -->
				<aside
					class="w-full rounded-2xl p-5 text-center sm:p-7 lg:p-10"
				>
					<h3 class="font-script text-[36px] text-highlight">Siga nas Redes Sociais!</h3>

					<div class="mt-4 flex items-center justify-center gap-4">
						<a
							href="https://www.instagram.com/estoriasquemecontaram_livro/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center text-[16px] font-medium text-white hover:opacity-90"
							aria-label="Abrir Instagram @estoriasquemcontaram_livro"
						>
							<img :src="instaLogo" alt="" class="h-5 w-5" />
						</a>

						<a
							href="https://www.facebook.com/profile.php?id=61581796721454"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center text-[16px] font-medium text-white hover:opacity-90"
							aria-label="Abrir Facebook Estórias Que Me Contaram"
						>
							<img :src="facebookLogo" alt="" class="h-5 w-5" />
						</a>
					</div>

					<!-- MOCKUP -->
					<img
						:src="instaImg"
						alt="Preview do Instagram"
						class="mx-auto mt-6 w-full max-w-[385px] rounded-[28px] shadow-cover"
					/>
				</aside>

			</div>
		</div>
	</section>
</template>
