
import { useState } from 'react';

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function Attendance({
  students,
  attendanceRecords,
  departmentOptions,
  onMarkAttendance,
}) {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedDepartment, setSelectedDepartment] =
    useState('All Departments');

  const filteredStudents = students.filter((student) => {
    return (
      selectedDepartment === 'All Departments' ||
      student.department === selectedDepartment
    );
  });

  const getStudentStatus = (studentId) => {
    const record = attendanceRecords.find(
      (item) => item.studentId === studentId && item.date === selectedDate
    );

    return record ? record.status : 'Not Marked';
  };

  const presentCount = filteredStudents.filter(
    (student) => getStudentStatus(student.id) === 'Present'
  ).length;

  const absentCount = filteredStudents.filter(
    (student) => getStudentStatus(student.id) === 'Absent'
  ).length;

  const lateCount = filteredStudents.filter(
    (student) => getStudentStatus(student.id) === 'Late'
  ).length;

  const notMarkedCount = filteredStudents.filter(
    (student) => getStudentStatus(student.id) === 'Not Marked'
  ).length;

  const markedCount = presentCount + absentCount + lateCount;

  const attendancePercentage =
    markedCount === 0
      ? 0
      : Math.round(((presentCount + lateCount) / markedCount) * 100);

  const handleStatusChange = (studentId, status) => {
    onMarkAttendance(studentId, selectedDate, status);
  };

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h1>Attendance Management</h1>
          <p>Record and manage daily student attendance.</p>
        </div>
      </div>

      <div className="attendance-controls">
        <div className="attendance-control-group">
          <label htmlFor="attendance-date">Attendance Date</label>
          <input
            id="attendance-date"
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </div>

        <div className="attendance-control-group">
          <label htmlFor="attendance-department">Department</label>
          <select
            id="attendance-department"
            value={selectedDepartment}
            onChange={(event) =>
              setSelectedDepartment(event.target.value)
            }
          >
            <option value="All Departments">All Departments</option>

            {departmentOptions.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="attendance-summary-grid">
        <div className="attendance-summary-card">
          <span>Total Students</span>
          <h2>{filteredStudents.length}</h2>
        </div>

        <div className="attendance-summary-card present-card">
          <span>Present</span>
          <h2>{presentCount}</h2>
        </div>

        <div className="attendance-summary-card absent-card">
          <span>Absent</span>
          <h2>{absentCount}</h2>
        </div>

        <div className="attendance-summary-card late-card">
          <span>Late</span>
          <h2>{lateCount}</h2>
        </div>

        <div className="attendance-summary-card unmarked-card">
          <span>Not Marked</span>
          <h2>{notMarkedCount}</h2>
        </div>
      </div>

      <div className="attendance-progress-card">
        <div className="attendance-progress-heading">
          <h2>Attendance Rate</h2>
          <strong>{attendancePercentage}%</strong>
        </div>

        <div className="attendance-progress-track">
          <div
            className="attendance-progress-fill"
            style={{ width: `${attendancePercentage}%` }}
          />
        </div>

        <p>
          Based on marked students. Present and Late count as attended.
        </p>
      </div>

      <div className="attendance-table-card">
        <div className="attendance-table-heading">
          <div>
            <h2>Student Attendance</h2>
            <p>{filteredStudents.length} students displayed</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Roll Number</th>
                <th>Department</th>
                <th>Attendance Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const status = getStudentStatus(student.id);

                  return (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.rollNumber}</td>
                      <td>{student.department}</td>
                      <td>
                        <select
                          className={`attendance-status-select status-${status
                            .toLowerCase()
                            .replace(' ', '-')}`}
                          value={status}
                          onChange={(event) =>
                            handleStatusChange(
                              student.id,
                              event.target.value
                            )
                          }
                          aria-label={`Attendance status for ${student.name}`}
                        >
                          <option value="Not Marked">Not Marked</option>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="empty-table-message">
                    No students found in this department.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Attendance;
