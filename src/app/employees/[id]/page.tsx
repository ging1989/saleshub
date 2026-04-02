'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getEmployee, Employee } from '@/lib/api'

// ─── Info Row ─────────────────────────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ width: 160, flexShrink: 0, fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
            <span style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
        </div>
    )
}

// ─── Avatar Large ─────────────────────────────────────────────────────────────
function AvatarLarge({ name }: { name: string }) {
    const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    return (
        <div style={{
            width: 64, height: 64,
            borderRadius: '50%',
            background: 'var(--brand-light)',
            color: 'var(--brand-text)',
            fontWeight: 700, fontSize: 22,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
        }}>
            {initials || '?'}
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EmployeeDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [employee, setEmployee] = useState<Employee | null>(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        getEmployee(id).then(data => {
            if (!data) setNotFound(true)
            else setEmployee(data)
        }).finally(() => setLoading(false))
    }, [id])

    if (loading) return (
        <div style={{ padding: 28 }}>
            <div style={{ height: 24, width: 200, borderRadius: 4, background: 'var(--border)', opacity: 0.5, marginBottom: 24 }} />
            <div style={{ height: 200, borderRadius: 'var(--radius-lg)', background: 'var(--border)', opacity: 0.5 }} />
        </div>
    )

    if (notFound) return (
        <div style={{ padding: 28, textAlign: 'center', color: 'var(--text-muted)', paddingTop: 80 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>—</div>
            <div style={{ fontSize: 16, marginBottom: 20 }}>ไม่พบข้อมูลพนักงาน</div>
            <Link href="/employees" style={{ color: 'var(--brand-text)', fontSize: 14 }}>← กลับรายชื่อพนักงาน</Link>
        </div>
    )

    return (
        <div style={{ padding: 28, maxWidth: 800 }}>

            {/* Back */}
            <Link
                href="/employees"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 20 }}
            >
                ← กลับรายชื่อพนักงาน
            </Link>

            {/* Card */}
            <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
            }}>
                {/* Header */}
                <div style={{
                    padding: '24px 28px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', gap: 16,
                }}>
                    <AvatarLarge name={employee!.name} />
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{employee!.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                            {employee!.position} · {employee!.department}
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div style={{ padding: '4px 28px 20px' }}>
                    <InfoRow label="รหัสพนักงาน"  value={employee!.code} />
                    <InfoRow label="ชื่อ-นามสกุล"  value={employee!.name} />
                    <InfoRow label="ตำแหน่ง"       value={employee!.position} />
                    <InfoRow label="แผนก"          value={employee!.department} />
                    <InfoRow label="อีเมล"          value={employee!.email} />
                    <div style={{ display: 'flex', gap: 12, padding: '12px 0' }}>
                        <span style={{ width: 160, flexShrink: 0, fontSize: 13, color: 'var(--text-secondary)' }}>ทรัพย์สิน</span>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center',
                            padding: '3px 12px', borderRadius: 999,
                            fontSize: 13, fontWeight: 600,
                            background: employee!.assetCount > 0 ? 'var(--brand-light)' : '#f3f4f6',
                            color: employee!.assetCount > 0 ? 'var(--brand-text)' : 'var(--text-muted)',
                        }}>
                            {employee!.assetCount} รายการ
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
