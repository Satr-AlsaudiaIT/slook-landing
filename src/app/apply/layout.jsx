import ApplyHeader from './apply-header'

export const metadata = {
  title: 'Slook · Apply',
}

export default function ApplyLayout({ children }) {
  return (
    <div className="min-h-screen bg-slook-ink text-white">
      <ApplyHeader />
      <main className="px-4 pb-16 pt-24 md:pt-28">{children}</main>
    </div>
  )
}
