import { Google_Sans, Maname } from 'next/font/google'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import '@/styles/app.css'
import '@/styles/layout.css'
import '@/styles/components.css'
import '@/styles/table.css'

const googleSans = Google_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font',
})

export const metadata = {
    title: 'SalesHub',
    description: 'ระบบข้อมูลพนักงานและทรัพย์สินฝ่ายขาย'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="th" className={googleSans.variable}>
            <body>
                <div className='app-shell'>
                    <Sidebar />
                    <div className='main-content'>
                        <Topbar />
                        <main className='page-body'>
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    )
}
