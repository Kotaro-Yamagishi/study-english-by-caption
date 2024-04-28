import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import "./SearchButton.css";

export const SearchButton = ({
  search,
  isSelectedWord,
}: {
  search: () => void;
  isSelectedWord: boolean;
}) => {
  return (
    <Button
      variant="contained"
      color="warning"
      endIcon={<SearchIcon />}
      onClick={search}
      disabled={!isSelectedWord}
    >
      Search
    </Button>
  );
};
