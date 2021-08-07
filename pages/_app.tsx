import { AuthProvider } from '@/context/AuthContext'
import '@/styles/globals.sass'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
