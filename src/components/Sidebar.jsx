import { useState } from "react";
import { FaHome, FaChalkboardTeacher, FaBook, FaChartBar } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

function Sidebar({ setPage, user, logout, sidebarOpen }) {
  const [active, setActive] = useState("dashboard");

  function changePage(page) {
    setActive(page);
    setPage(page);
  }

  return (
    <div className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
      
      {/* LOGO */}
      <div className="logo">
        <div className="logo">
  <img className="sidebar-logo" src="/logo.png" alt="logo" />
</div>
        {sidebarOpen && (
      <div className="logo-text">
            <h2>KHỔNG TỬ NHÍ</h2>
            <p>Class Management System</p>
          </div>
        )}
      </div>

      {/* MENU CHÍNH */}
      <ul className="menu">
        <li
          className={active === "dashboard" ? "active" : ""}
          onClick={() => changePage("dashboard")}
          title="Dashboard"
        >
          <div className="menu-icon"><FaHome /></div>
          {sidebarOpen && <span>Dashboard</span>}
        </li>

        <li
          className={active === "teachers" ? "active" : ""}
          onClick={() => changePage("teachers")}
          title="Giáo Viên"
        >
          <div className="menu-icon"><FaChalkboardTeacher /></div>
          {sidebarOpen && <span>Giáo Viên</span>}
        </li>

        <li
          className={active === "classes" ? "active" : ""}
          onClick={() => changePage("classes")}
          title="Lớp Học"
        >
          <div className="menu-icon"><FaBook /></div>
          {sidebarOpen && <span>Lớp Học</span>}
        </li>

        <li
          className={active === "reports" ? "active" : ""}
          onClick={() => changePage("reports")}
          title="Báo Cáo"
        >
          <div className="menu-icon"><FaChartBar /></div>
          {sidebarOpen && <span>Báo Cáo</span>}
        </li>
      </ul>

      {/* FOOTER */}
      <div className="sidebar-footer">

        {/* USER INFO */}
        {sidebarOpen && (
          <div className="user-box">
            <div className="avatar">{user?.name?.charAt(0) || "A"}</div>
            <div className="user-info">
              <p>{user?.name || "Admin"}</p>
              <span>Quản trị viên</span>
            </div>
          </div>
        )}

        {/* LOGOUT */}
        <div className="logout-wrapper">
          <button className="logout-new" onClick={logout} title="Đăng xuất">
            <HiOutlineLogout className="logout-icon-svg" />
            {sidebarOpen && <span>Đăng Xuất</span>}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;