import { Video, VideoData, VideoType } from "@/typings";

class VideoDataState {
  private videoData!: VideoData

  private async fetchVideoData() {
    // 获取视频数据
    const res = await fetch('/data/video.json')
    const data = await res.json() as VideoData
    this.videoData = data
  }

  async getVideoData() {
    if (this.videoData)
      return this.videoData
    await this.fetchVideoData()
    return this.videoData
  }

  async getVideoInfo(id: string) {
    const type = (await this.getVideoData()).data.find((i) => i.id === id)!.type
    // 根据id和type去fetch相应的json
    const res = await fetch(`/data/${type}/${id}.json`)
    const data = await res.json() as Video
    return data
  }

  async getRecommendEPs() {
    // 全部的视频数据
    const videoData = await this.getVideoData()
    const eps = videoData.data.filter((i) => i.type === VideoType.EP)
    // 新数据结构总data只存储id和type, 需要根据这两个属性去fetch相应的json拿到数据
    // 截取更新时间前六的视频作为推荐视频
    return (await Promise.all(eps.map(async (i) => await this.getVideoInfo(i.id)))).sort((a, b) => b.updateTimestamp - a.updateTimestamp).slice(0, 6)
  }

  async getRecommendMovies() {
    const videoData = await this.getVideoData()
    const movies = videoData.data.filter((i) => i.type === VideoType.MOVIE)
    return (await Promise.all(movies.map(async (i) => await this.getVideoInfo(i.id)))).sort((a, b) => b.updateTimestamp - a.updateTimestamp).slice(0, 6)
  }
}

export default new VideoDataState()
