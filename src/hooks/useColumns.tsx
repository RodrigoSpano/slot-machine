import { useEffect, useRef } from 'react'
import type { TUseColumnsProps } from '@/types';
import { useColumnResult } from '../stores/useResultStore';


export const useColumns = ({duration,isSpinning,items}: TUseColumnsProps) => {
    const colRef = useRef<HTMLDivElement>(null);
    // column results from zustand =>
    const {result: resultState, appendResults} = useColumnResult()

  useEffect(() => {
    if (!isSpinning) {
      // Ajustar la posición final para alinear los resultados
      const adjustPosition = () => {
        const column = colRef.current;
        if (column) {
          const offset = column.scrollHeight / items.length; // Altura de un ítem
          const translateY = Math.round(column.scrollTop / offset) * offset; // Ajustar al ítem más cercano
          column.style.transform = `translateY(-${translateY}px)`;
          column.style.animation = 'none'; // Detener animación
        }
      };

      // Detenemos la animación y alineamos
      adjustPosition();
    } else {
      // Reiniciar la animación cuando comienza a girar
      const column = colRef.current;
      if (column) {
        column.style.transform = 'none'; // Quitar el ajuste
        column.style.animation = `spin ${duration}s linear infinite`;
      }
    }
  }, [isSpinning, duration, items.length]);

  useEffect(()=>{
    if(!isSpinning){
      const column_result = colRef.current?.children[1].getAttribute("data-item")
      if(resultState?.length >= 3) return
      if(!column_result) return
      appendResults(column_result)
    }
  },[isSpinning])

  // Duplicar los íconos para una animación continua
  const duplicatedItems = [...items, ...items];

  return {
    colRef,
    duplicatedItems,
  }
}

