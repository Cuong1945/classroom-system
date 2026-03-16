// AdminDashboard.jsx
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import DashboardContent from "../components/DashboardContent"
import ComingSoon from "../components/ComingSoon"
import "../styles/dashboard.css"

function AdminDashboard({user, logout}){
  const [page, setPage] = useState("dashboard") // Quản lý trang hiện tại
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return(
    <div className={`layout ${sidebarOpen ? "" : "collapsed"}`}>
      <Sidebar 
        setPage={setPage} 
        user={user} 
        logout={logout} 
        sidebarOpen={sidebarOpen} 
      />

      <div className="main">
        {/* Truyền setPage vào Header để có thể thay đổi trang từ đây */}
        <Header 
          user={user} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          setPage={setPage} 
        />

        {page === "dashboard" && <DashboardContent/>}
        {page === "teachers" && <ComingSoon title="Quản lý giáo viên"/>}
        {page === "classes" && <ComingSoon title="Quản lý lớp học"/>}
        {page === "reports" && <ComingSoon title="Báo cáo thống kê"/>}
        
        {/* Thêm điều kiện hiển thị trang Profile */}
        {page === "profile" && <ComingSoon title="Thông tin tài khoản Admin"/>}
      </div>
    </div>
  )
}

export default AdminDashboard