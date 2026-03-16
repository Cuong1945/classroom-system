import { FaBars } from "react-icons/fa"

function Header1({ user, toggleSidebar, setPage }) {
  return (
    <div className="header">
      <div className="header-left">
        <div className="menu-icon" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div>
          <h1>Xin chào, {user?.name || "Giáo viên"} 👋</h1>
          <p>Bảng điều khiển giáo viên hôm nay</p>
        </div>
      </div>

      <div className="header-right">
        <div
          className="avatar"
          onClick={() => setPage("profile")}
          style={{ cursor: "pointer" }}
          title="Thông tin cá nhân"
        >
          {user?.name?.charAt(0) || "G"}
        </div>
      </div>
    </div>
  )
}

export default Header1