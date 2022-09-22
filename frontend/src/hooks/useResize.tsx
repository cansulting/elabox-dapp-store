import React from "react"

interface ResizeHookReturn {
    width:number
    height:number
}
const useResize = (element: React.RefObject<HTMLDivElement>): ResizeHookReturn => {
    const [width,setWidth] = React.useState(0)
    const [height,setHeight] = React.useState(0)
    React.useEffect(()=>{
        setWidth(element?.current?.offsetWidth)
        setHeight(element?.current?.offsetHeight)        
        window.addEventListener("resize", () => {
            setWidth(element?.current?.offsetWidth)
            setHeight(element?.current?.offsetHeight)
        });
        return () => {
            window.removeEventListener("resize", () => {
                setWidth(0)
                setHeight(0)
            })
        }
       //eslint-disable-next-line        
    },[])
    return {width,height}
}

export default useResize