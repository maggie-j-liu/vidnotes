import { useRouter } from "next/router";
import { useState } from "react";

const getVideoId = (videoLink) => {
  const url = new URL(videoLink);
  return url.searchParams.get("v");
};

const VideoLink = () => {
  const [link, setLink] = useState("");
  const router = useRouter();
  const regex = /https:\/\/(www\.)?youtube\.com\/watch\?v=.+/;
  return (
    <div className="bg-black text-white absolute inset-0">
      <div className="flex flex-col gap-6 items-center justify-center h-full">
        <h1 className="text-3xl font-semibold">VidNotes</h1>
        <div className="relative h-9 w-96">
          <div className="absolute inset-y-0 -inset-x-2 bg-secondary blur-md" />
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="invalid:text-red-300 absolute inset-0 w-full bg-gray-900 px-4 rounded-md focus:outline-none"
            type="url"
            placeholder="https://www.youtube.com/watch"
            pattern="https:\/\/(www\.)?youtube\.com\/watch\?v=.+"
          />
        </div>
        <button
          onClick={() => router.push(`/${getVideoId(link)}`)}
          className="disabled:text-gray-500 disabled:cursor-not-allowed underline disabled:no-underline"
          disabled={!link.match(regex)}
        >
          Go &rarr;
        </button>
      </div>
    </div>
  );
};
export default VideoLink;
