// app/layout.js
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from '@/components/Providers'
import ThemeProvider from '@/components/ui/ThemeProvider'

export const metadata = {
  title: 'Md Mamunur Rashid | Portfolio',
  description: 'Salesforce Admin & Developer | Frontend Developer | WordPress Expert',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Providers>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                },
              }}
            />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
