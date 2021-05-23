// From here:https://codepen.io/nzbin/pen/GGrXbp

import styles from './DotLoader.module.css'

const DotLoader = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div className={className ? `${styles.stage} ${className}` : styles.stage}>
      <div className={styles['dot-flashing']}></div>
    </div>
  )
}

export default DotLoader
