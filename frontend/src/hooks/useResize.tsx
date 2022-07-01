import React,{ useState, useEffect} from "react"

interface ResizeHookReturn {
    width:number
    height:number
}
const useResize = (element: React.RefObject<HTMLDivElement>): ResizeHookReturn => {
    const [width,setWidth] = useState(0)
    const [height,setHeight] = useState(0)
    useEffect(()=>{
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
    },[])
    return {width,height}
}

export default useResize