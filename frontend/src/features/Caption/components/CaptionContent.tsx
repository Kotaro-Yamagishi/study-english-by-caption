import { useContext, useEffect, useState } from "react";
import { getCaption } from "../api/getCaption";
import { Caption, channelInfo } from "../types";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from "@mui/material";

import "../caption.css";
import { SearchButton } from "../../../components/Element/SearchButton/SearchButton";
import { SearchWordContext } from "./Caption";
import { getChannelInformation } from "../api/getChannelInformation";
import camelcaseKeys from "camelcase-keys";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addFavoriteVideo } from "../../Favorite/api/addFavoriteVideo";
import { FavoriteCreate } from "../../Favorite/types/index";

export const CaptionContent = () => {
  let { videoId } = useParams();

  const [channelInfo, setChannelInfo] = useState<channelInfo>();
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string | undefined>(
    window.getSelection()?.toString()
  );
  const { setSearchWord } = useContext(SearchWordContext);

  const search = () => {
    setSearchWord(selectedWord!);
  };

  // この段階ではビデオのIDがDB上に登録されていないため、DB設計ごと何にfavotableに紐づけるかを考え直す
  const addFavorite = async () => {
    const request = {
      videoId: channelInfo?.videoId,
      title: channelInfo?.title,
      channelTitle: channelInfo?.channelTitle,
      thumbnailLink: channelInfo?.thumbnailLink,
    } as FavoriteCreate;
    addFavoriteVideo(request);
  };

  const checkSelectedWord = () => {
    const selected = window.getSelection()?.toString();
    if (selected) {
      setSelectedWord(selected);
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };

  useEffect(() => {
    if(videoId){
      getChannelInformation(videoId)
      .then((res) => res.json())
      .then((data) => {
        const camelCaseData = camelcaseKeys(data, { deep: true });
        setChannelInfo(camelCaseData);
      });

    getCaption(videoId)
      .then((res) => res.json())
      .then((data) => setCaptions(data));
    }
  }, []);

  // todo: 時間のところ秒から分に直したい

  return (
    <div onClick={checkSelectedWord}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
        >
          <Typography>Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <img alt="thumbnail" src={channelInfo?.thumbnailLink} />
            </Grid>
            <Grid item>
              <Typography>{channelInfo?.title}</Typography>
            </Grid>
            <Grid item>
              <Button onClick={()=>addFavorite()}>
                <FavoriteIcon/>
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Caption</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {captions.map((caption, i) => {
              return (
                <Grid
                  key={i}
                  container
                  spacing={2}
                  className="caption-content-content"
                >
                  <Grid item xs={1}>
                    {caption.start}
                  </Grid>
                  <Grid item xs={11}>
                    {caption.text}
                  </Grid>
                </Grid>
              );
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <div className="caption-content-search-button">
        <SearchButton
          search={search}
          isSelectedWord={isSelected}
        ></SearchButton>
      </div>
    </div>
  );
};
