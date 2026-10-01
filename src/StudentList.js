import React from 'react';
import StudentItem from './StudentItem';

const StudentList = ({ students, onDelete }) => {
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.theadRow}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Họ tên</th>
            <th style={styles.th}>Điểm số</th>
            <th style={styles.th}>Lớp</th>
            <th style={styles.th}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <StudentItem key={student.id} student={student} onDelete={onDelete} />
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.emptyTd}>Không có sinh viên nào hết á!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;

const styles = {
  tableContainer: {
    overflowX: 'auto',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(255, 192, 203, 0.2)',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  theadRow: {
    backgroundColor: '#ffb6c1',
  },
  th: {
    color: 'white',
    padding: '12px 10px',
    fontSize: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyTd: {
    textAlign: 'center',
    color: '#aaa',
    fontStyle: 'italic',
    padding: '20px',
    fontSize: '14px',
  },
};