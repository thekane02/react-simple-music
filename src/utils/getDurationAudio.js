export default function getDurationAudio(url) {
  const audio = new Audio(url);
  let duration;
  audio.addEventListener("loadedmetadata", () => {
    duration = audio.duration;
  });
  return duration;
}
