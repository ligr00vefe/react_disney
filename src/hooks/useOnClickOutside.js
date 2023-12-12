import { useEffect } from "react"

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if(!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
  
    return () => {
      // 함수가 동작하지 않을 때 제거(removeEventListener)
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    }
  }, [ref, handler]);
  
}