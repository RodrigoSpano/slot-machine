import { useState, useEffect } from 'react';
import {icons as ICONS} from "../utils/db"
import type { IColumn } from '@/types';
import { useColumnResult } from '../stores/useResultStore';


const BASE_SPINNING_DURATION = 2.7; // Duración base del spin en segundos
const COLUMN_SPINNING_DURATION = 1.0; // Tiempo adicional para cada columna
const COLUMNS_NUM = 3

export const useSlotMachine = () => {
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [columns, setColumns] = useState<IColumn[]>([]);
    const {clearResults} = useColumnResult()
  
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
        console.log(newColumns)
      };
      initializeColumns();
    }, []);
  
    const handleSpin = () => {
      clearResults()
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
 
    function getRandomIcon() {
      return ICONS[Math.floor(Math.random() * ICONS.length)];
      }

    return {
        columns,
        handleSpin,
        isSpinning,
    }
}