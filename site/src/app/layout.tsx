import '../styles/globals.scss'
import {Inter, Source_Code_Pro} from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
})
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.className} ${sourceCodePro.className}`}>
      <head>
        <title>syntaxtree.xyz</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
