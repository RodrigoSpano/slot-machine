import { PRIZE_CONDITIONS_ENUM } from '../types/enum';
import { useColumnResult } from '../stores/useResultStore';
import { useEffect } from 'react';

const PRIZE_CONDITIONS = {
  [PRIZE_CONDITIONS_ENUM.NORMAL_WIN]: "Congrats! You win a PS2!",
  [PRIZE_CONDITIONS_ENUM.SPECIAL_WIN]: "Congrats! You win a PS3!",
  [PRIZE_CONDITIONS_ENUM.BIG_WIN]: "Congrats! You win a PS5 and Xbox One!",
};

const usePrize = () => {
  const { result } = useColumnResult();
  const cols = 3

  useEffect(() => {
    if (result.length !== cols) return;

    const checkWinningCondition = () => {
      const isSameResult = result.every((value) => value === result[0]);
      if (!isSameResult) return;

      const prizeKey = result[0] as PRIZE_CONDITIONS_ENUM
      const prizeMessage = PRIZE_CONDITIONS[PRIZE_CONDITIONS_ENUM.NORMAL_WIN] || PRIZE_CONDITIONS[prizeKey]

      alert(prizeMessage);
    };

    const timer = setTimeout(checkWinningCondition, 100);

    return () => clearTimeout(timer);
  }, [result]);
};

export default usePrize;
