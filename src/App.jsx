import { useState, useCallback, useEffect } from "react";
import Login from "./components/Login";
import RoleSelect from "./components/RoleSelect";
function App() {

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  /* đọc dữ liệu đã lưu khi reload */
  useEffect(() => {

    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLogin(true);
    }

    if (savedRole) {
      setRole(savedRole);
    }

  }, []);

  const handleLogout = useCallback(() => {

    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setIsLogin(false);
    setRole(null);
    setUser(null);
    setErrorMsg("");

  }, []);

  const handleSelectRole = (selectedRole) => {

    if (user?.role === "admin" && selectedRole === "teacher") {
      setErrorMsg("Tài khoản của bạn là Admin, không được phép truy cập vai trò Giáo viên!");
      return;
    }

    if (user?.role === "teacher" && selectedRole === "admin") {
      setErrorMsg("Tài khoản của bạn là Giáo viên, không được phép truy cập vai trò Admin!");
      return;
    }

    setRole(selectedRole);
    localStorage.setItem("role", selectedRole);
    setErrorMsg("");
  };

  if (!isLogin) {
    return (
      <div className="container-wrapper">
        <div className="container">

          <div className="left">
            <img src="/classroom.jpg" alt="classroom" />
            <div className="system-title">Hệ thống quản lý lớp học EduClass</div>
          </div>

          <div className="right">
            <div className="logo">
              <img src="/logo.png" alt="logo" />
            </div>

            <Login
              loginSuccess={(userData) => {

                setUser(userData);
                setIsLogin(true);

                localStorage.setItem("user", JSON.stringify(userData));

              }}
              openForgot={() => setActiveModal("forgot")}
            />

          </div>

        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="role-wrapper">

        {errorMsg && (
          <div style={{
            color: "red",
            textAlign: "center",
            marginBottom: "10px",
            fontWeight: "bold"
          }}>
            {errorMsg}
          </div>
        )}

        <RoleSelect user={user} selectRole={handleSelectRole} />

      </div>
    );
  }

  return (
    <div className="main">

      {role === "admin" ? (
        <AdminDashboard user={user} logout={handleLogout} />
      ) : (
        <TeacherDashboard user={user} logout={handleLogout} />
      )}

    </div>
  );
}

export default App;