'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { getEmployees, getEmployeeStats, Employee, EmployeeStats } from '@/lib/api'

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
    label,
    value,
    accent,
}: {
    label: string
    value: number | string
    accent?: 'brand' | 'green' | 'amber' | 'red'
}) {
    const colorMap: Record<string, { bg: string; text: string }> = {
        brand: { bg: 'var(--brand-light)', text: 'var(--brand-text)' },
        green: { bg: 'var(--green-light)', text: 'var(--green-text)' },
        amber: { bg: 'var(--amber-light)', text: 'var(--amber-text)' },
        red:   { bg: 'var(--red-light)',   text: 'var(--red-text)'   },
    }
    const color = colorMap[accent ?? 'brand']

    return (
        <div className="stat-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 24px' }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: color.text }}>{value}</div>
        </div>
    )
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
            <svg
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
                type="text"
                placeholder="ค้นหาชื่อ, รหัส, แผนก..."
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    border: '1px solid var(--border-md)',
                    borderRadius: 'var(--radius)',
                    fontSize: 14,
                    color: 'var(--text-primary)',
                    background: 'var(--surface)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--brand)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-md)')}
            />
        </div>
    )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
    const initials = name
        .split(' ')
        .map(w => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    return (
        <div style={{
            width: 34, height: 34,
            borderRadius: '50%',
            background: 'var(--brand-light)',
            color: 'var(--brand-text)',
            fontWeight: 600, fontSize: 13,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
        }}>
            {initials || '?'}
        </div>
    )
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function AssetBadge({ count }: { count: number }) {
    const color = count > 0
        ? { bg: 'var(--brand-light)', text: 'var(--brand-text)' }
        : { bg: '#f3f4f6', text: 'var(--text-muted)' }
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 10px', borderRadius: 999,
            fontSize: 12, fontWeight: 600,
            background: color.bg, color: color.text,
        }}>
            {count} รายการ
        </span>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EmployeesPage() {
    const [stats, setStats] = useState<EmployeeStats | null>(null)
    const [employees, setEmployees] = useState<Employee[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [statsLoading, setStatsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Load stats once
    useEffect(() => {
        getEmployeeStats()
            .then(setStats)
            .catch(() => setStats(null))
            .finally(() => setStatsLoading(false))
    }, [])

    // Load employees (debounced search)
    const fetchEmployees = useCallback(async (q: string) => {
        setLoading(true)
        setError(null)
        try {
            const data = await getEmployees(q || undefined)
            setEmployees(data)
        } catch {
            setError('ไม่สามารถโหลดข้อมูลพนักงานได้')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        const t = setTimeout(() => fetchEmployees(search), 300)
        return () => clearTimeout(t)
    }, [search, fetchEmployees])

    return (
        <div style={{ padding: 28, maxWidth: 1100 }}>

            {/* ── Overview Stats ── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 16,
                marginBottom: 32,
            }}>
                {statsLoading ? (
                    [1, 2, 3, 4].map(i => (
                        <div key={i} style={{
                            height: 88, borderRadius: 'var(--radius-lg)',
                            background: 'var(--border)', opacity: 0.5,
                            animation: 'pulse 1.5s ease-in-out infinite',
                        }} />
                    ))
                ) : (
                    <>
                        <StatCard label="พนักงานทั้งหมด"          value={stats?.totalEmployees ?? '—'}       accent="brand" />
                        <StatCard label="ทรัพย์สินทั้งหมด"         value={stats?.totalAssets ?? '—'}          accent="green" />
                        <StatCard label="พนักงานที่ถือครองทรัพย์สิน" value={stats?.employeesWithAssets ?? '—'} accent="amber" />
                        <StatCard label="ทรัพย์สินที่ยังไม่มีคนถือ"  value={stats?.unassignedAssets ?? '—'}    accent="red"   />
                    </>
                )}
            </div>

            {/* ── Search + Table ── */}
            <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
            }}>
                {/* Toolbar */}
                <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    flexWrap: 'wrap',
                }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
                        รายชื่อพนักงาน
                        {!loading && (
                            <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 8 }}>
                                ({employees.length} คน)
                            </span>
                        )}
                    </div>
                    <SearchBar value={search} onChange={setSearch} />
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                                {['รหัส', 'ชื่อ-นามสกุล', 'ตำแหน่ง', 'แผนก', 'อีเมล', 'ทรัพย์สิน', ''].map(h => (
                                    <th key={h} style={{
                                        padding: '10px 16px', textAlign: 'left',
                                        fontSize: 12, fontWeight: 600,
                                        color: 'var(--text-secondary)',
                                        letterSpacing: '0.03em',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [1, 2, 3, 4, 5].map(i => (
                                    <tr key={i}>
                                        {[1, 2, 3, 4, 5, 6, 7].map(j => (
                                            <td key={j} style={{ padding: '14px 16px' }}>
                                                <div style={{
                                                    height: 14, borderRadius: 4,
                                                    background: 'var(--border)',
                                                    width: j === 2 ? '80%' : '60%',
                                                    opacity: 0.5,
                                                }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : error ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: 'var(--red-text)' }}>
                                        {error}
                                    </td>
                                </tr>
                            ) : employees.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                                        {search ? `ไม่พบพนักงานที่ตรงกับ "${search}"` : 'ยังไม่มีข้อมูลพนักงาน'}
                                    </td>
                                </tr>
                            ) : (
                                employees.map(emp => (
                                    <tr
                                        key={emp.id}
                                        style={{
                                            borderBottom: '1px solid var(--border)',
                                            cursor: 'pointer',
                                            transition: 'background 0.1s',
                                        }}
                                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#f8faff')}
                                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '')}
                                    >
                                        <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                            {emp.code}
                                        </td>
                                        <td style={{ padding: '13px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <Avatar name={emp.name} />
                                                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                                    {emp.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                                            {emp.position}
                                        </td>
                                        <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                                            {emp.department}
                                        </td>
                                        <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>
                                            {emp.email}
                                        </td>
                                        <td style={{ padding: '13px 16px' }}>
                                            <AssetBadge count={emp.assetCount} />
                                        </td>
                                        <td style={{ padding: '13px 16px', textAlign: 'right' }}>
                                            <Link
                                                href={`/employees/${emp.id}`}
                                                style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 4,
                                                    fontSize: 13, fontWeight: 500,
                                                    color: 'var(--brand-text)',
                                                    textDecoration: 'none',
                                                    padding: '5px 12px',
                                                    borderRadius: 'var(--radius)',
                                                    border: '1px solid var(--brand-light)',
                                                    background: 'var(--brand-light)',
                                                    whiteSpace: 'nowrap',
                                                    transition: 'opacity 0.1s',
                                                }}
                                            >
                                                ดูข้อมูล →
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }
            `}</style>
        </div>
    )
}