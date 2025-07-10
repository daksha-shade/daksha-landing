export default function LessDistractLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen  transition-colors duration-300">
      {children}
    </div>
  )
}