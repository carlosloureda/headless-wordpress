import { useState, useEffect } from 'react'

/**
 * Returns true if the component has mounted, else false.
 */
const useHasMounted = (): boolean => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

export default useHasMounted
