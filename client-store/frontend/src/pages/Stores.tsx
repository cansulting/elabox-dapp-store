import StoresStyle from "../assets/css/pages/stores.module.css"
import Stores from "../components/Stores"
function StoresPage(): JSX.Element {
  const storesData = [
    { title: "test", icon: "test" },
    { title: "test", icon: "test" },
    { title: "test", icon: "test" },
    { title: "test", icon: "test" },
    { title: "test", icon: "test" },
    { title: "test", icon: "test" },
    { title: "test", icon: "test" },
  ]
  return (
    <div className={StoresStyle["app-stores"]}>
      <h1>Explore</h1>
      <Stores stores={storesData} />
    </div>
  )
}

export default StoresPage
