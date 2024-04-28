export const deleteVocabulary = (vocabulary_id: number) => {
    return fetch(`http://localhost:8000/vocabularies/${vocabulary_id}`, {
      method: "DELETE",
      headers: {
        "accept": "application/json"
      },
    });
  };