import "../styles/StudyHeader.css";

function StudyHeader({ currentCardIndex, totalCards, studiedCount, onExit }) {
  return (
    <div className="study-header">
      <h1>📚 Study Session</h1>
      <div className="progress-info">
        <span>
          Card {currentCardIndex + 1} of {totalCards}
        </span>
        <span>
          Studied: {studiedCount}/{totalCards}
        </span>
      </div>
      <button onClick={onExit} className="exit-btn">
        Exit Study
      </button>
    </div>
  );
}

export default StudyHeader;
