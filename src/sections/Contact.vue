<template>
  <section id="contact" class="section">
    <div class="container">
      <h2>Contacto</h2>
      <p>Para comprar o livro ou tirar dúvidas, use o formulário.</p>

      <form action="https://formspree.io/f/your-id" method="POST" class="form">
        <label>
          <span>Nome</span>
          <input type="text" name="name" required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>Mensagem</span>
          <textarea name="message" rows="5" required />
        </label>
        <button type="submit" class="btn primary">Enviar</button>
      </form>
    </div>
  </section>
</template>