export default function DashboardPage() {
    return (
        <div>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">จำนวนพนักงานทั้งหมด</div>
                    <div className="stat-value">24</div>
                    <div className="stat-sub">2 เดือนนี้</div>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">จำนวนคอมพิวเตอร์</div>
                    <div className="stat-value">24</div>
                    <div className="stat-sub">2 เดือนนี้</div>
                </div>
            </div>            
        </div>
    )
}