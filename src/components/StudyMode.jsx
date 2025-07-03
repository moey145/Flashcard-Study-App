import { useState } from "react";
import StudyHeader from "./StudyHeader";
import Flashcard from "./Flashcard";
import StudyControls from "./StudyControls";
import ProgressBar from "./ProgressBar";
import CompletionMessage from "./CompletionMessage";
import Timer from "./Timer";
import "../styles/StudyMode.css";

function StudyMode({
  flashcards,
  onExit,
  currentCardIndex,
  setCurrentCardIndex,
  isFlipped,
  setIsFlipped,
  studiedCards,
  setStudiedCards,
  timeLimit,
}) {
  const [timerActive, setTimerActive] = useState(true);
  const [timerReset, setTimerReset] = useState(false);

  const handleTimeUp = () => {
    setTimerActive(false);
    alert("Time's up! Study session completed.");
    onExit();
  };

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setStudiedCards(new Set([...studiedCards, currentCardIndex]));
    }
  };

  const resetProgress = () => {
    setStudiedCards(new Set());
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setTimerReset(true);
    setTimerActive(true);
    setTimeout(() => setTimerReset(false), 100);
  };

  if (flashcards.length === 0) {
    return (
      <div className="app study-mode">
        <StudyHeader
          currentCardIndex={0}
          totalCards={0}
          studiedCount={0}
          onExit={onExit}
        />
        <div className="empty-state">
          <p>No flashcards to study yet!</p>
          <button onClick={onExit}>Go back to add some cards</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app study-mode">
      <StudyHeader
        currentCardIndex={currentCardIndex}
        totalCards={flashcards.length}
        studiedCount={studiedCards.size}
        onExit={onExit}
      />

      <div className="timer-container">
        <Timer
          timeLimit={timeLimit}
          onTimeUp={handleTimeUp}
          isActive={timerActive}
          onReset={timerReset}
        />
      </div>

      <div className="study-container">
        <Flashcard
          card={flashcards[currentCardIndex]}
          isFlipped={isFlipped}
          onFlip={flipCard}
        />

        <StudyControls
          onPrevious={prevCard}
          onNext={nextCard}
          onFlip={flipCard}
          isFlipped={isFlipped}
          canGoPrevious={currentCardIndex > 0}
          canGoNext={currentCardIndex < flashcards.length - 1}
        />

        <ProgressBar current={studiedCards.size} total={flashcards.length} />

        {studiedCards.size === flashcards.length && (
          <CompletionMessage onReset={resetProgress} />
        )}
      </div>
    </div>
  );
}

export default StudyMode;
