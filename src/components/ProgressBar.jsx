import "../styles/ProgressBar.css";

function ProgressBar({ current, total }) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
    </div>
  );
}

export default ProgressBar;
