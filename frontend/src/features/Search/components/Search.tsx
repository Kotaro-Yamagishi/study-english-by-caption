import { Box, Button, Input } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

export const Search = () => {
  const [videoId, serVideoId] = useState("");
  const navigate = useNavigate();

  const searchVideo = () => {
    navigate(`/caption/${videoId}`, { state: { videoId: videoId } });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          mt: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Input
          value={videoId}
          onChange={(e) => serVideoId(e.target.value)}
          placeholder="enter video_id"
        ></Input>
        <Button onClick={() => searchVideo()}><SearchIcon/></Button>
      </Box>
    </Box>
  );
};
