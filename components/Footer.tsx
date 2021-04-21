import Link from 'next/link'
import styles from '@/styles/Footer.module.sass'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>&copy; DJ Events 2021</p>
			<p>
				<Link href='/about'>About this project</Link>
			</p>
		</footer>
	)
}

export default Footer
