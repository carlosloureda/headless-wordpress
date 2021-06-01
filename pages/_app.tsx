import { AppContext, AppProps } from 'next/app'
import { HeadlessProvider } from '@wpengine/headless/react'
import { AuthProvider } from '../lib/hooks/useAuth'
import '../styles/globals.css'
import Layout from '../lib/components/Layout'
import { ApolloProvider } from '@apollo/client/react'

// import { link, cache, client } from '../lib/services/apollo'
import { client } from '../lib/services/apollo'
// import { getApolloClient } from '@wpengine/headless'

// const client = getApolloClient()
// client.cache = cache
// client.setLink(link)

// console.log('link: ', link)
// console.log('client: ', client)

function App({ Component, pageProps }: AppContext & AppProps): JSX.Element {
  return (
    <HeadlessProvider pageProps={pageProps}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    </HeadlessProvider>
  )
}

export default App
