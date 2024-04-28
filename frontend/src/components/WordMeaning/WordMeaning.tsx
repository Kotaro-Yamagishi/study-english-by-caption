import { Context, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Button, Chip, Grid, Typography } from "@mui/material";

import "../caption.css";
import camelcaseKeys from "camelcase-keys";
import { Dictionary } from "../../features/Caption/types";
import { getMeaning } from "../../features/Caption/api/getMeaning";
import { VocabularyCreate } from "../../features/Vocabulary/types";
import { addVocabulary } from "../../features/Vocabulary/api/addVocabulary";

export const WordMeaning = (context:Context<{
  searchWord:string
  setSearchWord:Dispatch<SetStateAction<string>>
}>) => {
  const [dictionary, setDictionary] = useState<Dictionary>();
  const { searchWord } = useContext(context);

  useEffect(() => {
    // todo: 404が帰ってきた時のエラーハンドリング
    getMeaning(searchWord)
      .then((res) => res.json())
      .then((data) => {
        const camelCaseData = camelcaseKeys(data, { deep: true });
        setDictionary(camelCaseData);
      });
  }, [searchWord]);

  const add = (word: string) => {
    const request = {
      word: word,
    } as VocabularyCreate;
    addVocabulary(request);
  };

  // todo:dictionaryのレスポンスが404の場合と取得中の場合（Loading）の両方のパターンの画面を用意する
  return (
    <div>
      {dictionary?.word ? (
        <div>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" component="div">
                {dictionary?.word}
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={() => add(dictionary?.word!)}>Add</Button>
            </Grid>
          </Grid>
          <div>
            <Typography variant="h6" component="div">
              Definition
            </Typography>
            {dictionary?.meanings?.map((meaning, i) => {
              return (
                <div key={i}>
                  <Typography component="div">
                    {meaning.partOfSpeech}
                  </Typography>
                  <div>
                    <ol>
                      {meaning.definitions.map((definition, j) => {
                        return (
                          <li key={j}>
                            <Typography component="div">
                              {definition.definition}
                            </Typography>
                            {definition.example && (
                              <Typography component="div">
                                e.g. {definition.example}
                              </Typography>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                    <Typography component="div">Synonyms</Typography>
                    {meaning.synonyms.map((synonym, k) => {
                      return <Chip key={k} label={synonym}></Chip>;
                    })}
                    <Typography component="div">Antonyms</Typography>
                    {meaning.antonyms.map((antonym, k) => {
                      return <Chip key={k} label={antonym}></Chip>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          Please select word that you want to search
        </div>
      )}
    </div>
  );
};
