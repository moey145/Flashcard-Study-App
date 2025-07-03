import "../styles/FlashcardPreview.css";

function FlashcardPreview({ card, onDelete }) {
  return (
    <div className="flashcard-preview">
      <div className="card-content">
        <div className="question-preview">
          <strong>Q:</strong> {card.question}
        </div>
        <div className="answer-preview">
          <strong>A:</strong> {card.answer}
        </div>
      </div>
      <button
        onClick={() => onDelete(card.id)}
        className="delete-btn"
        title="Delete this card"
      >
        🗑️
      </button>
    </div>
  );
}

export default FlashcardPreview;
