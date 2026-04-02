'use client'
import { headers } from "next/headers"
import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
    '/':                    'Dashboard',
    '/employees':           'รายชื่อพนักงาน',
    '/assets':              'รายการทรัพย์สิน',
    '/assignment':          'มอบหมายทรัพย์สิน',
    '/report/asset-form':   'แบบฟอร์มทรัพย์สิน'  
}

export default function Topbar() {
    const pathname = usePathname()
    const title = pageTitles[pathname] ?? 'SalesHub'

    return
        <header className="topbar">
            <div className="topbar-title">{title}</div>
            <div className="topbar-action"></div>
        </header>
}