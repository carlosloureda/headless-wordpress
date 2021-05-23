import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export default function AuthorizationPage(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Here you will find the quick links for registration</h1>

      <p className={styles.description}>Bellow you have some sections to check our examples</p>

      <div className={styles.grid}>
        <Link href="/register">
          <a className={styles.card}>
            <h2>Registration &rarr;</h2>
            <p>See the complete registration flow, login, reset and set password</p>
          </a>
        </Link>
        <Link href="/login">
          <a className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>If you already have an user you can check the login form over here</p>
          </a>
        </Link>
        <Link href="/forgot-password">
          <a className={styles.card}>
            <h2>Forgot Password &rarr;</h2>
            <p>Wanna try out the recovery password flow ?</p>
          </a>
        </Link>
        <Link href="/dashboard">
          <a className={styles.card}>
            <h2>Dashboard &rarr;</h2>
            <p>This is a private area, and you should only access it with a session</p>
          </a>
        </Link>
        <Link href="/login">
          <a className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>If you already have an user you can check the login form over here</p>
          </a>
        </Link>
        <Link href="/forgot-password">
          <a className={styles.card}>
            <h2>Forgot Password &rarr;</h2>
            <p>Wanna try out the recovery password flow ?</p>
          </a>
        </Link>
        <Link href="/dashboard">
          <a className={styles.card}>
            <h2>Dashboard &rarr;</h2>
            <p>This is a private area, and you should only access it with a session</p>
          </a>
        </Link>
        <Link href="/login">
          <a className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>If you already have an user you can check the login form over here</p>
          </a>
        </Link>
        <Link href="/forgot-password">
          <a className={styles.card}>
            <h2>Forgot Password &rarr;</h2>
            <p>Wanna try out the recovery password flow ?</p>
          </a>
        </Link>
        <Link href="/dashboard">
          <a className={styles.card}>
            <h2>Dashboard &rarr;</h2>
            <p>This is a private area, and you should only access it with a session</p>
          </a>
        </Link>
      </div>
    </main>
  )
}
