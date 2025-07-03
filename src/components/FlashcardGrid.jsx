import FlashcardPreview from "./FlashcardPreview";
import "../styles/FlashcardGrid.css";

function FlashcardGrid({ flashcards, onDelete }) {
  if (flashcards.length === 0) {
    return (
      <div className="empty-state">
        <h3>No flashcards yet!</h3>
        <p>Create your first flashcard to get started with studying.</p>
      </div>
    );
  }

  return (
    <div className="flashcards-grid">
      {flashcards.map((card) => (
        <FlashcardPreview key={card.id} card={card} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default FlashcardGrid;
