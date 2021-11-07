const Video = ({ video }) => {
  return (
    <div className="bg-black w-full xl:px-16 h-screen mx-auto flex justify-center items-center">
      <div className={"w-full relative pb-[56.25%]"}>
        <iframe
          src={`https://www.youtube.com/embed/${video}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          className={"absolute top-0 left-0 w-full h-full"}
        />
      </div>
    </div>
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
