const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, className } = student;

  return (
    <tr style={styles.tr}>
      <td style={styles.td}>{id}</td>
      <td style={styles.td}>{name}</td>
      <td style={styles.td}>{score}</td>
      <td style={styles.td}>{className}</td>
      <td style={styles.td}>
        <button style={styles.deleteBtn} onClick={() => onDelete(id)}> Xóa</button>
      </td>
    </tr>
  );
};

export default StudentItem;

const styles = {
  tr: {
    borderBottom: '1px solid #ffe6ea',
  },
  td: {
    padding: '12px 10px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#5a4b51',
  },
  deleteBtn: {
    backgroundColor: '#ffb3c1',
    color: 'white',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px',
    fontFamily: 'inherit',
    boxShadow: '0 2px 6px rgba(255, 179, 193, 0.4)',
  },
};