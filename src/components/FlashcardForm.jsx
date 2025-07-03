import "../styles/FlashcardForm.css";

function FlashcardForm({ formData, setFormData, onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="card-form">
      <h3>Create New Flashcard</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            placeholder="Enter your question here..."
            rows="3"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer:</label>
          <textarea
            id="answer"
            value={formData.answer}
            onChange={(e) =>
              setFormData({ ...formData, answer: e.target.value })
            }
            placeholder="Enter the answer here..."
            rows="3"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-btn">
            Save Card
          </button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default FlashcardForm;
