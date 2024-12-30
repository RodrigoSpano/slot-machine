import React, { useState, useEffect } from 'react';
import Column from './Column';
import Button from './Button';
import './SlotMachine.css';

const ICONS = [
  'apple', 'apricot', 'banana', 'big_win', 'cherry',
  'grapes', 'lemon', 'lucky_seven', 'orange',
  'pear', 'strawberry', 'watermelon'
];

const BASE_SPINNING_DURATION = 2.7; // Duración base del spin en segundos
const COLUMN_SPINNING_DURATION = 1.0; // Tiempo adicional para cada columna
const COLUMNS_NUM = 3

function SlotMachine() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const initializeColumns = () => {
      const baseItemAmount = 40;
      const newColumns = Array(COLUMNS_NUM).fill(null).map((_, i) => {
        const amount = baseItemAmount + (i * 20);
        const items = Array.from({ length: amount }, () => getRandomIcon());
        const repeatedItems = items.slice(0, 3);
        return {
          items: [...items, ...repeatedItems],
          isSpinning: false,
          duration: BASE_SPINNING_DURATION + i * COLUMN_SPINNING_DURATION,
        };
      });
      setColumns(newColumns);
    };
    initializeColumns();
  }, []);

  const handleSpin = () => {
    setIsSpinning(true);
  
    columns.forEach((_, index) => {
      setTimeout(() => {
        setColumns((prev) =>
          prev.map((col, i) =>
            i === index
              ? { ...col, isSpinning: true }
              : col
          )
        );
      }, index * 300);
  
      const stopDelay = BASE_SPINNING_DURATION + index * COLUMN_SPINNING_DURATION;
      setTimeout(() => {
        setColumns((prev) =>
          prev.map((col, i) => {
            if (i === index) {
              const results = [getRandomIcon(), getRandomIcon(), getRandomIcon()];
              const updatedItems = [...results, ...col.items.slice(3, col.items.length - 3), ...results];
              return { ...col, items: updatedItems, isSpinning: false };
            }
            return col;
          })
        );
      }, stopDelay * 1000);
    });
  
    const totalDuration = BASE_SPINNING_DURATION + columns.length * COLUMN_SPINNING_DURATION;
    setTimeout(() => setIsSpinning(false), totalDuration * 1000);
  };
  
  

  return (
    <div className="slot-machine">
      <div className="window-border">
        <div className="window">
          {columns.map((col, index) => (
            <Column
              key={index}
              items={col.items}
              isSpinning={col.isSpinning}
              duration={col.duration}
            />
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
