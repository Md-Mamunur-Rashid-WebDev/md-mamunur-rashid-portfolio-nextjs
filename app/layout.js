// app/layout.js
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'Md Mamunur Rashid | Portfolio',
  description: 'Salesforce Admin & Developer | Frontend Developer | WordPress Expert',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="noise">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#16161f',
                color: '#e2e8f0',
                border: '1px solid #1e1e2e',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
