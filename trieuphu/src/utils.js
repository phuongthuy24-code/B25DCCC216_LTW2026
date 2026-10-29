import { MILESTONES, PRIZES } from './data';

export const calcPrize = (correctCount, reason) => {
  if (reason === 'win') return PRIZES[PRIZES.length - 1];

  if (reason === 'quit') {
    return correctCount === 0 ? 0 : PRIZES[correctCount - 1];
  }

  const passed = MILESTONES.filter((m) => m <= correctCount);
  if (passed.length === 0) return 0;
  return PRIZES[passed[passed.length - 1] - 1];
};

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const makeAudience = (answer, hidden) => {
  const result = [0, 0, 0, 0];
  const correct = randInt(40, 70);
  result[answer] = correct;

  const wrongs = [0, 1, 2, 3].filter((i) => i !== answer && !hidden.includes(i));
  const remaining = 100 - correct;
  const weights = wrongs.map(() => randInt(1, 10));
  const sum = weights.reduce((a, b) => a + b, 0);

  let given = 0;
  wrongs.forEach((idx, k) => {
    result[idx] = Math.floor((weights[k] / sum) * remaining);
    given += result[idx];
  });
  result[wrongs[0]] += remaining - given; 

  return result;
};