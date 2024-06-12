import { VideoData } from "@/typings";

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
    const videoData = await this.getVideoData()
    return videoData.data.find((i) => i.id === id)!
  }
}

export default new VideoDataState()
