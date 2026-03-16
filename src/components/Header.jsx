// Header.jsx
import { FaBars } from "react-icons/fa"

function Header({ user, toggleSidebar, setPage }) {
  return (
    <div className="header">
      <div className="header-left">
        <div className="menu-icon" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div>
          <h1>Xin chào, {user?.name} 👋</h1>
          <p>Tổng quan hệ thống hôm nay</p>
        </div>
      </div>

      <div className="header-right">
        
        {/* Gắn sự kiện chuyển sang trang profile khi click */}
        <div 
          className="avatar" 
          onClick={() => setPage("profile")} 
          style={{ cursor: "pointer" }}
          title="Xem thông tin cá nhân"
        >
          {user?.name?.charAt(0) || "A"}
        </div>
      </div>
    </div>
  )
}

export default Header