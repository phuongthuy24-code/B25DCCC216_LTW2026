import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import MoneyLadder from '../components/MoneyLadder';
import Lifelines from '../components/Lifelines';
import AudienceChart from '../components/AudienceChart';
import { TIME_PER_QUESTION, LETTERS } from '../data';
import { calcPrize, makeAudience } from '../utils';

const GameScreen = ({ questions, playerName, onFinish = () => {} }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState('answering'); 
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [used, setUsed] = useState({ fifty: false, audience: false });
  const [hidden, setHidden] = useState([]);
  const [audience, setAudience] = useState(null);

  const question = questions[index];

  const finish = (reason, correctCount) => {
    const prize = calcPrize(correctCount, reason);
    onFinish({ name: playerName, prize, correctCount });
    navigate('/result', {
      replace: true,
      state: { name: playerName, prize, correctCount, reason },
    });
  };

  const handleSelect = (i) => {
    setSelected(i);
    setStatus('locked');
  };

  const handleFifty = () => {
    const wrongs = [0, 1, 2, 3].filter((i) => i !== question.answer);
    const shuffled = [...wrongs].sort(() => Math.random() - 0.5);
    setHidden(shuffled.slice(0, 2));
    setUsed({ ...used, fifty: true });
  };

  const handleAudience = () => {
    setAudience(makeAudience(question.answer, hidden));
    setUsed({ ...used, audience: true });
  };
  const handleQuit = () => finish('quit', index);
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
            setHidden([]);
            setAudience(null);
            setStatus('answering');
          }
        } else {
          finish('wrong', index);
        }
      }, 2000);
    }
    return () => clearTimeout(id);
  }, [status]);

  useEffect(() => {
    const handleKey = (e) => {
      if (status !== 'answering') return;
      const i = LETTERS.indexOf(e.key.toUpperCase());
      if (i === -1 || hidden.includes(i)) return;
      handleSelect(i);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, hidden]);

  useEffect(() => {
    document.title = `Câu ${index + 1}/${questions.length} – ${playerName}`;
    return () => {
      document.title = 'Ai là triệu phú';
    };
  }, [index, playerName, questions.length]);

  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <div style={{ flex: 1 }}>
        <Timer timeLeft={timeLeft} />
        <Lifelines
          used={used}
          disabled={status !== 'answering'}
          onFifty={handleFifty}
          onAudience={handleAudience}
          onQuit={handleQuit}
        />
        <QuestionCard
          number={index + 1}
          total={questions.length}
          question={question}
          status={status}
          selected={selected}
          hidden={hidden}
          onSelect={handleSelect}
        />
        {audience && <AudienceChart percents={audience} />}
      </div>
      <MoneyLadder currentIndex={index} />
    </div>
  );
};

const Play = ({ questions, playerName, onFinish }) => {
  if (playerName.trim() === '') return <Navigate to="/" replace />;
  return (
    <GameScreen
      questions={questions}
      playerName={playerName}
      onFinish={onFinish}
    />
  );
};

export default Play;