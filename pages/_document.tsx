import Document, { Html, Main, Head, NextScript } from 'next/document'
const devMode = process.env.NODE_ENV === 'development'

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en" className="font-medium text-gray-700 bg-gray-50">
        <Head />
        <link
          rel="preload"
          href="/fonts/Aileron-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Aileron-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Aileron-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Aileron-SemiBold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />

        <body className={devMode ? 'debug-screens' : ''}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
