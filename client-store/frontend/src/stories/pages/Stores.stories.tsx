import { ComponentMeta, ComponentStory } from '@storybook/react'
import { StoresProps } from '../../interfaces/Stores'
import StoresPage from "../../pages/Stores"
export default {
    title:"ClientStore/Pages/Stores",
    component: StoresPage,
} as ComponentMeta<typeof StoresPage>
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
  const handleStoreClick = (id:string) =>{
    
  }
const Template:ComponentStory<typeof StoresPage> = (props:StoresProps):JSX.Element => {
    return <StoresPage {...props}/>
}

export const StoresDummyData = Template.bind({})

StoresDummyData.args={
    stores : storesData,
    onStoreClick: handleStoreClick
}