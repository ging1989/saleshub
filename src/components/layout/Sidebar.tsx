'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">S</div>
                <div>
                    <div className="sidebar-title">SalesHub</div>
                    <div className="sidebar-version">v1.0.0</div>
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <div className="nav-label">ภาพรวม</div>
                    <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
                        <span className="nav-dot"></span>Dashboard
                    </Link>
                </div>

                <div className="nav-section">
                    <div className="nav-label">พนักงาน</div>
                        <Link href="/employees" className={`nav-item ${pathname.startsWith('/employees') ? 'active' : ''}`}>
                            <span className="nav-dot"></span>รายชื่อพนักงาน
                        </Link>
                </div>

                <div className="nav-section">
                    <div className="nav-label">ทรัพย์สิน</div>
                        <Link href="/assets" className={`nav-item ${pathname.startsWith('/assets') ? 'active' : ''}`}>
                            <span className="nav-dot"></span>รายการทรัพย์สิน
                        </Link>
                        <Link href="/assignments" className={`nav-item ${pathname.startsWith('/assignments') ? 'active' : ''}`} >
                            <span className="nav-dot"></span>การมอบหมาย
                        </Link>
                </div>

                <div className="nav-section">
                    <div className="nav-label">รายงาน</div>
                    <Link href="/report/asset-form" className={`nav-item ${pathname.startsWith('/report/asset-form') ? 'active' : ''}`} >
                        <span className="nav-dot"></span>แบบฟอร์มทรัพย์สิน
                    </Link>
                </div>

            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">A</div>
                    <div className="user-name">Admin</div>
                </div>
            </div>

        </aside>
    )
}