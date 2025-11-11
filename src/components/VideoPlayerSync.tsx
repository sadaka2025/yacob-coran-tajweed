export default function VideoPlayerSync({ surah, ayah, annotations }) {
  return (
    <video controls width="100%" src={`/video/${surah}/${ayah}.mp4`}></video>
  );
}
