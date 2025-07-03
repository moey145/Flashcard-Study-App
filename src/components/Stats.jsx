import "../styles/Stats.css";

function Stats({ totalCards }) {
  return (
    <div className="stats">
      <p>
        Total Cards: <strong>{totalCards}</strong>
      </p>
    </div>
  );
}

export default Stats;
