export const getFavoriteVideoList = () => {
  return fetch(`http://localhost:8000/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
