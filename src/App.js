import { useState } from 'react';
import StudentList from './StudentList';

const App = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Đặng Phương Thúy', score: 9.5, className: '10A1' },
    { id: 2, name: 'Phạm Thành Tân', score: 8.5, className: '10A2' },
    { id: 3, name: 'Phạm Khánh Hiền', score: 9.5, className: '10A1' }
  ]);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [className, setClassName] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  const handleAddStudent = (e) => {
    e.preventDefault();
    const numScore = parseFloat(score);

    if (!id.trim() || !name.trim() || !score || !className.trim()) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (students.some((s) => String(s.id) === id.trim())) {
      setError('ID này đã tồn tại rồi!');
      return;
    }
    if (isNaN(numScore) || numScore < 0 || numScore > 10) {
      setError('Điểm số không hợp lệ!');
      return;
    }
    const newStudent = {
      id: id.trim(),
      name,
      score: numScore,
      className,
    };

    setStudents([...students, newStudent]);
    setId('');
    setName('');
    setScore('');
    setClassName('');
    setError('');
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) => {
    if (filter === 'gioi') return student.score >= 8;
    if (filter === 'truot') return student.score < 5;
    return true;
  });

  const totalStudents = students.length;
  const avgScore = totalStudents > 0? 
  (students.reduce((sum, s) => sum + s.score, 0) / totalStudents).toFixed(2): 0;

  return (
    <div style={styles.appWrapper}>
      {/* Tải font chữ Quicksand và tạo nền màu hồng pastel */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap');
        body {
          margin: 0;
          background-color: #fff0f5;
          font-family: 'Quicksand', sans-serif;
        }
      `}</style>

      <div style={styles.cardContainer}>
        <h1 style={styles.title}>Quản lý sinh viên</h1>

        <form onSubmit={handleAddStudent} style={styles.form}>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            step="0.1"
            placeholder="Điểm số"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Lớp"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.addBtn}>Thêm sinh viên</button>
        </form>

        {error && <p style={styles.errorMsg}>{error}</p>}

        <div style={styles.filterBar}>
          <label style={styles.filterLabel}>Lọc sinh viên:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.select}
          >
            <option value="">Tất cả </option>
            <option value="gioi">Giỏi (≥ 8)</option>
            <option value="truot">Trượt (&lt; 5)</option>
          </select>
        </div>

        <StudentList students={filteredStudents} onDelete={handleDeleteStudent} />

        <div style={styles.statsContainer}>
          <p style={{ margin: 0 }}>Tổng số sinh viên: <strong>{totalStudents}</strong></p>
          <p style={{ margin: 0 }}>Điểm trung bình: <strong>{avgScore}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default App;

const styles = {
  appWrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '24px',
    boxShadow: '0 10px 25px rgba(255, 182, 193, 0.4)',
    maxWidth: '650px',
    width: '100%',
    border: '3px solid #ffd1dc',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    color: '#ff6b8b',
    fontSize: '26px',
    marginTop: 0,
    marginBottom: '20px',
    textShadow: '1px 1px 2px #ffe4e1',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '15px',
    justifyContent: 'center',
  },
  input: {
    padding: '10px 14px',
    border: '2px solid #ffccd5',
    borderRadius: '15px',
    outline: 'none',
    fontSize: '14px',
    backgroundColor: '#fffafb',
    flex: '1 1 120px',
    fontFamily: 'inherit',
    color: '#5a4b51',
  },
  addBtn: {
    backgroundColor: '#ff85a2',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(255, 133, 162, 0.3)',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
  },
  errorMsg: {
    color: '#ff4d6d',
    backgroundColor: '#fff0f3',
    padding: '8px 12px',
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '13px',
    marginBottom: '15px',
    border: '1px dashed #ffb3c1',
  },
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '10px',
    marginBottom: '15px',
  },
  filterLabel: {
    fontWeight: '600',
    color: '#ff6b8b',
    fontSize: '14px',
  },
  select: {
    padding: '6px 12px',
    border: '2px solid #ffccd5',
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: 'white',
    color: '#5a4b51',
    fontFamily: 'inherit',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#fff0f3',
    padding: '12px',
    borderRadius: '15px',
    border: '1px solid #ffccd5',
    fontWeight: '600',
    color: '#ff6b8b',
    fontSize: '14px',
  },
};