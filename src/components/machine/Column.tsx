import type { TColumnProps } from '@/types';
import React from 'react';
import './Column.css';
import { useColumns } from '../../hooks/useColumns';

const Column: React.FC<TColumnProps> = ({ items, isSpinning, duration }) => {
const {colRef,duplicatedItems} = useColumns({items, isSpinning, duration})

  return (
    <div className="outer-col">
      <div
        ref={colRef}
        className={`col ${isSpinning ? 'spinning' : ''}`}
      >
        {duplicatedItems.map((element, idx) => (
          <div key={idx} className="icon" data-item={element.name}>
            <img src={element.image} alt={element.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
