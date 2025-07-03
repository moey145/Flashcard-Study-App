import "../styles/Flashcard.css";

function Flashcard({ card, isFlipped, onFlip }) {
  return (
    <div
      className={`flashcard ${isFlipped ? "flipped" : ""}`}
      onClick={onFlip}
      onKeyDown={(e) => e.key === "Enter" && onFlip()}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? "Show question" : "Show answer"}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <h3>Question</h3>
          <p>{card.question}</p>
          <div className="flip-hint">Click to reveal answer</div>
        </div>
        <div className="flashcard-back">
          <h3>Answer</h3>
          <p>{card.answer}</p>
          <div className="flip-hint">Click to see question</div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
