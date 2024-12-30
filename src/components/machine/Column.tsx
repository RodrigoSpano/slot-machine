import React, { useEffect } from 'react';
import './Column.css';
import type { TColumnProps } from '@/types';
import { useColumns } from '../../hooks/useColumns';


const Column: React.FC<TColumnProps> = ({ items, isSpinning, duration }) => {
const {colRef,duplicatedItems} = useColumns({items, isSpinning, duration})
const [columnsResult, setColumnsResult] = React.useState<string[]>([])

  useEffect(()=>{
    if(!isSpinning){
      const column_result = colRef.current?.children[1].getAttribute("data-item")
      if(columnsResult?.length >= 3) return
      if(!column_result) return
      setColumnsResult([...columnsResult, column_result])
      console.log(column_result)
    }
  },[isSpinning])


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
