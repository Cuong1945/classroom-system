import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function DashboardContent1() {

  const classes = [
    { id: 1, name: "HSK 1 Cơ bản", students: 22, time: "08:00" },
    { id: 2, name: "HSK 2 Giao tiếp", students: 18, time: "10:00" },
    { id: 3, name: "HSK 3 Nâng cao", students: 20, time: "14:00" }
  ];

  const studentData = [
    { month: "T1", students: 15 },
    { month: "T2", students: 20 },
    { month: "T3", students: 28 },
    { month: "T4", students: 35 },
    { month: "T5", students: 40 },
    { month: "T6", students: 45 }
  ];

  const attendanceData = [
    { name: "Đi học", value: 92 },
    { name: "Nghỉ học", value: 8 }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const totalStudents = classes.reduce((sum, c) => sum + c.students, 0);

  return (
    <div className="dashboard">

      {/* CARDS */}
      <div className="cards">

        <div className="card">
          <h3>{classes.length}</h3>
          <p>Lớp tiếng Trung</p>
          <span>Đang hoạt động</span>
        </div>

        <div className="card">
          <h3>{totalStudents}</h3>
          <p>Tổng học viên</p>
          <span>+6 tháng này</span>
        </div>

        <div className="card">
          <h3>{classes.length}</h3>
          <p>Buổi học hôm nay</p>
          <span>Đang diễn ra</span>
        </div>

        <div className="card">
          <h3>92%</h3>
          <p>Tỷ lệ chuyên cần</p>
          <span>↑ 2%</span>
        </div>

      </div>


      {/* CHARTS */}
      <div className="charts">

        {/* BAR CHART */}
        <div className="chart-box">
          <h3>Học viên mới theo tháng</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="students"
                name="Học viên mới"
                fill="#3b82f6"
                radius={[6,6,0,0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>


        {/* PIE CHART */}
        <div className="chart-box">
          <h3>Tỉ lệ chuyên cần</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={attendanceData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Legend />
              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>


      {/* TABLE */}
      <div className="table-box">

        <h3>Lớp tiếng Trung đang dạy</h3>

        <table className="dashboard-table">

          <thead>
            <tr>
              <th>Mã lớp</th>
              <th>Lớp HSK</th>
              <th>Số học viên</th>
              <th>Thời gian</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.students}</td>
                <td>{c.time}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DashboardContent1;
