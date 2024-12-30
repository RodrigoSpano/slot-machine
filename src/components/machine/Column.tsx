import React, { useRef, useEffect } from 'react';
import './Column.css';

function Column({ items, isSpinning, duration }) {
  const colRef = useRef(null);

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

  // Duplicar los íconos para una animación continua
  const duplicatedItems = [...items, ...items];

  return (
    <div className="outer-col">
      <div
        ref={colRef}
        className={`col ${isSpinning ? 'spinning' : ''}`}
      >
        {duplicatedItems.map((icon, idx) => (
          <div key={idx} className="icon" data-item={icon}>
            <img src={`items/${icon}.png`} alt={icon} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
