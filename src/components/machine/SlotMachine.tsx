import React, { useState, useEffect } from 'react';
import Column from './Column';
import Button from './Button';

const ICONS = [
  'apple', 'apricot', 'banana', 'big_win', 'cherry', 
  'grapes', 'lemon', 'lucky_seven', 'orange', 
  'pear', 'strawberry', 'watermelon'
];

const BASE_SPINNING_DURATION = 2.7;
const COLUMN_SPINNING_DURATION = 0.3;

function SlotMachine() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const initializeColumns = () => {
      const baseItemAmount = 40;
      const newColumns = Array(5).fill(null).map((_, i) => {
        const amount = baseItemAmount + (i * 3);
        const items = Array.from({ length: amount }, () => getRandomIcon());
        const repeatedItems = items.slice(0, 3);
        return [...items, ...repeatedItems];
      });
      setColumns(newColumns);
    };
    initializeColumns();
  }, []);

  const handleSpin = () => {
    setIsSpinning(true);
    const totalDuration = BASE_SPINNING_DURATION + columns.length * COLUMN_SPINNING_DURATION;

    setTimeout(() => {
      setResult();
      setIsSpinning(false);
    }, totalDuration * 1000);
  };

  const setResult = () => {
    setColumns((prevColumns) => prevColumns.map((col) => {
      const results = [getRandomIcon(), getRandomIcon(), getRandomIcon()];
      return [...results, ...col.slice(3, col.length - 3), ...results];
    }));
  };

  return (
    <div className="slot-machine">
      <div className="window-border">
        <div className="window">
          {columns.map((col, index) => (
            <Column key={index} items={col} isSpinning={isSpinning} index={index} />
          ))}
        </div>
      </div>
      <Button onClick={handleSpin} disabled={isSpinning} />
    </div>
  );
}

function getRandomIcon() {
  return ICONS[Math.floor(Math.random() * ICONS.length)];
}

export default SlotMachine;
