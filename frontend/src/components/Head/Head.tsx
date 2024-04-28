import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

const setNavLinks: Array<{ text: string; url: string }> = [
  { text: "Dictionary", url: "/dictionary" },
  { text: "Favorite", url: "/favorite" },
  { text: "Search", url: "/search" },
];

export const Head = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Study English by Caption
          </Typography>
          <Button color="inherit" href="/vocabulary">
            Vocabulary
          </Button>
          <Button color="inherit" href="/favorite">
            Favorite
          </Button>
          <Button color="inherit" href="/search">
            Search
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
