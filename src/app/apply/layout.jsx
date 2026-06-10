import Navbar from '@/components/Navbar'
import ApplyHeader from './apply-header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Slook · Apply',
}

export default function ApplyLayout({ children }) {
  return (
    <div className="min-h-screen bg-slook-ink text-white">
      {/* <ApplyHeader /> */}
      <Navbar/>
      <main className="px-4 pb-16 pt-24 md:pt-28">{children}</main>
      <Footer/>
    </div>
  )
}
