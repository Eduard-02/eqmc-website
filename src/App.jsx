import { useEffect } from 'react'
import Header from './components/Header'
import About from './sections/About'
import Contact from './sections/Contact'
import Footer from './components/Footer'

export default function App() {
	useEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}
		window.scrollTo(0, 0);
	}, [])
  return (
		<div id="top">
			<Header />
			<main>
				<About />
				<Contact />
			</main>
			<Footer />
		</div>
  )
}