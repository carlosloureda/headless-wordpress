import { AppContext, AppProps } from 'next/app'
import { HeadlessProvider } from '@wpengine/headless/react'
import { AuthProvider } from '../lib/hooks/useAuth'
import '../styles/globals.css'
import Layout from '../lib/components/Layout'

import { link, cache } from '../lib/services/apollo'
import { getApolloClient } from '@wpengine/headless'

const client = getApolloClient()
client.cache = cache
client.setLink(link)

function App({ Component, pageProps }: AppContext & AppProps): JSX.Element {
  return (
    <HeadlessProvider pageProps={pageProps}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </HeadlessProvider>
  )
}

export default App
