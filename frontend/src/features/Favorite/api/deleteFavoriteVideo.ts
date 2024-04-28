export const deleteFavoriteVideo = (favoriteId: number) => {
    return fetch(`http://localhost:8000/favorites/${favoriteId}`, {
      method: "DELETE",
      headers: {
        "accept": "application/json"
      },
    });
  };