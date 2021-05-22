import styles from '../../../../styles/Home.module.css'

export default function NotificationsPage(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">NextJS Headless Wordress</a>
      </h1>

      <p className={styles.description}>Notifications examples!</p>

      {/* <div className={styles.grid}>
        <Link href="/examples/authorization">
          <a className={styles.card}>
            <h2>Authorization &rarr;</h2>
            <p>Check the quick links for __register__, __login__, reset and set password.</p>
          </a>
        </Link>
      </div> */}

      <button
        onClick={() => {
          console.log('show')
        }}
      >
        Show Success toast
      </button>
      {/* <Toast /> */}
    </main>
  )
}
