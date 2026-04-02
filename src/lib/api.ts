// ─── Types ────────────────────────────────────────────────────────────────────

export interface Employee {
    id: string
    code: string
    name: string
    position: string
    department: string
    email: string
    assetCount: number
}

export interface EmployeeStats {
    totalEmployees: number
    totalAssets: number
    employeesWithAssets: number
    unassignedAssets: number
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_EMPLOYEES: Employee[] = [
    { id: '1',  code: 'EMP001', name: 'สมชาย ใจดี',       position: 'Sales Manager',       department: 'Sales',   email: 'somchai@saleshub.co.th',   assetCount: 3 },
    { id: '2',  code: 'EMP002', name: 'สุมาลี รักงาน',     position: 'Sales Executive',     department: 'Sales',   email: 'sumalee@saleshub.co.th',   assetCount: 2 },
    { id: '3',  code: 'EMP003', name: 'วิชัย มุ่งมั่น',    position: 'IT Support',          department: 'IT',      email: 'wichai@saleshub.co.th',    assetCount: 4 },
    { id: '4',  code: 'EMP004', name: 'นภา สดใส',         position: 'HR Officer',          department: 'HR',      email: 'napa@saleshub.co.th',      assetCount: 1 },
    { id: '5',  code: 'EMP005', name: 'ธนพล เก่งกาจ',     position: 'Software Engineer',   department: 'IT',      email: 'thanapol@saleshub.co.th',  assetCount: 2 },
    { id: '6',  code: 'EMP006', name: 'กมลทิพย์ ขยัน',    position: 'Accountant',          department: 'Finance', email: 'kamol@saleshub.co.th',     assetCount: 2 },
    { id: '7',  code: 'EMP007', name: 'ประเสริฐ ดีมาก',    position: 'Sales Executive',     department: 'Sales',   email: 'prasert@saleshub.co.th',   assetCount: 0 },
    { id: '8',  code: 'EMP008', name: 'จิราพร มีสุข',      position: 'Marketing Specialist',department: 'Marketing',email: 'jiraporn@saleshub.co.th', assetCount: 1 },
    { id: '9',  code: 'EMP009', name: 'อนุชา ตั้งใจ',      position: 'Finance Officer',     department: 'Finance', email: 'anucha@saleshub.co.th',    assetCount: 2 },
    { id: '10', code: 'EMP010', name: 'พรทิพย์ สุขสันต์',  position: 'HR Manager',          department: 'HR',      email: 'pornthip@saleshub.co.th',  assetCount: 0 },
]

// ─── API Functions ────────────────────────────────────────────────────────────

export async function getEmployees(query?: string): Promise<Employee[]> {
    await delay(400)
    if (!query) return MOCK_EMPLOYEES
    const q = query.toLowerCase()
    return MOCK_EMPLOYEES.filter(e =>
        e.name.includes(q) ||
        e.code.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q) ||
        e.position.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
    )
}

export async function getEmployeeStats(): Promise<EmployeeStats> {
    await delay(300)
    const totalAssets = MOCK_EMPLOYEES.reduce((sum, e) => sum + e.assetCount, 0)
    return {
        totalEmployees: MOCK_EMPLOYEES.length,
        totalAssets,
        employeesWithAssets: MOCK_EMPLOYEES.filter(e => e.assetCount > 0).length,
        unassignedAssets: 5,
    }
}

export async function getEmployee(id: string): Promise<Employee | null> {
    await delay(300)
    return MOCK_EMPLOYEES.find(e => e.id === id) ?? null
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
