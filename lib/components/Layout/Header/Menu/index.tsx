// import { useGlobalData } from 'lib/context/globalDataContext';
import clsx from 'clsx'
import Link from 'next/link'
import useAuth from '../../../../../lib/hooks/useAuth'
import DotLoader from '../../../ui/loaders/DotLoader'

export const Menu = (): JSX.Element => {
  // TRICK "Temporal" for client side rendering, the menu is empty on client side routes
  let parsedItems = []
  parsedItems = parsedItems.map((item) => ({
    id: item.id,
    label: item.label,
    path: item.path,
  }))

  const { isLoggedIn, user, isLoading } = useAuth()

  if (isLoading) {
    parsedItems.push({
      id: 'loading',
      label: <DotLoader className="px-5" />,
      path: '/',
    })
    parsedItems.push({
      id: 'loading2',
      label: <DotLoader className="px-5" />,
      path: '/',
    })
  } else {
    if (isLoggedIn) {
      parsedItems.push({
        id: 'logout-menu',
        label: 'logout',
        path: '/logout',
      })
      parsedItems.push({
        id: 'dashboard-menu',
        label: user ? user.name : 'dashboard',
        path: '/dashboard',
      })
    } else {
      parsedItems.push({
        id: 'register-menu',
        label: 'register',
        path: '/register',
      })
      parsedItems.push({
        id: 'login-menu',
        label: 'login',
        path: '/login',
      })
    }
  }

  return (
    <nav className={clsx('hidden md:flex')}>
      {parsedItems?.map((item) => {
        const { label, path, id } = item
        return (
          <Link key={id} href={path}>
            <a
              className={clsx(
                'menuItem',
                'text-white text-f-14 uppercase tracking-[1px] hover:text-gold hover:no-underline',
                'px-5',
                'flex items-center'
              )}
            >
              {label}
            </a>
          </Link>
        )
      })}
    </nav>
  )
}
