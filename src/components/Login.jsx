import { useState, useRef } from "react";

function Login({ loginSuccess }) {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [rememberMe,setRememberMe] = useState(false);
  const [passError,setPassError] = useState("");
  const [loading,setLoading] = useState(false);

  const [showRegister,setShowRegister] = useState(false);
  const [showForgot,setShowForgot] = useState(false);

  const [user,setUser] = useState("");
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const [errors,setErrors] = useState({});
  const [regLoading,setRegLoading] = useState(false);

  const [step,setStep] = useState(1);
  const [fpEmail,setFpEmail] = useState("");
  const [newPass,setNewPass] = useState("");
  const [fpError,setFpError] = useState("");
  const otpInputs = useRef([]);

async function handleLogin(e){
  e.preventDefault();

  if(!username || !password){
    setPassError("Vui lòng nhập đầy đủ");
    return;
  }

  setLoading(true);

  try{

    if(username==="admin" && password==="123456"){

      const userData = {username:"admin",role:"admin",name:"Admin"};

      if(rememberMe){
        localStorage.setItem("user",JSON.stringify(userData));
      }

      loginSuccess(userData);
      return;
    }

    if(username==="teacher" && password==="123456"){

      const userData = {username:"teacher",role:"teacher",name:"Nguyen Van A"};

      if(rememberMe){
        localStorage.setItem("user",JSON.stringify(userData));
      }

      loginSuccess(userData);
      return;
    }

    const res = await fetch("http://localhost:5000/api/login",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({username,password})
    });

    const data = await res.json();

    if(data.success){

      if(rememberMe){
        localStorage.setItem("user",JSON.stringify(data.user));
      }

      loginSuccess(data.user);

    }else{
      setPassError(data.message);
    }

  }catch{
    setPassError("Không kết nối được server");
  }

  setLoading(false);
}

  async function register(){

    let newErrors = {};
    let valid = true;

    if(!user){ newErrors.user="Không được bỏ trống"; valid=false;}
    if(!email){ newErrors.email="Không được bỏ trống"; valid=false;}
    if(pass.length<6){ newErrors.pass="Mật khẩu ≥ 6 ký tự"; valid=false;}

    setErrors(newErrors);
    if(!valid) return;

    setRegLoading(true);

    try{

      const res = await fetch("http://localhost:5000/api/register",{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({
          username:user,
          email:email,
          password:pass,
          role:"teacher"
        })
      });

      const data = await res.json();

      if(data.success){
        alert("Đăng ký thành công");
        setShowRegister(false);
      }else{
        setErrors({server:data.message});
      }

    }catch{
      setErrors({server:"Không kết nối được server"});
    }

    setRegLoading(false);
  }

  function handleSendOTP(){

    if(!fpEmail.includes("@")){
      setFpError("Email không hợp lệ");
      return;
    }

    setFpError("");
    setStep(2);
  }

  function handleVerifyOTP(){

    const otp = otpInputs.current.map(i=>i.value).join("");

    if(otp!=="123456"){
      setFpError("OTP sai");
      return;
    }

    setFpError("");
    setStep(3);
  }

  function handleFinish(){

    if(newPass.length<6){
      setFpError("Mật khẩu ≥ 6 ký tự");
      return;
    }

    alert("Đổi mật khẩu thành công");
    setShowForgot(false);
    setStep(1);
  }

  return (

<>
<style>{`

.login-title{
text-align:center;
font-size:26px;
margin-bottom:5px;
color:#222;
}

.login-desc{
text-align:center;
font-size:14px;
color:#666;
margin-bottom:20px;
}

.input-group{
margin-bottom:15px;
}

.input-group input{
width:100%;
padding:10px;
margin-top:5px;
border:1px solid #ccc;
border-radius:5px;
}

.error{
color:red;
font-size:13px;
margin-top:3px;
}

button{
width:100%;
padding:12px;
background:#c62828;
color:white;
border:none;
border-radius:5px;
cursor:pointer;
margin-top:10px;
}

button:hover{
background:#a81f1f;
}

.login-utils{
display:flex;
justify-content:space-between;
align-items:center;
margin:10px 0 20px;
font-size:14px;
}

.remember-me{
display:flex;
align-items:center;
gap:8px;
cursor:pointer;
color:#666;
}

.remember-me input{
width:16px;
height:16px;
accent-color:#c62828;
}

.forgot-link{
color:#c62828;
cursor:pointer;
font-weight:bold;
}

.forgot-link:hover{
text-decoration:underline;
}

.modal{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.45);
display:flex;
justify-content:center;
align-items:center;
backdrop-filter:blur(4px);
}

.modal-content{
background:white;
padding:35px 30px;
width:400px;
border-radius:12px;
text-align:center;
box-shadow:0 10px 30px rgba(0,0,0,0.15);
animation:modalFade 0.3s ease;
}

.fp-input{
width:100%;
padding:10px;
margin-top:8px;
border:1px solid #ccc;
border-radius:6px;
font-size:14px;
}

.otp{
display:flex;
justify-content:center;
gap:12px;
margin:25px 0;
}

.otp input{
width:50px;
height:50px;
border-radius:8px;
border:1px solid #ddd;
text-align:center;
font-size:20px;
font-weight:600;
}

.close-btn{
background:#ccc;
color:black;
}

@keyframes modalFade{
from{
transform:translateY(-20px);
opacity:0;
}
to{
transform:translateY(0);
opacity:1;
}
}

`}</style>

<form onSubmit={handleLogin}>

<h2 className="login-title">Đăng Nhập</h2>
<p className="login-desc">Hệ thống quản lý lớp học Khổng Tử Nhí</p>

<div className="input-group">
<label>Tài khoản</label>
<input
type="text"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>
</div>

<div className="input-group">
<label>Mật khẩu</label>
<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
</div>

<div className="login-utils">

<label className="remember-me">
<input
type="checkbox"
checked={rememberMe}
onChange={(e)=>setRememberMe(e.target.checked)}
/>
<span>Ghi nhớ</span>
</label>

<span className="forgot-link" onClick={()=>setShowForgot(true)}>
Quên mật khẩu?
</span>

</div>

{passError && <div className="error">{passError}</div>}

<button type="submit">
{loading ? "Đang đăng nhập..." : "Đăng nhập"}
</button>

<button type="button" onClick={()=>setShowRegister(true)}>
Đăng ký
</button>

</form>

{/* REGISTER */}

{showRegister && (

<div className="modal">
<div className="modal-content">

<h3>Đăng ký</h3>

{errors.server && <div className="error">{errors.server}</div>}

<div className="input-group">
<label>Tài khoản</label>
<input value={user} onChange={(e)=>setUser(e.target.value)}/>
<div className="error">{errors.user}</div>
</div>

<div className="input-group">
<label>Email</label>
<input value={email} onChange={(e)=>setEmail(e.target.value)}/>
<div className="error">{errors.email}</div>
</div>

<div className="input-group">
<label>Mật khẩu</label>
<input type="password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
<div className="error">{errors.pass}</div>
</div>

<button onClick={register}>
{regLoading ? "Đang xử lý..." : "Đăng ký"}
</button>

<button className="close-btn" onClick={()=>setShowRegister(false)}>
Hủy
</button>

</div>
</div>

)}

{/* FORGOT PASSWORD */}

{showForgot && (

<div className="modal">
<div className="modal-content">

{step===1 && (
<>
<h3>Khôi phục mật khẩu</h3>

<input
className="fp-input"
placeholder="email@gmail.com"
value={fpEmail}
onChange={(e)=>setFpEmail(e.target.value)}
/>

{fpError && <div className="error">{fpError}</div>}

<button onClick={handleSendOTP}>Tiếp theo</button>
</>
)}

{step===2 && (
<>
<h3>Nhập OTP</h3>

<div className="otp">
{[0,1,2,3,4,5].map(i=>(
<input key={i} maxLength="1" ref={el=>otpInputs.current[i]=el}/>
))}
</div>

{fpError && <div className="error">{fpError}</div>}

<button onClick={handleVerifyOTP}>Xác nhận</button>
</>
)}

{step===3 && (
<>
<h3>Mật khẩu mới</h3>

<input
className="fp-input"
type="password"
placeholder="Tối thiểu 6 ký tự"
value={newPass}
onChange={(e)=>setNewPass(e.target.value)}
/>

{fpError && <div className="error">{fpError}</div>}

<button onClick={handleFinish}>Cập nhật</button>
</>
)}

<button className="close-btn" onClick={()=>setShowForgot(false)}>
Hủy
</button>

</div>
</div>

)}

</>
  );
}

export default Login;