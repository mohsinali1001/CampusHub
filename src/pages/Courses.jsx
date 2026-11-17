import { useState } from 'react';

function Courses({
  courses,
  departmentOptions,
  onAddCourse,
  onDeleteCourse,
  courseFormError,
}) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState('All Departments');

  const [newCourse, setNewCourse] = useState({
    courseCode: '',
    title: '',
    department: 'Computer Science',
    instructor: '',
    creditHours: '3',
  });

  const filteredCourses = courses.filter((course) => {
    return (
      selectedDepartment === 'All Departments' ||
      course.department === selectedDepartment
    );
  });

  const totalCreditHours = courses.reduce(
    (total, course) => total + Number(course.creditHours),
    0
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewCourse((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const wasAdded = onAddCourse(newCourse);

    if (wasAdded) {
      setNewCourse({
        courseCode: '',
        title: '',
        department: 'Computer Science',
        instructor: '',
        creditHours: '3',
      });

      setIsFormVisible(false);
    }
  };

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h1>Course Management</h1>
          <p>Manage courses, instructors and academic departments.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setIsFormVisible((current) => !current)}
        >
          {isFormVisible ? 'Cancel' : '+ Add Course'}
        </button>
      </div>

      <div className="course-summary-grid">
        <div className="course-summary-card">
          <span>Total Courses</span>
          <h2>{courses.length}</h2>
        </div>

        <div className="course-summary-card">
          <span>Departments</span>
          <h2>{new Set(courses.map((course) => course.department)).size}</h2>
        </div>

        <div className="course-summary-card">
          <span>Total Credit Hours</span>
          <h2>{totalCreditHours}</h2>
        </div>
      </div>

      {isFormVisible && (
        <div className="course-form-card">
          <h2>Add New Course</h2>

          {courseFormError && (
            <p className="form-error" role="alert">
              {courseFormError}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="course-form-grid">
              <div className="form-group">
                <label htmlFor="courseCode">Course Code</label>
                <input
                  id="courseCode"
                  name="courseCode"
                  value={newCourse.courseCode}
                  onChange={handleInputChange}
                  placeholder="e.g. CS-401"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Course Title</label>
                <input
                  id="title"
                  name="title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={newCourse.department}
                  onChange={handleInputChange}
                  required
                >
                  {departmentOptions.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="instructor">Instructor</label>
                <input
                  id="instructor"
                  name="instructor"
                  value={newCourse.instructor}
                  onChange={handleInputChange}
                  placeholder="Enter instructor name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="creditHours">Credit Hours</label>
                <select
                  id="creditHours"
                  name="creditHours"
                  value={newCourse.creditHours}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4, 5, 6].map((hours) => (
                    <option key={hours} value={hours}>
                      {hours}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="primary-button">
              Save Course
            </button>
          </form>
        </div>
      )}

      <div className="course-table-card">
        <div className="course-table-header">
          <div>
            <h2>All Courses</h2>
            <p>{filteredCourses.length} courses displayed</p>
          </div>

          <div className="course-filter">
            <label htmlFor="course-department-filter">Department</label>
            <select
              id="course-department-filter"
              value={selectedDepartment}
              onChange={(event) => setSelectedDepartment(event.target.value)}
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

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Department</th>
                <th>Instructor</th>
                <th>Credit Hours</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.courseCode}</td>
                    <td>{course.title}</td>
                    <td>{course.department}</td>
                    <td>{course.instructor}</td>
                    <td>{course.creditHours}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => onDeleteCourse(course.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-table-message">
                    No courses found for this department.
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

export default Courses;