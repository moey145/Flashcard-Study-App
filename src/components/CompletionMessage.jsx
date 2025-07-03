import "../styles/CompletionMessage.css";

function CompletionMessage({ onReset }) {
  return (
    <div className="completion-message">
      🎉 Great job! You've studied all cards!
      <div>
        <button onClick={onReset} className="reset-btn">
          Study Again
        </button>
      </div>
    </div>
  );
}

export default CompletionMessage;
