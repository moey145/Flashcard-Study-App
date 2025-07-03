import "../styles/StudyControls.css";

function StudyControls({
  onPrevious,
  onNext,
  onFlip,
  isFlipped,
  canGoPrevious,
  canGoNext,
}) {
  return (
    <div className="study-controls">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="nav-btn"
      >
        ← Previous
      </button>
      <button onClick={onFlip} className="flip-btn">
        {isFlipped ? "Show Question" : "Show Answer"}
      </button>
      <button onClick={onNext} disabled={!canGoNext} className="nav-btn">
        Next →
      </button>
    </div>
  );
}

export default StudyControls;
