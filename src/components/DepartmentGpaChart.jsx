
function DepartmentGpaChart({ students = [] }) {
  const departmentStats = {};

  students.forEach((student) => {
    const gpa = Number(student.gpa);

    if (!student.department || !Number.isFinite(gpa)) return;

    if (!departmentStats[student.department]) {
      departmentStats[student.department] = {
        totalGpa: 0,
        count: 0,
      };
    }

    departmentStats[student.department].totalGpa += gpa;
    departmentStats[student.department].count += 1;
  });

  const departmentData = Object.entries(departmentStats).map(
    ([department, stats]) => ({
      department,
      averageGpa: stats.totalGpa / stats.count,
    })
  );

  const maxGpa = 4;

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
        <div className="department-gpa-list">
          {departmentData.map((item) => (
            <div className="department-gpa-item" key={item.department}>
              <div className="department-gpa-label">
                <span>{item.department}</span>
                <strong>{item.averageGpa.toFixed(2)}</strong>
              </div>

              <div
                className="department-gpa-track"
                role="progressbar"
                aria-label={`${item.department} average CGPA`}
                aria-valuemin="0"
                aria-valuemax="4"
                aria-valuenow={Number(item.averageGpa.toFixed(2))}
              >
                <div
                  className="department-gpa-fill"
                  style={{
                    width: `${Math.min(
                      (item.averageGpa / maxGpa) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-table-message">
          No GPA records are available yet.
        </p>
      )}
    </div>
  );
}

export default DepartmentGpaChart;
