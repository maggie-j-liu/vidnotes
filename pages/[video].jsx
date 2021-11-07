import { useState, useEffect, useRef } from "react";

const Video = ({ video }) => {
  const [notesHidden, setNotesHidden] = useState(true);
  const [notes, setNotes] = useState("");
  const notesRef = useRef(null);
  const buttonRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setNotesHidden(true);
    }
  };
  useEffect(() => {
    if (!notesHidden) {
      notesRef.current.focus();
    }
  }, [notesHidden]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  return (
    <main>
      <div className="bg-black w-full px-24 h-screen mx-auto flex justify-center items-center">
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
          notesHidden ? "invisible" : ""
        } bg-white/50 w-full absolute inset-0 py-12`}
      >
        <textarea
          placeholder="> Start typing..."
          className="focus:outline-none bg-transparent mx-auto w-full max-w-prose block min-h-full my-12 placeholder-gray-700 text-2xl"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          ref={notesRef}
        />
      </div>
      <div className="relative">
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
      </div>
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
