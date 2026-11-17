// dashboardData.js - Local dashboard data used by the application
export const initialStudents = [
  { id: 1, name: 'Ali Khan', rollNumber: 'CS-101', department: 'Computer Science', semester: '5th', email: 'ali.khan@campushub.edu', gpa: '3.72', status: 'Active' },
  { id: 2, name: 'Sara Ahmed', rollNumber: 'CS-102', department: 'Computer Science', semester: '3rd', email: 'sara.ahmed@campushub.edu', gpa: '3.91', status: 'Active' },
  { id: 3, name: 'Hamza Malik', rollNumber: 'SE-103', department: 'Software Engineering', semester: '7th', email: 'hamza.malik@campushub.edu', gpa: '3.45', status: 'Active' },
  { id: 4, name: 'Ayesha Noor', rollNumber: 'AI-104', department: 'Artificial Intelligence', semester: '5th', email: 'ayesha.noor@campushub.edu', gpa: '3.84', status: 'Active' },
  { id: 5, name: 'Bilal Hassan', rollNumber: 'IT-105', department: 'Information Technology', semester: '1st', email: 'bilal.hassan@campushub.edu', gpa: '3.20', status: 'Inactive' },
  { id: 6, name: 'Hira Shah', rollNumber: 'SE-106', department: 'Software Engineering', semester: '3rd', email: 'hira.shah@campushub.edu', gpa: '3.68', status: 'Active' },
];

export const summaryCardData = [
  {
    id: 'totalStudents',
    title: 'Total Students',
    icon: '👨‍🎓',
    description: 'Enrolled across all programs',
    theme: 'blue',
  },
  {
    id: 'activeCourses',
    title: 'Active Courses',
    value: '12',
    icon: '📚',
    description: 'Undergraduate offerings',
    theme: 'indigo',
  },
  {
    id: 'attendance',
    title: 'Average Attendance',
    value: '87%',
    icon: '📊',
    description: 'Current semester average',
    theme: 'emerald',
  },
  {
    id: 'departments',
    title: 'Departments',
    icon: '🏛️',
    description: 'Faculties in operation',
    theme: 'amber',
  },
];

export const departmentOptions = [
  'Computer Science',
  'Software Engineering',
  'Artificial Intelligence',
  'Information Technology',
];

export const newStudentDefaults = {
  name: '',
  rollNumber: '',
  department: departmentOptions[0],
  semester: '1st',
  email: '',
};
