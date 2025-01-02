import Column from './Column';
import './SlotMachine.css';
import { useSlotMachine } from '../../hooks/useSlotMachine';

function SlotMachine() {
 const {columns,handleSpin, isSpinning} = useSlotMachine()

  return (
    <div className='slot-container' onClick={() => !isSpinning && handleSpin()}>
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
      </div>
    </div>
  );
}



export default SlotMachine;
