import { useState } from "react";
import VideoLink from "../components/VideoLink";

export default function Home() {
  const [link, setLink] = useState("")
  return (
    <div>
      <VideoLink link={link} setLink={setLink} />
    </div>
  )
}
