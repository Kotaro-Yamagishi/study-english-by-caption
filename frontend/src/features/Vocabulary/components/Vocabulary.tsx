import { Grid } from "@mui/material";
import VocabularyList from "./VocabularyList";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { WordMeaning } from "./WordMeaning";
import "../vocabulary.css";

export const ChosenWordContext = createContext(
  {} as {
    chosenWord: string;
    setChosenWord: Dispatch<SetStateAction<string>>;
  }
);

const Vocabulary = () => {
  const [chosenWord, setChosenWord] = useState("");

  const value = {
    chosenWord,
    setChosenWord,
  };

  return (
    <ChosenWordContext.Provider value={value}>
      <Grid container spacing={2}  marginTop="10px">
        <Grid item xs={8} className="vocabulary-list-body">
          <VocabularyList/>
        </Grid>
        <Grid item xs={4} className="word-meaning-body">
          <WordMeaning />
        </Grid>
      </Grid>
    </ChosenWordContext.Provider>
  );
};

export default Vocabulary;
