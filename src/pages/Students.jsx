
import StudentTable from '../components/StudentTable';
import SummaryCards from '../components/SummaryCards';

function Students({
  students,
  filteredStudents,
  departmentOptions,
  isAddFormVisible,
  onToggleAddForm,
  newStudent,
  onNewStudentChange,
  onAddStudent,
  onDeleteStudent,
  searchText,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  studentFormError,
}) {
  const activeStudents = students.filter(
    (student) => student.status === 'Active'
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === 'Inactive'
  ).length;

  const totalDepartments = new Set(
    students.map((student) => student.department)
  ).size;

  const studentCards = [
    {
      title: 'Total Students',
      value: students.length,
      icon: '👨‍🎓',
      description: 'All registered students',
      theme: 'blue',
    },
    {
      title: 'Active Students',
      value: activeStudents,
      icon: '✅',
      description: 'Currently active',
      theme: 'emerald',
    },
    {
      title: 'Inactive Students',
      value: inactiveStudents,
      icon: '⏸️',
      description: 'Currently inactive',
      theme: 'amber',
    },
    {
      title: 'Departments',
      value: totalDepartments,
      icon: '🏛️',
      description: 'Available departments',
      theme: 'indigo',
    },
  ];

  return (
    <section className="page-section">

      <div className="page-heading">
        <div>
          <h1>Student Management</h1>
          <p>
            Manage student records, departments and enrollment information.
          </p>
        </div>
      </div>

      <SummaryCards cards={studentCards} />

      <StudentTable
        students={filteredStudents}
        departmentOptions={departmentOptions}
        isAddFormVisible={isAddFormVisible}
        onToggleAddForm={onToggleAddForm}
        newStudent={newStudent}
        onNewStudentChange={onNewStudentChange}
        onAddStudent={onAddStudent}
        onDeleteStudent={onDeleteStudent}
        searchText={searchText}
        onSearchChange={onSearchChange}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={onDepartmentChange}
        studentFormError={studentFormError}
      />

    </section>
  );
}

export default Students;
