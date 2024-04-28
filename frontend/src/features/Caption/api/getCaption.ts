export const getCaption = (captionId: string) => {
  return fetch(`http://localhost:8000/caption?video_id=${captionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
