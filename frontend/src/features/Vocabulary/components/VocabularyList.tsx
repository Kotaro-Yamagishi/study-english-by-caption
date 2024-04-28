import { useContext, useEffect, useState } from "react";
import { Vocabulary } from "../types";
import { getVocabularies } from "../api/getVocabularies";
import camelcaseKeys from "camelcase-keys";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChosenWordContext } from "./Vocabulary";
import { deleteVocabulary } from "../api/deleteVocabulary";

const VocabularyList = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);

  const { setChosenWord } = useContext(ChosenWordContext);

  useEffect(() => {
    refreshVocabulary();
  }, []);

  const chooseWord = (word: string) => {
    setChosenWord(word);
  };

  const refreshVocabulary = () => {
    getVocabularies()
      .then((res) => res.json())
      .then((data) => {
        const camelCaseData = camelcaseKeys(data, { deep: true });
        setVocabularies(camelCaseData);
      });
  };

  const deleteVoca = (vocabulary_id: number) => {
    deleteVocabulary(vocabulary_id).then(() => refreshVocabulary());
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <List
        sx={{
          width: "100%",
          maxWidth: 460,
        }}
      >
        {vocabularies.map((v) => (
          <ListItem
            key={v.id}
            disableGutters
            secondaryAction={
              <IconButton aria-label="delete" onClick={() => deleteVoca(v.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => chooseWord(v.word)}>
              <ListItemText primary={`${v.word}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default VocabularyList;
