import type { IColumn } from '@/types';
import { useState, useEffect } from 'react';
import { icons as ICONS } from "../utils/db";
import { useColumnResult } from '../stores/useResultStore';
import { PRIZE_CONDITIONS_ENUM } from '../types/enum';

const BASE_SPINNING_DURATION = 2.7;
const COLUMN_SPINNING_DURATION = 1.0;
const COLUMNS_NUM = 3;

export const useSlotMachine = () => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const { clearResults } = useColumnResult();

  // Generador ponderado para elegir ítems
  const getWeightedRandomIcon = () => {
    const weightedIcons = ICONS.flatMap((icon) => {
      if (icon.name === PRIZE_CONDITIONS_ENUM.BIG_WIN) return Array(4).fill(icon); // Menor peso
      else if(icon.name === PRIZE_CONDITIONS_ENUM.SPECIAL_WIN) return Array(7).fill(icon) // menor peso
      return Array(10).fill(icon); // Mayor peso para frutas
    });
    return weightedIcons[Math.floor(Math.random() * weightedIcons.length)];
  };

  const handleSpin = () => {
    clearResults();
    setIsSpinning(true);
  
    const normalWinProbability = 0.3; // 30% de probabilidad de ganar
  
    columns.forEach((_, index) => {
      setTimeout(() => {
        setColumns((prev) =>
          prev.map((col, i) =>
            i === index ? { ...col, isSpinning: true } : col
          )
        );
      }, index * 300);
  
      const stopDelay = BASE_SPINNING_DURATION + index * COLUMN_SPINNING_DURATION;
      setTimeout(() => {
        setColumns((prev) =>
          prev.map((col, i) => {
            if (i === index) {
              // Determinar si este giro es ganador o no
              const randomProbability = Math.random()
              const isWin = randomProbability < normalWinProbability;

              console.log(prev[0]?.items.slice(0, 3))
              // Generar resultados base
              const baseResults = isWin
                ? prev[0]?.items.slice(0, 3) || [getWeightedRandomIcon(), getWeightedRandomIcon(), getWeightedRandomIcon()]
                : [getWeightedRandomIcon(), getWeightedRandomIcon(), getWeightedRandomIcon()];
  
              // Si no es la primera columna y es un giro perdedor, variar los resultados
              if (!isWin && i > 0) {
                baseResults[0] = getWeightedRandomIcon(); // Cambiar el primer ítem
              }
  
              // Actualizar los ítems de la columna
              const updatedItems = [
                ...baseResults,
                ...col.items.slice(3, col.items.length - 3),
                ...baseResults,
              ];
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
  

  useEffect(() => {
    const initializeColumns = () => {
      const baseItemAmount = 50;

      const newColumns: IColumn[] = Array(COLUMNS_NUM).fill(null).map((_, i) => {
        const amount = baseItemAmount + (i * 20);

        // Generar ítems con mayor probabilidad para frutas
        const randomItems = Array.from({ length: amount }, getWeightedRandomIcon);

        const shuffledItems = randomItems.sort(() => Math.random() - 0.5);

        return {
          items: shuffledItems,
          isSpinning: false,
          duration: BASE_SPINNING_DURATION + i * COLUMN_SPINNING_DURATION,
        };
      });
      setColumns(newColumns);
      console.log('big',newColumns.map(el => el.items.filter(l => l.name === PRIZE_CONDITIONS_ENUM.BIG_WIN)))
      console.log('special',newColumns.map(el => el.items.filter(l => l.name === PRIZE_CONDITIONS_ENUM.SPECIAL_WIN)))
};


    initializeColumns();
  }, []);

  return {
    columns,
    handleSpin,
    isSpinning,
  };
};
