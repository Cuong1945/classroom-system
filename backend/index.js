const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. KẾT NỐI MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: 'cuong1904', // Đảm bảo mật khẩu MySQL của bạn đúng là 'cuong1904'
    database: 'school_management'
});

db.connect(err => {
    if (err) {
        console.error("Lỗi kết nối MySQL:", err.message);
    } else {
        console.log("Đã kết nối MySQL thành công!");
    }
});

// 2. API ĐĂNG NHẬP
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Truy vấn tìm user khớp cả username và password
    const sql = "SELECT full_name as name, role, username FROM users WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Lỗi Server" });
        
        if (result.length > 0) {
            res.json({
                success: true,
                user: result[0] // Trả về object chứa name và role ('admin' hoặc 'teacher')
            });
        } else {
            res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
        }
    });
});
3.//API ĐĂNG KÝ
// API Đăng ký tài khoản mới
app.post('/api/register', (req, res) => {
    const { username, email, password, role } = req.body;

    // Kiểm tra tài khoản đã tồn tại chưa
    const checkSql = "SELECT * FROM users WHERE username = ?";
    db.query(checkSql, [username], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Lỗi kiểm tra dữ liệu" });
        if (result.length > 0) {
            return res.status(400).json({ success: false, message: "Tên tài khoản đã tồn tại" });
        }

        // Nếu chưa tồn tại thì thêm mới vào MySQL
        // Mặc định cho role là 'teacher' nếu không truyền vào, hoặc bạn có thể thêm chọn role ở form
        const insertSql = "INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)";
        const fullName = username; // Tạm thời lấy username làm tên hiển thị
        const userRole = role || 'teacher'; 

        db.query(insertSql, [username, password, fullName, userRole], (err, data) => {
            if (err) return res.status(500).json({ success: false, message: "Lỗi đăng ký tài khoản" });
            res.json({ success: true, message: "Đăng ký thành công!" });
        });
    });
});

app.listen(5000, () => console.log("Backend đang chạy tại http://localhost:5000"));