<script setup>
const base = import.meta.env.BASE_URL.endsWith('/')
	? import.meta.env.BASE_URL
	: `${import.meta.env.BASE_URL}/`
const aboutPhoto = `${base}assets/capa-eqmc.png`
const authorPhoto = `${base}assets/tucha-guerra.png`
</script>

<template>
  <section id="about" class="py-6 text-center">
    <div class="container">
      <div class="space-y-8 text-left">
				
        <div class="grid gap-8 border-b border-white/20 pt-8 pb-20 lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-start about-hero-grid">
          <div class="flex justify-center">
            <div class="flex w-full max-w-[380px] items-center justify-center shadow-cover">
              <img
                :src="aboutPhoto"
                alt="Capa do livro Estórias Que Me Contaram"
                class="w-full"
              >
            </div>
          </div>

          <div class="about-hero-text flex h-full flex-col gap-6 pt-[clamp(10px,1.4vw,18px)]">
            <h2 class="m-0 font-script text-[46px] leading-none text-highlight">Tucha Guerra</h2>
            <div class="space-y-6 text-left text-[22px] leading-[1.9] text-highlight font-serif">
              <p class="text-justify">
                "Ao longo da minha vida, tive o privilégio de ser confidente de muitas mulheres. Mães,
                tias, amigas, conhecidas — todas elas, em diferentes momentos, partilharam comigo
                pedaços das suas vidas, retalhos de memórias, confidências sussurradas entre cafés ou
                lágrimas derramadas em conversas profundas que atravessaram noites."
              </p>
              <p class="text-justify">
                "Algumas destas estórias também são minhas, tecidas com os fios da minha própria experiência.
                Outras foram-me confiadas em momentos de particular vulnerabilidade, quando o peso da vida se tornava demasiado para carregar sozinha.
                São relatos de amor, de perda, de superação, de dor, mas também de esperança e de renascimento."
              </p>
            </div>
            <p class="about-hero-caption mt-auto self-end text-right text-xs font-medium tracking-[0.015em] text-white/80">
              Página <span class="quote-caption__em">i (Prólogo)</span>
            </p>
          </div>
        </div>

        <div id="sobre-livro" class="space-y-5 border-b border-white/20 pt-8 pb-12 text-left leading-relaxed text-text">
          <p class="text-[20px] font-semibold">Sobre este livro</p>
          <p class="text-[18px] text-justify">
            <span class="italic">Estórias que me Contaram</span> é uma navegação pelas geografias invisíveis da alma feminina. É sobre amores que nos consomem e amizades que nos reconstroem. Sobre cicatrizes que se tornam suaves como seda. Sobre borboletas que aprendem a voar depois da tempestade. Para as mulheres, este livro é um espelho onde se poderão rever, descobrindo que não estão sozinhas nas suas lutas.
            Para os homens, é uma janela para compreender melhor as mulheres das suas vidas. Para todos, é a prova de que há sempre uma saída, sempre uma luz nos momentos mais sombrios.
            Porque no fim, independentemente do género, estas são estórias sobre o que significa ser humano: a nossa capacidade de superar, de amar, de perdoar, de reconstruir e de encontrar caminhos possíveis para a felicidade.
            Um livro sobre dores silenciadas, verdades incómodas e a tecelagem complexa de uma vida feita de fios entrelaçados, uns brilhantes como seda, outros ásperos como linho, todos necessários para criar o tecido completo da nossa existência.
          </p><br>
					<p class="text-[20px] font-semibold flex items-baseline gap-4">
						Número de páginas <span class="font-normal italic">120</span>
					</p>
					<p class="text-[20px] font-semibold flex items-baseline gap-4">
						Capítulos <span class="font-normal italic">14</span>
					</p>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 mt-4">
							<p class="italic text-[15px] text-highlight">Prólogo</p>
							<p class="italic text-[15px] text-highlight">Confidências de Mulheres: Segredos e Silêncios</p>

						<p class="italic text-[15px] text-highlight">Os Avós e a Arte das Memórias</p>
						<p class="italic text-[15px] text-highlight">Laranjas e Borboletas: O Guarda-Roupa dos Memórias</p>

						<p class="italic text-[15px] text-highlight">Retratos de Família: A Macieira Que Deu Muitos Frutos</p>
						<p class="italic text-[15px] text-highlight">Cicatrizes de Seda: Memórias de Um Amor Ferido</p>

						<p class="italic text-[15px] text-highlight">Geografias da Alma: As Cartografias Efémeras da Amizade</p>
						<p class="italic text-[15px] text-highlight">Natal: Retratos de Uma Família em Transformação</p>

						<p class="italic text-[15px] text-highlight">A Vida nos Intervalos</p>
						<p class="italic text-[15px] text-highlight">Romãs Partidas</p>

						<p class="italic text-[15px] text-highlight">O Sabor das Tangerinas</p>
						<p class="italic text-[15px] text-highlight">Borboletas Renascidas</p>

						<p class="italic text-[15px] text-highlight">Desejos Silenciosos de Manga</p>
						<p class="italic text-[15px] text-highlight">O Renascer da Liberdade</p>

						<p class="italic text-[15px] text-highlight">Quando as Borboletas Aprenderam a Voar</p>
						<p class="italic text-[15px] text-highlight">Epílogo</p>
				</div>
      </div>

			<div id="sobre-autora" class="space-y-6 border-b border-white/20 pt-8 pb-12 text-left leading-relaxed text-text">
				<h2 class="text-[20px] font-semibold">Sobre a autora</h2>

				<div class="grid gap-8 px-4 sm:px-0 md:[grid-template-columns:minmax(300px,400px)_1fr] md:[grid-template-rows:auto_auto] items-start">

					<div class="md:col-[1] md:row-[1] flex flex-col items-center md:items-start md:-translate-x-0">
						<img
							:src="authorPhoto"
							alt="Retrato de Tucha Guerra"
							class="w-full max-w-[380px] shadow-cover object-cover"
						>
						<div class="mt-3 text-center w-full md:w-full md:self-center md:-translate-x-2 md:px-1">
							<p class="text-sm italic text-muted">
								Professora de Ensino Superior<br>(Interação Homem-Máquina)
							</p>
							<p class="font-script text-highlight mt-4 text-[34px] leading-none">
								Tucha Guerra
							</p>
						</div>
					</div>

					<div class="md:col-[2] md:row-[1] self-center md:-translate-y-10">
						<div class="space-y-5 text-[16px] text-highlight/90 leading-relaxed italic text-center">
							<p>
								A Tucha Guerra é a minha mãe: uma mulher repleta de memórias, experiências de vida, estórias,
								desamores e muitos azares — mas sempre com uma perspetiva clara e uma sensibilidade tremenda.
								É uma mulher que quer estar e ser tudo para todos os que a rodeiam. Precisa de se expressar,
								de dar alegria e conforto às pessoas com quem partilha o seu caminho e, ao mesmo tempo,
								transmitir as suas aprendizagens para que também nós possamos aprender. A minha mãe é
								professora da vida — e professora de profissão.
							</p>

							<p>
								Mas é também escritora: escreve artigos científicos de muita complexidade, mas depois é capaz
								de regressar à terra e escrever estórias com a maior das levezas e luminosidade. Luz para as
								verdades difíceis de ouvir, e luz que faz sobressair as palavras, ligando-as à nossa alma.
							</p>

							<p>
								É humana na ternura, mulher na força, professora na sabedoria, mãe na luz. Não existe “e”,
								apenas vírgulas, para a infinita coleção de coisas que a minha mãe consegue ser.
							</p>

							<p>
								Este livro é para todos — independentemente de conhecerem a minha mãe ou não. É um livro
								que traz à vida o que a vida foi para ela e para tantas outras pessoas, e que certamente
								fará o leitor sentir a luz que estas palavras transportam.
							</p>
						</div>
					</div>

					
				</div>
			</div>

			<div class="pt-12 pb-16 border-b border-white/20">
				<div class="container">
					<div class="relative grid items-center gap-8 md:grid-cols-[minmax(260px,550px)_1fr]">
						<div class="flex justify-center md:justify-start">
							<img
								:src="`${base}assets/front-back.png`"
								alt="Livro Estórias Que Me Contaram (frente e verso)"
								class="max-w-[640px] w-full rotate-[-12deg] translate-y-2 drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
							/>
						</div>

						<div class="font-script text-highlight/95 leading-relaxed text-[clamp(18px,2.2vw,28px)]">
							<p class="text-right mr-2 text-[35px]">“Há vidas que se moldam</p>

							<p class="mt-6 text-[35px]">a partir das histórias que atravessam o tempo,</p>
							<p class="mt-3 text-[35px]">não aquelas que se inventam,</p>

							<p class="mt-8 text-right text-[35px]">mas as que se revelam,</p>
							<p class="mt-3 text-right text-[35px]">discretamente, no decorrer dos dias. (…)</p>

							<p class="mt-10 text-[35px]">este livro convida-nos a</p>

							<p class="mt-8 text-[35px]">
								atravessar esses territórios com olhos mais despertos,
							</p>
							<p class="mt-4 text-[35px]">
								lembrando-nos de que as grandes verdades raramente chegam
							</p>
							<p class="mt-4 text-[35px]">com estrondo,</p>

							<p class="mt-10 text-right mr-1 text-[41px]">sussurram.”</p>
						</div>
					</div>
				</div>
			</div>

			<div class="pt-12 pb-16 border-b border-white/20">
				<div class="container">
					<div class="relative grid items-center gap-8 md:grid-cols-[auto_1fr]">
						<div class="flex justify-center md:justify-start relative">
							<img
								:src="`${base}assets/open-book.png`"
								alt="Livro Estórias Que Me Contaram (frente e verso)"
								class="w-full max-w-[700px] rotate-[-12deg] -translate-y-2 md:-translate-x-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
							/>
						</div>

						<div class="font-script text-highlight/95 leading-relaxed text-[clamp(18px,2.2vw,28px)] relative z-0">
							<p class="text-center mr-2 text-[35px]">O amor</p>
							<p class="mt-6 text-[35px] text-center">na sua essência mais pura,</p>
							<p class="mt-3 text-[35px] text-center">é liberdade.</p>
							<p class="mt-8 text-center text-[35px]">E nessa liberdade reside a</p>
							<p class="mt-3 text-center text-[35px]">coragem de dizer ‘não’ ao medo</p>
							<p class="mt-10 text-[35px] text-center">e ‘sim’ à vida.</p>
						</div>
					</div>
				</div>
			</div>

			<div class="space-y-6 border-b border-white/20 pt-8 pb-12 text-left leading-relaxed text-text">
				<div class="grid gap-8 px-4 sm:px-0 md:[grid-template-columns:1fr_minmax(300px,400px)] md:[grid-template-rows:auto_auto] items-start">

					<div class="md:order-2 md:col-[2] md:row-[1] flex flex-col items-center">
						<img
							:src="`${base}assets/tucha-books.jpg`"
							alt="Retrato de Tucha Guerra"
							class="w-full max-w-[380px] shadow-cover object-cover"
						>
						<p class="font-script text-highlight mt-4 text-center text-[34px] leading-none">
							Tucha Guerra
						</p>
					</div>

					<div class="md:order-1 md:col-[1] md:row-[1] self-center md:-translate-y-6">
						<div class="space-y-5 text-[17px] text-highlight/90 leading-relaxed italic text-justify">
							<p>
								Olho para trás e vejo a minha vida como um tecido complexo, feito de fios de estórias entrelaçadas. Cada capítulo, cada momento, cada encontro foi um fio - uns brilhantes como seda, outros ásperos como linho, alguns partidos, outros resistentes. Não vim ao mundo para ser apenas mais uma estória. Vim para tecer, para desvendar, para compreender. Compreender o que significa ser mulher numa terra de silêncios e de gritos contidos. Compreender como sobrevivemos, como nos reinventamos, como resistimos. Vim também para falar sobre os assuntos que amarguram outras mulheres e homens - dores silenciadas, estórias soterradas, verdades incómodas que precisam de ser trazidas à luz. 
							</p>

							<p>
								<span class="font-semibold">Este livro não é uma autobiografia. É um mapa. Um mapa de cicatrizes e de renascimentos, de amores que nos consomem e de amizades que nos reconstroem.</span> É o registo de como navegamos entre o que nos acontece e o que escolhemos. Mas também de como as dores coletivas nos atravessam e nos transformam.
							</p>
						</div>
					</div>
				</div>
			</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (width: 1024px) and (height: 1366px) {
  .about-hero-grid {
    align-items: center !important;
  }
  .about-hero-text {
    padding-top: 0 !important;
  }
  .about-hero-caption {
    margin-top: 2rem !important;
  }
}
</style>
