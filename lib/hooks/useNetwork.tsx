import React, { useEffect, useContext } from 'react'
import useHasMounted from './useHasMounted'

const NetworkContext = React.createContext<boolean>(null)

export const NetworkProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const hasMounted = useHasMounted()
  const initialValue = hasMounted ? window.navigator.onLine : true
  const [isOnline, setIsOnline] = React.useState<boolean>(initialValue)
  const updateNetwork = (): void => setIsOnline(window.navigator.onLine)

  useEffect(() => {
    window.addEventListener(`offline`, updateNetwork)
    window.addEventListener(`online`, updateNetwork)
    return () => {
      window.removeEventListener(`offline`, updateNetwork)
      window.removeEventListener(`online`, updateNetwork)
    }
  })

  return <NetworkContext.Provider value={isOnline}>{children}</NetworkContext.Provider>
}

const useNetwork = (): boolean => useContext(NetworkContext)

export default useNetwork
