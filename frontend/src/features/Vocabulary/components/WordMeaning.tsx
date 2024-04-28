import { useContext, useEffect, useState } from "react";
import {  Chip,  Typography } from "@mui/material";

import camelcaseKeys from "camelcase-keys";
import { Dictionary } from "../../Caption/types";
import { getMeaning } from "../../Caption/api/getMeaning";
import { ChosenWordContext } from "./Vocabulary";

export const WordMeaning = () => {
  const [dictionary, setDictionary] = useState<Dictionary>();
  const { chosenWord } = useContext(ChosenWordContext);

  useEffect(() => {
    // todo: 404が帰ってきた時のエラーハンドリング
    getMeaning(chosenWord)
      .then((res) => res.json())
      .then((data) => {
        const camelCaseData = camelcaseKeys(data, { deep: true });
        setDictionary(camelCaseData);
      });
  }, [chosenWord]);

  // todo:dictionaryのレスポンスが404の場合と取得中の場合（Loading）の両方のパターンの画面を用意する
  return (
    <div>
      {dictionary?.word ? (
        <div>
          <Typography variant="h4" component="div">
            {dictionary?.word}
          </Typography>
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
        <div>Please select word that you want to search</div>
      )}
    </div>
  );
};
