
function Column({ items, isSpinning, index }) {
  const duration = 2.7 + index * 0.3; // Custom duration for each column

  return (
    <div
      className={`outer-col ${isSpinning ? 'spinning' : ''}`}
      style={{ animationDuration: `${duration}s` }}
    >
      <div className="col">
        {items.map((icon, idx) => (
          <div key={idx} className="icon" data-item={icon}>
            <img src={`/items/${icon}.png`} alt={icon} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
