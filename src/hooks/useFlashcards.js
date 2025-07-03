import { useState, useEffect } from "react";

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState([]);

  // Load flashcards from localStorage on component mount
  useEffect(() => {
    const savedCards = localStorage.getItem("flashcards");
    if (savedCards) {
      setFlashcards(JSON.parse(savedCards));
    }
  }, []);

  // Save flashcards to localStorage whenever flashcards change
  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  const addFlashcard = (question, answer) => {
    const newCard = {
      id: Date.now(),
      question: question.trim(),
      answer: answer.trim(),
      createdAt: new Date().toISOString(),
    };
    setFlashcards([...flashcards, newCard]);
  };

  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  return {
    flashcards,
    addFlashcard,
    deleteFlashcard,
  };
}
