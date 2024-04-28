export const getChannelInformation = (videoId: string) => {
  return fetch(`http://localhost:8000/channel?video_id=${videoId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
