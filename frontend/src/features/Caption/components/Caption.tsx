import { Grid } from "@mui/material";
import { CaptionContent } from "./CaptionContent";
import {  createContext, Dispatch, SetStateAction, useState } from "react";
import { WordMeaning } from "./WordMeaning";

export const SearchWordContext=createContext({} as {
  searchWord:string
  setSearchWord:Dispatch<SetStateAction<string>>
});

const Caption = () => {

  const [searchWord,setSearchWord]=useState('')

  const value={
    searchWord,
    setSearchWord
  }

  return (
    <SearchWordContext.Provider value={value}>
    <Grid container spacing={2} marginTop="10px">
      <Grid item xs={8} className="caption-content-body">
        <CaptionContent />
      </Grid>
      <Grid item xs={4} className="word-meaning-body">
        <WordMeaning/>
      </Grid>
    </Grid>
    </SearchWordContext.Provider>
  );
};

export default Caption;
