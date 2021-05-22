import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">NextJS Headless Wordress</a>
      </h1>

      <p className={styles.description}>Bellow you have some sections to check our examples</p>

      <div className={styles.grid}>
        <Link href="/examples/authorization">
          <a className={styles.card}>
            <h2>Authorization &rarr;</h2>
            <p>Check the quick links for __register__, __login__, reset and set password.</p>
          </a>
        </Link>
      </div>
    </main>
  )
}
