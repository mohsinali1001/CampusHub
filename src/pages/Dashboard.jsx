import DepartmentGpaChart from '../components/DepartmentGpaChart';
function Dashboard({ students = [] }) {
  return  <DepartmentGpaChart students={students} />;
}

export default Dashboard;