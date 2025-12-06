import './globals.css' // CSS import

// NOTE: Conflicting Google Fonts imports (Geist/GeistMono) have been removed to fix build errors.

export const metadata = {
    title: 'Qubic Watchdog - AI Treasury Auditor',
    description: 'Real-time monitoring and risk scoring for Qubic projects.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}