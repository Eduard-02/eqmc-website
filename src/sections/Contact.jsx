export default function Contact() {
	return (
		<section id="contact" className="section">
			<div className="container">
				<h2>Contacto</h2>
				<p>
					Para comprar o livro ou se tiver alguma dúvida, 
					use o formulário abaixo.
				</p>
				<form className="form">
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

					<button type="submit" className="btn primary">Enviar</button>
				</form>
			</div>
		</section>
	)
}