import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName }) => {
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    navigate('/play');
  };

  return (
    <div>
      <h1>Ai là triệu phú</h1>

      <h3>Luật chơi</h3>
      <ul>
        <li>Có 15 câu hỏi trắc nghiệm, mỗi câu có 30 giây.</li>
        <li>Trả lời đúng thì lên bậc tiền thưởng tiếp theo, câu 15 trị giá 250.000.000 đ.</li>
        <li>Câu 5, 10, 15 là các mốc an toàn.</li>
        <li>Trả lời sai hoặc hết giờ thì chỉ nhận tiền của mốc an toàn cao nhất đã vượt qua.</li>
        <li>Có 3 quyền trợ giúp: 50:50, Hỏi khán giả, Dừng cuộc chơi.</li>
      </ul>

      <form onSubmit={handleStart}>
        <label>
          Tên người chơi:{' '}
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Nhập tên của bạn"
          />
        </label>{' '}
        <button type="submit" disabled={playerName.trim() === ''}>
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;