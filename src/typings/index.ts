export interface VideoData {
  version: string,
  updateDatetime: string,
  data: Video[],
}

export interface Video {
  id: string,
  updateTimestamp: number,
  name: string,
  type: VideoType
  subtitle: string,
  tags: string[],
  epCount: number,
  img: string,
  eps: EP[],
}

export enum VideoType {
  'TV',
  'MOVIE',
}

export interface EP {
  title: string,
  type: EPType,
  url: string,
}

export enum EPType {
  'parse',
  'm3u8',
}
