import VList from "../components/VList"
import config from "../config"
export default function Home() {
  return (
    <>
      <h1 className="py-5">{ config.TITLE }</h1>
      <VList />
    </>
  )
}
