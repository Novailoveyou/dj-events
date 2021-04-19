import Link from 'next/link'
import styles from '../styles/Footer.module.sass'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; DJ Events 2021</p>
      <p>
        <Link href='/about'>About this project</Link>
      </p>
    </footer>
  )
}
