// From here:https://codepen.io/nzbin/pen/GGrXbp

import styles from './PageLoader.module.css'

const PageLoader = ({
  className,
  title = 'Loading',
}: {
  className?: string
  title?: string
}): JSX.Element => {
  return (
    <div className={className ? `${styles.stage} ${className}` : styles.stage}>
      <div className={styles['dot-bricks']}></div>
      <div className="pt-8 text-lg tracking-widest" style={{ color: '#9880ff' }}>
        {title}
      </div>
    </div>
  )
}

export default PageLoader
