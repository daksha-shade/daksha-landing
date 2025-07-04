import { Inter, Crimson_Text } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const crimsonText = Crimson_Text({ 
  subsets: ['latin'], 
  variable: '--font-serif',
  weight: ['400', '600', '700']
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} ${crimsonText.variable} min-h-screen bg-background`}>
      {children}
    </div>
  )
}