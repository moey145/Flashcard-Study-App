import { useState } from "react";
import { useFlashcards } from "./hooks/useFlashcards";
import Header from "./components/Header";
import FlashcardForm from "./components/FlashcardForm";
import FlashcardGrid from "./components/FlashcardGrid";
import StudyMode from "./components/StudyMode";
import Stats from "./components/Stats";
import "./App.css";

function App() {
  const { flashcards, addFlashcard, deleteFlashcard } = useFlashcards();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [studiedCards, setStudiedCards] = useState(new Set());
  const [timeLimit, setTimeLimit] = useState(15); // Default 15 minutes
  const [showTimeSettings, setShowTimeSettings] = useState(false);

  const handleAddFlashcard = () => {
    if (formData.question.trim() && formData.answer.trim()) {
      addFlashcard(formData.question, formData.answer);
      setFormData({ question: "", answer: "" });
      setShowForm(false);
    }
  };

  const handleDeleteFlashcard = (id) => {
    deleteFlashcard(id);
    if (currentCardIndex >= flashcards.length - 1) {
      setCurrentCardIndex(Math.max(0, flashcards.length - 2));
    }
  };

  const startStudyMode = () => {
    if (flashcards.length > 0) {
      setStudyMode(true);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setStudiedCards(new Set());
      setShowTimeSettings(false);
    }
  };

  const exitStudyMode = () => {
    setStudyMode(false);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  if (studyMode) {
    return (
      <StudyMode
        flashcards={flashcards}
        onExit={exitStudyMode}
        currentCardIndex={currentCardIndex}
        setCurrentCardIndex={setCurrentCardIndex}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        studiedCards={studiedCards}
        setStudiedCards={setStudiedCards}
        timeLimit={timeLimit}
      />
    );
  }

  return (
    <div className="app">
      <Header />

      <div className="main-actions">
        <button onClick={() => setShowForm(!showForm)} className="primary-btn">
          {showForm ? "Cancel" : "+ Add New Card"}
        </button>

        {flashcards.length > 0 && (
          <>
            <button
              onClick={() => setShowTimeSettings(!showTimeSettings)}
              className="settings-btn"
            >
              ⚙️ Time Settings
            </button>
            <button onClick={startStudyMode} className="study-btn">
              📖 Start Studying ({flashcards.length} cards)
            </button>
          </>
        )}
      </div>

      {showTimeSettings && (
        <div className="time-settings">
          <h3>Study Session Time Limit</h3>
          <div className="time-options">
            {[5, 10, 15, 20, 30, 45, 60].map((minutes) => (
              <button
                key={minutes}
                onClick={() => setTimeLimit(minutes)}
                className={`time-option ${
                  timeLimit === minutes ? "selected" : ""
                }`}
              >
                {minutes} min
              </button>
            ))}
          </div>
          <div className="custom-time">
            <label htmlFor="customTime">Custom time (minutes):</label>
            <input
              id="customTime"
              type="number"
              min="1"
              max="180"
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value) || 15)}
              className="custom-time-input"
            />
          </div>
        </div>
      )}

      {showForm && (
        <FlashcardForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleAddFlashcard}
          onCancel={() => setShowForm(false)}
        />
      )}

      <FlashcardGrid flashcards={flashcards} onDelete={handleDeleteFlashcard} />

      {flashcards.length > 0 && <Stats totalCards={flashcards.length} />}
    </div>
  );
}

export default App;
