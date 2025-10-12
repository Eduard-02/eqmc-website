export default function Footer() {
	return (
		<footer className="site-footer">
			<div className="container footer-row">
				<small>© {new Date().getFullYear()} Tucha Guerra. Todos os direitos reservados.</small>
				<small>
					<a href="#top">Voltar ao topo ↑</a>
				</small>
			</div>
		</footer>
	)
}