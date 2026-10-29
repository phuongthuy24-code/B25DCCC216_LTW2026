import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import MoneyLadder from '../components/MoneyLadder';
import { TIME_PER_QUESTION } from '../data';
import { calcPrize } from '../utils';

const GameScreen = ({ questions, playerName }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState('answering'); // answering -> locked -> revealed
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const question = questions[index];

  const finish = (reason, correctCount) => {
    navigate('/result', {
      replace: true,
      state: {
        name: playerName,
        prize: calcPrize(correctCount, reason),
        correctCount,
        reason,
      },
    });
  };

  const handleSelect = (i) => {
    setSelected(i);
    setStatus('locked');
  };

  useEffect(() => {
    if (status !== 'answering') return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [status, index]);
  useEffect(() => {
    if (status === 'answering' && timeLeft <= 0) {
      finish('timeout', index);
    }
  }, [timeLeft]);
  useEffect(() => {
    let id;
    if (status === 'locked') {
      id = setTimeout(() => setStatus('revealed'), 1000);
    } else if (status === 'revealed') {
      id = setTimeout(() => {
        if (selected === question.answer) {
          if (index === questions.length - 1) {
            finish('win', questions.length);
          } else {
            setIndex(index + 1);
            setSelected(null);
            setTimeLeft(TIME_PER_QUESTION);
            setStatus('answering');
          }
        } else {
          finish('wrong', index);
        }
      }, 2000);
    }
    return () => clearTimeout(id);
  }, [status]);

  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <div style={{ flex: 1 }}>
        <Timer timeLeft={timeLeft} />
        <QuestionCard
          number={index + 1}
          total={questions.length}
          question={question}
          status={status}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>
      <MoneyLadder currentIndex={index} />
    </div>
  );
};

const Play = ({ questions, playerName }) => {
  if (playerName.trim() === '') return <Navigate to="/" replace />;
  return <GameScreen questions={questions} playerName={playerName} />;
};

export default Play;