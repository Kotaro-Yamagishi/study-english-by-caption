import snakecaseKeys from "snakecase-keys";
import { FavoriteCreate } from "../types";

export const addFavoriteVideo = (favorite: FavoriteCreate) => {
    return fetch(`http://localhost:8000/favorites`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snakecaseKeys(favorite))
    });
  };
  