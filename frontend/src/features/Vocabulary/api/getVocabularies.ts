export const getVocabularies = () => {
    return fetch(`http://localhost:8000/vocabularies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };