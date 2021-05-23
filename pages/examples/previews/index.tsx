import styles from '../../../styles/Home.module.css'

export default function NotificationsPage(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Now you can make previews work with headless!</h1>
      <p className={styles.description}>
        As of this version 0.2.0, you need to comment some source code in the JWT wordpress plugin.
        Please check
        <a href="https://github.com/wpengine/headless-framework/issues/191">this issue</a>
      </p>
      <p className={styles.description}>
        On the `preview` file you have the best current way to implement previews and how to diff
        from the different CPTs,
      </p>
    </main>
  )
}
