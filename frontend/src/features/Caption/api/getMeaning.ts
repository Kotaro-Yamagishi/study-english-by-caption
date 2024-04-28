export const getMeaning = (word: string) => {
    return fetch(`http://localhost:8000/dictionary/${word}`,{method:"GET"})
};
