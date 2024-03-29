import { useState, useEffect, useRef } from "react";
import { FiSettings } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import useSettings from "../components/SettingsContext";
import SettingsModal from "../components/SettingsModal";
import remarkBreaks from "remark-breaks";

const Video = ({ video }) => {
  const [notesHidden, setNotesHidden] = useState(false);
  const [notes, setNotes] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { color, opacity } = useSettings();
  const notesRef = useRef(null);
  const buttonRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setNotesHidden(true);
    }
  };
  const stickySetNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem(video, newNotes);
  };
  useEffect(() => {
    if (!notesHidden) {
      notesRef.current.focus();
    }
  }, [notesHidden]);
  useEffect(() => {
    const savedNotes = localStorage.getItem(video);
    if (savedNotes) {
      setNotes(savedNotes);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  return (
    <main>
      <div className="bg-black w-full pl-6 pr-28 h-screen mx-auto flex justify-center items-center">
        <div className={"w-full relative pb-[56.25%]"}>
          <iframe
            src={`https://www.youtube.com/embed/${video}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            className={"absolute top-0 left-0 w-full h-full"}
          />
        </div>
      </div>
      <div
        className={`${
          notesHidden ? "hidden" : ""
        } absolute pointer-events-none inset-0 w-full h-full ${color}`}
        style={{ opacity: `${opacity}%` }}
      />
      {!notesHidden && (
        <button
          onClick={() => setPreviewMode((p) => !p)}
          className="z-20 px-2 py-1 rounded-md bg-white absolute left-4 bottom-6"
        >
          {previewMode ? "Edit" : "Preview"}
        </button>
      )}
      <div
        className={`${
          notesHidden ? "hidden" : ""
        } w-full absolute inset-0 py-12 printable`}
      >
        <textarea
          placeholder={`→ Start typing your notes (markdown is supported)\nPress escape to close the notes overlay.`}
          className={`${
            previewMode ? "hidden" : "block"
          } z-10 focus:outline-none bg-transparent mx-auto w-full max-w-prose min-h-full my-12 placeholder-gray-700 text-2xl`}
          value={notes}
          onChange={(e) => stickySetNotes(e.target.value)}
          ref={notesRef}
        />

        <div
          className={`${
            previewMode ? "" : "hidden"
          } mx-auto w-full markdown printable max-w-prose text-2xl my-12`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkBreaks]}
            className="break-words prose prose-blue"
          >
            {notes}
          </ReactMarkdown>
        </div>
      </div>

      <div className="bg-primary blur-md absolute bottom-20 right-4 p-1.5 rounded-full">
        <div className="w-6 h-6" />
      </div>
      <div className="bg-primary blur-md absolute bottom-20 right-4 p-1.5 rounded-full">
        <div className="w-6 h-6" />
      </div>
      <button
        onClick={() => setSettingsOpen((x) => !x)}
        className="bg-white absolute bottom-20 right-4 p-1.5 rounded-full"
      >
        <FiSettings className="w-6 h-6" />
      </button>
      <div
        aria-hidden="true"
        className="select-none absolute bottom-6 right-4 bg-gradient-to-r from-primary to-secondary blur-md px-4 py-1 text-xl rounded"
      >
        Notes
      </div>
      <div
        aria-hidden="true"
        className="select-none absolute bottom-6 right-4 bg-gradient-to-r from-primary to-secondary blur-md px-4 py-1 text-xl rounded"
      >
        Notes
      </div>
      <button
        ref={buttonRef}
        className="absolute bottom-6 right-4 bg-white px-3 py-0.5 text-xl rounded"
        onClick={async () => {
          if (notesHidden) {
            setNotesHidden(false);
          } else {
            setNotesHidden(true);
          }
        }}
      >
        Notes
      </button>
      <SettingsModal isOpen={settingsOpen} setIsOpen={setSettingsOpen} />
    </main>
  );
};

export default Video;

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      video: params.video,
    },
  };
};
