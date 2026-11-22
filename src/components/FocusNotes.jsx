import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const notes = [
  {
    label: "01 / FOCUS",
    title: "Make space for deep work.",
    description:
      "Choose one important task, remove distractions, and give it your full attention.",
  },
  {
    label: "02 / PROGRESS",
    title: "Small steps still move you forward.",
    description:
      "Break a big goal into manageable actions. Consistency matters more than perfection.",
  },
  {
    label: "03 / BALANCE",
    title: "Rest is part of being productive.",
    description:
      "Take a short break between focused sessions so you can return with fresh energy.",
  },
];

function FocusNotes() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeNote = notes[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? notes.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === notes.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section
      className="focus-notes-panel"
      id="focus-notes"
      aria-label="Focus notes carousel"
    >
      <div className="focus-note-symbol">
        <Lightbulb size={22} />
      </div>

      <div className="focus-note-copy" aria-live="polite">
        <p className="eyebrow">{activeNote.label}</p>

        <h2>{activeNote.title}</h2>

        <p>{activeNote.description}</p>
      </div>

      <div className="carousel-controls">
        <div className="carousel-dots" aria-label="Choose a focus note">
          {notes.map((note, index) => (
            <button
              key={note.label}
              type="button"
              className={`carousel-dot ${
                activeIndex === index ? "selected" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show focus note ${index + 1}`}
              aria-current={
                activeIndex === index ? "true" : undefined
              }
            />
          ))}
        </div>

        <div className="carousel-arrows">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous focus note"
          >
            <ArrowLeft size={17} />
          </button>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next focus note"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FocusNotes;