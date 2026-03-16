import React from "react";

function RoleSelect({ user, selectRole }) {
  return (
    <>
      <style>{`

.role-page{
width:1100px;
height:600px;
border-radius:10px;
background:white;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
font-family:Arial, Helvetica, sans-serif;
}

/* HEADER */

.role-header{
text-align:center;
margin-bottom:40px;
animation:fadeDown 0.6s ease;
}

.role-logo{
width:65px;
margin-bottom:10px;
}

.center-name{
color:#c62828;
font-weight:bold;
letter-spacing:2px;
margin-bottom:5px;
}

.role-header h2{
font-size:20px;
color:#444;
}

.role-header h1{
font-size:38px;
margin:10px 0;
color:#222;
}

.role-header p{
color:#666;
font-size:15px;
}

/* CARD CONTAINER */

.role-container{
display:flex;
gap:40px;
}

/* CARD */

.role-card{
width:300px;
background:wheat;
padding:35px;
border-radius:20px;
text-align:center;
box-shadow:0 8px 25px rgba(0,0,0,0.08);
transition:all 0.3s ease;
border:2px solid transparent;
}

/* HOVER EFFECT */

.role-card:hover{
transform:translateY(-8px);
box-shadow:0 15px 35px rgba(0,0,0,0.15);
border-color:#c62828;
}

/* ICON */

.role-icon{
width:85px;
margin-bottom:15px;
}

/* TITLE */

.role-card h3{
font-size:22px;
margin-bottom:8px;
color:#222;
}

/* TEXT */

.role-card p{
font-size:14px;
color:#666;
margin-bottom:20px;
}

/* BUTTON */

.role-card button{
padding:10px 22px;
border:none;
border-radius:10px;
background:#c62828;
color:white;
font-size:14px;
cursor:pointer;
transition:all 0.25s ease;
}

/* BUTTON HOVER */

.role-card button:hover{
background:#a81f1f;
transform:scale(1.05);
}

/* ANIMATION */

@keyframes fadeDown{

from{
opacity:0;
transform:translateY(-20px);
}

to{
opacity:1;
transform:translateY(0);
}

}

      `}</style>

      <div className="role-page">
        <div className="role-header">
          <img src="/logo.png" className="role-logo" alt="logo" />
          <div className="center-name">KHỔNG TỬ NHÍ</div>
          <h2>Hệ thống quản lý lớp học</h2>
          <h1>Chọn Vai Trò</h1>
          <p>Vui lòng chọn vai trò để tiếp tục đăng nhập</p>
        </div>

        <div className="role-container">

          <div className="role-card">
            <img src="/admin.png" className="role-icon" alt="admin" />
            <h3>Quản Trị Viên</h3>
            <p>Quản lý toàn bộ hệ thống</p>
            <button onClick={() => selectRole("admin")}>
              Đăng nhập →
            </button>
          </div>

          <div className="role-card">
            <img src="/teacher.png" className="role-icon" alt="teacher" />
            <h3>Giáo Viên</h3>
            <p>Quản lý lớp học & học sinh</p>
            <button onClick={() => selectRole("teacher")}>
              Đăng nhập →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default RoleSelect;