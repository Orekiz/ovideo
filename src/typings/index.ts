export interface VideoData {
  version: string,
  updateDatetime: string,
  data: Video[],
}

export interface Video {
  id: string,
  updateTimestamp: number,
  alert: string,
  type: VideoType,
  name: string,
  subtitle: string,
  area: VideoArea,
  year: string,
  tags: string[],
  epCount: number,
  img: string,
  eps: EP[],
}

export enum VideoType {
  'EP',
  'MOVIE',
}

export enum VideoArea {
  '内地',
  "韩国",
  "中国台湾",
  "中国香港",
  "日本",
  "美国",
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
