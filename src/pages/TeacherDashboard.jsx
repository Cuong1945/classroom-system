import { useState } from "react";
import Sidebar1 from "../components/Sidebar1";
import Header1 from "../components/Header1";
import DashboardContent1 from "../components/DashboardContent1";
import ComingSoon from "../components/ComingSoon";
import "../styles/dashboard.css"; // Dùng chung file này

function TeacherDashboard({ user, logout }) {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    // Dùng class 'layout' giống hệt trang Admin
    <div className={`layout ${sidebarOpen ? "" : "collapsed"}`}>
      <Sidebar1 
        setPage={setPage} 
        user={user} 
        logout={logout} 
        sidebarOpen={sidebarOpen} 
      />

      {/* Dùng class 'main' giống hệt trang Admin */}
      <div className="main">
        <Header1 
          user={user} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          setPage={setPage} 
        />

        {page === "dashboard" && <DashboardContent1 user={user} />}
        {page === "classes" && <ComingSoon title="Quản lý lớp học" />}
        {page === "students" && <ComingSoon title="Danh sách học sinh" />}
        {page === "reports" && <ComingSoon title="Báo cáo học tập" />}
        {page === "profile" && <ComingSoon title="Thông tin cá nhân" />}
      </div>
    </div>
  );
}

export default TeacherDashboard;