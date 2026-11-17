import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function DepartmentGpaChart({ students = [] }) {
  const departmentStats = {};

  students.forEach((student) => {
    const gpa = Number(student.gpa);

    if (!student.department || !Number.isFinite(gpa)) return;

    if (!departmentStats[student.department]) {
      departmentStats[student.department] = { totalGpa: 0, count: 0 };
    }

    departmentStats[student.department].totalGpa += gpa;
    departmentStats[student.department].count += 1;
  });

  const departmentData = Object.entries(departmentStats).map(
    ([department, stats]) => ({
      department,
      averageGpa: Number((stats.totalGpa / stats.count).toFixed(2)),
      students: stats.count,
    })
  );

  return (
    <div className="department-gpa-card">
      <div className="department-gpa-header">
        <div>
          <h2>Department-wise Average CGPA</h2>
          <p>Average student GPA across academic departments</p>
        </div>

        <span className="gpa-scale">Scale: 0–4.00</span>
      </div>

      {departmentData.length > 0 ? (
        <div className="gpa-chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentData}
              margin={{ top: 24, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="department"
                tick={{ fontSize: 12, fill: "#475569" }}
                tickLine={false}
                axisLine={{ stroke: "#94a3b8" }}
              />
              <YAxis
                domain={[0, 4]}
                ticks={[0, 1, 2, 3, 4]}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(37, 99, 235, 0.06)" }}
                formatter={(value) => [value.toFixed(2), "Average CGPA"]}
              />
              <Bar
                dataKey="averageGpa"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
                maxBarSize={64}
              >
                <LabelList
                  dataKey="averageGpa"
                  position="top"
                  formatter={(value) => value.toFixed(2)}
                  style={{ fontSize: 13, fontWeight: 700, fill: "#0f172a" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="gpa-empty-message">No GPA records are available yet.</p>
      )}
    </div>
  );
}

export default DepartmentGpaChart;