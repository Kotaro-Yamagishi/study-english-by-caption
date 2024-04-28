import { useContext, useEffect, useState } from "react";
import { getMeaning } from "../api/getMeaning";
import { Dictionary } from "../types";
import { Button, Chip, Grid, Typography } from "@mui/material";

import "../caption.css";
import { SearchWordContext } from "./Caption";
import camelcaseKeys from "camelcase-keys";
import { VocabularyCreate } from "../../Vocabulary/types/index";
import { addVocabulary } from "../../Vocabulary/api/addVocabulary";

export const WordMeaning = () => {
  const [dictionary, setDictionary] = useState<Dictionary>();
  const { searchWord } = useContext(SearchWordContext);

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
