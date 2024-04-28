export type FavoriteCreate = {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnailLink: string;
};

export type FavoriteVideo = {
  id: number;
  title: string;
  channelTitle: string;
  videoId: string;
  thumbnailLink: string;
};
