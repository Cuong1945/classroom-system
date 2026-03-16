import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import { Bar, Doughnut, Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
)

function DashboardContent() {
  // Cấu hình fix lỗi tràn và giữ bố cục cân đối
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Quan trọng: Để biểu đồ không bị "tụt" hoặc tràn
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  const studentData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
    datasets: [{
      label: "Học sinh mới",
      data: [20, 35, 28, 40, 55, 60],
      backgroundColor: "#4c6ef5"
    }]
  };

  const attendanceData = {
    labels: ["Có mặt", "Vắng"],
    datasets: [{
      data: [94, 6],
      backgroundColor: ["#40c057", "#fa5252"]
    }]
  };

  const teacherData = {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    datasets: [{
      label: "Số giáo viên",
      data: [5, 6, 8, 9, 11, 12],
      borderColor: "#339af0",
      backgroundColor: "rgba(116, 192, 252, 0.2)",
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <div className="dashboard">
      {/* ===== CARDS (Giữ nguyên bố cục gốc) ===== */}
      <div className="cards">
        <div className="card">
          <h3>12</h3>
          <p>Tổng giáo viên</p>
          <span>+2 tháng này</span>
        </div>
        <div className="card">
          <h3>8</h3>
          <p>Lớp đang hoạt động</p>
          <span>+1 tuần</span>
        </div>
        <div className="card">
          <h3>147</h3>
          <p>Học sinh</p>
          <span>+15 tháng</span>
        </div>
        <div className="card">
          <h3>94%</h3>
          <p>Chuyên cần</p>
          <span>↑ 2%</span>
        </div>
      </div>

      {/* ===== CHARTS HÀNG 1 (Giữ grid 1fr 1fr) ===== */}
      <div className="charts">
        <div className="chart-box">
          <h3>Học sinh mới theo tháng</h3>
          <div style={{ height: "300px", position: "relative" }}>
            <Bar data={studentData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-box">
          <h3>Tỉ lệ chuyên cần</h3>
          <div style={{ height: "300px", position: "relative" }}>
            <Doughnut data={attendanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* ===== CHARTS HÀNG 2 (Giữ bố cục gốc) ===== */}
      <div className="charts" style={{ marginTop: "30px" }}>
        <div className="chart-box">
          <h3>Tăng trưởng giáo viên</h3>
          <div style={{ height: "300px", position: "relative" }}>
            <Line data={teacherData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;