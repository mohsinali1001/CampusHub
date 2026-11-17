// App.jsx - Main Dashboard Component that combines all subcomponents
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import StudentTable from './components/StudentTable';
import RecentActivity from './components/RecentActivity';
import {
  departmentOptions,
  initialStudents,
  newStudentDefaults,
  summaryCardData,
} from './data/dashboardData';
import './App.css';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Settings from './pages/Settings';
import { initialCourses } from './data/courseData';
import Attendance from './pages/Attendance';
function App() {
  // useState stores changing dashboard data and makes the UI update after each action.
  const [students, setStudents] = useState(initialStudents);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [newStudent, setNewStudent] = useState(newStudentDefaults);

  const [searchText, setSearchText] = useState('');

  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [activePage, setActivePage] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [studentFormError, setStudentFormError] = useState('');

  const [courses, setCourses] = useState(initialCourses);
  const [courseFormError, setCourseFormError] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const filteredStudents = students.filter((student) => {
    const search = searchText.trim().toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(search) ||
      student.rollNumber.toLowerCase().includes(search);

    const matchesDepartment =
      selectedDepartment === 'All Departments' ||
      student.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });
  const departments = [...new Set(students.map((student) => student.department))];
  const summaryCards = summaryCardData.map((card) => {
    if (card.id === 'totalStudents') {
      return { ...card, value: students.length };
    }

    if (card.id === 'departments') {
      return { ...card, value: departments.length };
    }

    return card;
  });

  // Props let the reusable table receive the current student records.
  const handleAddStudent = (event) => {
    event.preventDefault();

    const rollNumber = newStudent.rollNumber.trim().toLowerCase();
    const email = newStudent.email.trim().toLowerCase();

    const duplicateRollNumber = students.some(
      (student) =>
        student.rollNumber.trim().toLowerCase() === rollNumber
    );

    const duplicateEmail = students.some(
      (student) =>
        student.email.trim().toLowerCase() === email
    );

    if (duplicateRollNumber) {
      setStudentFormError('This roll number already exists.');
      return;
    }

    if (duplicateEmail) {
      setStudentFormError('This email address already exists.');
      return;
    }

    const student = {
      ...newStudent,
      name: newStudent.name.trim(),
      rollNumber: newStudent.rollNumber.trim(),
      email: newStudent.email.trim(),
      id: Date.now(),
      gpa: '0.00',
      status: 'Active',
    };

    setStudents((currentStudents) => [
      ...currentStudents,
      student,
    ]);

    setNewStudent(newStudentDefaults);
    setStudentFormError('');
    setIsAddFormVisible(false);
  };

  const handleDeleteStudent = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId)
    );
  };

  const handleNewStudentChange = (event) => {
    const { name, value } = event.target;

    setNewStudent((currentStudent) => ({
      ...currentStudent,
      [name]: value,
    }));

    setStudentFormError('');
  };

  const handleAddCourse = (courseData) => {
    const courseCode = courseData.courseCode.trim().toUpperCase();

    const alreadyExists = courses.some(
      (course) => course.courseCode.toUpperCase() === courseCode
    );

    if (alreadyExists) {
      setCourseFormError('A course with this course code already exists.');
      return false;
    }

    const newCourse = {
      ...courseData,
      id: Date.now(),
      courseCode,
      title: courseData.title.trim(),
      instructor: courseData.instructor.trim(),
      creditHours: Number(courseData.creditHours),
    };

    setCourses((current) => [...current, newCourse]);
    setCourseFormError('');

    return true;
  };

  const handleDeleteCourse = (courseId) => {
    setCourses((current) =>
      current.filter((course) => course.id !== courseId)
    );
  };


  const handleMarkAttendance = (studentId, date, status) => {
    setAttendanceRecords((currentRecords) => {
      const existingRecord = currentRecords.some(
        (record) =>
          record.studentId === studentId && record.date === date
      );

      if (existingRecord) {
        return currentRecords.map((record) =>
          record.studentId === studentId && record.date === date
            ? { ...record, status }
            : record
        );
      }

      return [
        ...currentRecords,
        {
          studentId,
          date,
          status,
        },
      ];
    });
  };
  return (
    <div className={`dashboard-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* 1. Left Navigation Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() =>
          setIsSidebarCollapsed((collapsed) => !collapsed)
        }
        activePage={activePage}
        onNavigate={setActivePage}
        isOnline={isOnline}
      />

      {/* 2. Main Content Area */}
      <div className="main-wrapper">
        {/* Top Header */}
        <Header />

            {activePage === 'dashboard' && (
            <Dashboard
              students={students}
            />
          )}

        {/* Dashboard Main Workspace */}
        <main className="dashboard-content">

          {activePage === 'dashboard' && (
            <>
              <SummaryCards cards={summaryCards} />

              <div className="content-grid">
                <StudentTable
                  students={students}
                  departmentOptions={departmentOptions}
                  isAddFormVisible={isAddFormVisible}
                  onToggleAddForm={() =>
                    setIsAddFormVisible((visible) => !visible)
                  }
                  newStudent={newStudent}
                  onNewStudentChange={handleNewStudentChange}
                  onAddStudent={handleAddStudent}
                  onDeleteStudent={handleDeleteStudent}
                />

                <RecentActivity />
              </div>
            </>
          )}
      

          {activePage === 'students' && (
            <Students
              students={students}
              filteredStudents={filteredStudents}
              departmentOptions={departmentOptions}
              isAddFormVisible={isAddFormVisible}
              onToggleAddForm={() => {
                setIsAddFormVisible((visible) => !visible);
                setStudentFormError('');
              }}
              newStudent={newStudent}
              onNewStudentChange={handleNewStudentChange}
              onAddStudent={handleAddStudent}
              onDeleteStudent={handleDeleteStudent}
              searchText={searchText}
              onSearchChange={setSearchText}
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
              studentFormError={studentFormError}
            />
          )}

          {activePage === 'courses' && (
            <Courses
              courses={courses}
              departmentOptions={departmentOptions}
              onAddCourse={handleAddCourse}
              onDeleteCourse={handleDeleteCourse}
              courseFormError={courseFormError}
            />
          )}

          {activePage === 'attendance' && (
            <Attendance
              students={students}
              attendanceRecords={attendanceRecords}
              departmentOptions={departmentOptions}
              onMarkAttendance={handleMarkAttendance}
            />
          )}

          {activePage === 'settings' && (
            <Settings
              isOnline={isOnline}
              onToggleOnline={() => setIsOnline((current) => !current)}
            />
          )}

        </main>
      </div>
    </div>
  );
}

export default App;
