import StoresStyle from "../assets/css/pages/stores.module.css"
import Stores from "../components/Stores"
function StoresPage(): JSX.Element {
  const storesData = [
    {
      id: "1",
      title: "test",
      icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
      id: "2",
      title: "test",
      icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
      id: "3",
      title: "test",
      icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
      id: "4",
      title: "test",
      icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
      id: "5",
      title: "test",
      icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
      id: "6",
      title: "test",
      icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
      id: "7",
      title: "test",
      icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
  ]
  return (
    <div className={StoresStyle["app-stores"]}>
      <h1>Explore</h1>
      <Stores stores={storesData} />
    </div>
  )
}

export default StoresPage
