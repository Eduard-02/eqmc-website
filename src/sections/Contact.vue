<template>
  <section id="contact" class="py-6 text-center">
    <div class="container mx-auto px-3 sm:px-4 lg:px-6">
      <div class="mx-auto max-w-[720px] space-y-5">
        <h2 class="font-script text-[40px] text-highlight">Contacto</h2>
        <p class="mx-auto max-w-[70ch] text-[#d7dbf2]">
          Para comprar o livro ou tirar dúvidas, use o formulário.
        </p>

        <form
          action="https://formspree.io/f/your-id"
          method="POST"
          class="mx-auto flex w-full max-w-[640px] flex-col gap-3 text-left"
        >
          <label class="grid gap-1.5">
            <span>Nome</span>
            <input
              type="text"
              name="name"
              required
              class="w-full rounded-xl border border-border bg-card px-3 py-2 text-text"
            />
          </label>
          <label class="grid gap-1.5">
            <span>Email</span>
            <input
              type="email"
              name="email"
              required
              class="w-full rounded-xl border border-border bg-card px-3 py-2 text-text"
            />
          </label>
          <label class="grid gap-1.5">
            <span>Mensagem</span>
            <textarea
              name="message"
              rows="5"
              required
              class="w-full rounded-xl border border-border bg-card px-3 py-2 text-text"
            />
          </label>
          <button type="submit" class="btn primary">Enviar</button>
        </form>
      </div>
    </div>
  </section>
</template>
