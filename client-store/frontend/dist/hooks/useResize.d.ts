import React from "react";
interface ResizeHookReturn {
    width: number;
    height: number;
}
declare const useResize: (element: React.RefObject<HTMLDivElement>) => ResizeHookReturn;
export default useResize;
