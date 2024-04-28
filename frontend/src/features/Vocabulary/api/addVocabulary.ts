import { VocabularyCreate } from "../types/index";

export const addVocabulary = (vocabulary: VocabularyCreate) => {
  return fetch(`http://localhost:8000/vocabularies`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vocabulary),
  });
};
