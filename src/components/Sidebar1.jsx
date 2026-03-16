import { useState } from "react";
import { FaHome, FaBook, FaUserGraduate, FaChartBar } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

function Sidebar1({ setPage, user, logout, sidebarOpen }) {
  const [active, setActive] = useState("dashboard");

  function changePage(page) {
    setActive(page);
    setPage(page);
  }

  return (
    <div className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
      <div className="logo">
        <img className="sidebar-logo" src="/logo.png" alt="logo" />
        {sidebarOpen && (
          <div className="logo-text">
            <h2>KHỔNG TỬ NHÍ</h2>
            <p>Teacher Dashboard</p>
          </div>
        )}
      </div>

      <ul className="menu">
        <li className={active === "dashboard" ? "active" : ""} onClick={() => changePage("dashboard")}>
          <div className="menu-icon"><FaHome /></div>
          {sidebarOpen && <span>Dashboard</span>}
        </li>
        <li className={active === "classes" ? "active" : ""} onClick={() => changePage("classes")}>
          <div className="menu-icon"><FaBook /></div>
          {sidebarOpen && <span>Lớp Học</span>}
        </li>
        <li className={active === "students" ? "active" : ""} onClick={() => changePage("students")}>
          <div className="menu-icon"><FaUserGraduate /></div>
          {sidebarOpen && <span>Học Sinh</span>}
        </li>
        <li className={active === "reports" ? "active" : ""} onClick={() => changePage("reports")}>
          <div className="menu-icon"><FaChartBar /></div>
          {sidebarOpen && <span>Báo Cáo</span>}
        </li>
      </ul>

      <div className="sidebar-footer">
        {sidebarOpen && (
          <div className="user-box">
            <div className="avatar">{user?.name?.charAt(0) || "T"}</div>
            <div className="user-info">
              <p>{user?.name || "Teacher"}</p>
              <span>Giáo viên</span>
            </div>
          </div>
        )}
        <div className="logout-wrapper">
          <button className="logout-new" onClick={logout}>
            <HiOutlineLogout />
            {sidebarOpen && <span>Đăng Xuất</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar1;